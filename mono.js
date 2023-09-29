
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


let sphere;
let particlesMesh;
let composer;
let extraMaterial;

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene()

// Objects

let cubeRendererTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
    // encoding: THREE.sRGBEncoding,
    colorSpace: THREE.SRGBColorSpace
});

let cubeCamera = new THREE.CubeCamera(0.1,10,cubeRendererTarget);

const geometry = new THREE.SphereGeometry( 2.0, 32, 32);
let geo = new THREE.SphereGeometry(1.2,64,64);


let uniforms = {
    time: { value: 0},
    resolution: { value: new THREE.Vector4() },
}

let material = new THREE.ShaderMaterial ({
    uniforms: uniforms,
    side: THREE.DoubleSide,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
    // wireframe: true,
    // transparent: true,
})

function vertexShader() {
    return `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform vec2 pixels;
        uniform float time;
  
      void main() {
        vUv = uv;
        vPosition = position;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0); 
      }
    `
  }


function fragmentShader() {
    return `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;

    //Noise

    float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
    vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

    float noise(vec3 p){
        vec3 a = floor(p);
        vec3 d = p - a;
        d = d * d * (3.0 - 2.0 * d);

        vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
        vec4 k1 = perm(b.xyxy);
        vec4 k2 = perm(k1.xyxy + b.zzww);

        vec4 c = k2 + a.zzzz;
        vec4 k3 = perm(c);
        vec4 k4 = perm(c + 1.0);

        vec4 o1 = fract(k3 * (1.0 / 41.0));
        vec4 o2 = fract(k4 * (1.0 / 41.0));

        vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
        vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

        return o4.y * d.y + o4.x * (1.0 - d.y);
    }

    float line(vec2 uv, float offset){
        return smoothstep(
            0.0, 0.5 + offset*0.5,
            abs(0.5*(sin(uv.x*30.) + offset*2.))
        );
    }

    mat2 rotate2D(float angle) {
        return mat2(
            cos(angle), -sin(angle),
            sin(angle), cos(angle)
        );
    }

    void main() {
        float n = noise(vPosition +(time*0.6));

        //beige
        // vec3 color1 = vec3(120./255., 158./255., 113./255.);
         vec3 color1 = vec3(185./255., 210./255., 177./255.);
        //black
        // vec3 color2 = vec3(0., 0., 0.);
        vec3 color2 = vec3(2./225., 1./225., 22./225.);
        //orange
        // vec3 color3 = vec3(224./255., 148./255., 66./255.);
        vec3 color3 = vec3(168./255., 87./255., 81./255.);
        // vec3 color4 = vec3(232./255., 201./255., 73./255.);

        vec2 baseUV = rotate2D(n)*vPosition.xy*0.1;
        float basePattern = line(baseUV, 0.5);
        float secondPattern = line(baseUV, 0.1);

        vec3 baseColor = mix(color1, color3, basePattern);
        vec3 secondBaseColor = mix(baseColor, color2, secondPattern);

        gl_FragColor = vec4(vec3(secondBaseColor), 1.0);
    }

`
}

let uniforms2 = {
    time: { value: 0},
    resolution: { value: new THREE.Vector4() },
    tCube: { value: 0 },
};

let mat = new THREE.ShaderMaterial ({
    uniforms: uniforms2,
    side: THREE.DoubleSide,
    fragmentShader: fragmentShader2(),
    vertexShader: vertexShader2(),

    // wireframe: true,
    // transparent: true,
})

function vertexShader2() {
    return `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform vec2 pixels;
        uniform float time;
  

		varying vec3 vReflect;
		varying vec3 vRefract[3];
		varying float vReflectionFactor;

		void main() {

            float mRefractionRatio = 1.02;
            float mFresnelBias = 0.1;
            float mFresnelScale = 1.0;
            float mFresnelPower = 1.0;

			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

			vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
			vec3 I = worldPosition.xyz - cameraPosition;

			vReflect = reflect( I, worldNormal );
			vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );
			vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );
			vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );
			vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );
			gl_Position = projectionMatrix * mvPosition;

		}
    `
  }


function fragmentShader2() {
    return `
        uniform samplerCube tCube;

		varying vec3 vReflect;
		varying vec3 vRefract[3];
		varying float vReflectionFactor;

		void main() {

		    vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
            reflectedColor = reflectedColor*0.9;
            // vec4 refractedColor = vec4( 1.0 );
			vec4 refractedColor = vec4( 10.0 );

			refractedColor.r = textureCube( tCube, vec3( vRefract[0].x, vRefract[0].yz ) ).r;
			refractedColor.g = textureCube( tCube, vec3( vRefract[1].x, vRefract[1].yz ) ).g;
			refractedColor.b = textureCube( tCube, vec3( vRefract[2].x, vRefract[2].yz ) ).b;

			gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );

		}
`
}

// Mesh
sphere = new THREE.Mesh(geometry,material);
let smallSphere = new THREE.Mesh(geo,mat);
scene.add(sphere, smallSphere);


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 300)
camera.position.x = 1.2
camera.position.y = -0.9
camera.position.z = 1.0
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.update();
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#040506'), 1)

//Mouse

document.addEventListener('mousemove', animateParticles)

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseY = event.clientY;
    mouseX = event.clientX;
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    material.uniforms.time.value = elapsedTime*0.5;

    // Update objects
    // if(sphere) {
    //     sphere.rotation.y = .4 * elapsedTime
    // }


    // Update Orbital Controls
    // controls.update()

    // Render
    smallSphere.visible = false;
    cubeCamera.update(renderer, scene);
    smallSphere.visible = true;
    mat.uniforms.tCube.value = cubeRendererTarget.texture; 
    renderer.render(scene, camera);
    // composer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

