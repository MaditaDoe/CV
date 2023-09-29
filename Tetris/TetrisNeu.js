var tetrisfeld = document.getElementById('spielfeld');
var context = tetrisfeld.getContext('2d');

var matrixL = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ]
];

var matrixT = [
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ]
];

var matrixS = [
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ]
];

var matrixZ = [
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ]
];

var matrixO = [
    [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
    ]
];

var matrixI = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
];

var matrizenMatrix = [matrixL, matrixT, matrixS, matrixZ, matrixO, matrixI];

var defaultGrid = [
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

var defaultRow = [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3];

var gameOverMsg = [
    [4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 0, 4, 4, 4],
    [4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 3],
    [4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 0, 4, 0, 4, 4, 4],
    [4, 0, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 0, 3],
    [4, 4, 4, 4, 0, 4, 0, 4, 0, 4, 0, 0, 4, 0, 4, 4, 4],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [4, 4, 4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 4, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 0, 4, 4, 4, 0, 4, 4, 4, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 0, 4, 0, 0, 0, 4, 4, 0, 0, 3],
    [4, 4, 4, 0, 0, 4, 0, 0, 4, 4, 4, 0, 4, 0, 4, 0, 4],
];

//ZeichenPart
context.scale(20, 20);
context.fillStyle = '#68838b';
context.fillRect(0, 0, 300, 600);
var fallVariable;
var spielerpos;
var counter;
var aktuellerStein;
var orientation;
var dropRate;
var points;

var grid;
var gameloop;

var audio = document.getElementById("audio"); 
audio.volume = 0.2;
var go = document.getElementById("go");
var change = 0;



document.getElementById("button").onclick = function() {
    if (change == 0) {
        audio.pause(); 
        document.getElementById("button").innerHTML="Play Audio";
        change = change + 1;
    }
    else if (change == 1) {
        audio.play();
        document.getElementById("button").innerHTML="Pause Audio";
        change = change - 1;
    }
}

function restart () {
    window.clearInterval(gameloop);

    fallVariable = 2;
    spielerpos = 7;
    counter = 1;
    aktuellerStein = 0;
    orientation = 0;
    dropRate = 1;
    points = 0;
    audio.currentTime = 0;
    audio.play();
    
    grid = defaultGrid.map(function(row) {
        return row.slice();
    });

    gameloop = window.setInterval(function update() {
        zeichne();
    }, 300);
}

function zeichne() {
    if (counter < 2) {
        newStone();
    }
    for (var i = 0; i < dropRate; i++) {
        movement(spielerpos, fallVariable);
    }
    checkRows();
    zeichnegrid();
    zeichnePoints();
    counter++;
}

function newStone() {
    aktuellerStein = Math.floor(Math.random() * 6);
    fallVariable = 2;
    orientation = 0;
    spielerpos = 7;
    dropRate = 1;
    einfuegenSteine(matrizenMatrix[aktuellerStein][orientation], spielerpos, fallVariable);
}

function zeichnegrid() {
    grid.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value == 1) {
                context.fillStyle = '#cd9b9b';
                context.fillRect(x,
                    y,
                    1, 1);
            }
            else if (value == 2) {
                context.fillStyle = '#333';
                context.fillRect(x,
                    y,
                    1, 1);
            } else if (value == 3) {
                context.fillStyle = '#124';
                context.fillRect(x,
                    y,
                    1, 1);
            } else if (value == 4) {
                context.fillStyle = 'red';
                context.fillRect(x,
                    y,
                    1, 1);
            } else {
                context.fillStyle = '#68838b';
                context.fillRect(x,
                    y,
                    1, 1);
            }
        });
    });
}

function zeichnePoints() {
    document.getElementById('points').innerText = points;
}


function einfuegenSteine(matrixili, x, y) {
    for (var k = 0; k < 3; k++) {
        for (var i = 0; i < 3; i++) {
            if (grid[y + k][x + i] == 2) {
                drawGameOver(8);
            } else {
                grid[y + k][x + i] = matrixili[k][i];
            }
        }
    }
}

function drawGameOver(y) {
    for (var i = 0; i < 11; i++){
        for (var j = 0; j < 17; j++){
            if (gameOverMsg[i][j] == 4){
                grid[y + i][j] = gameOverMsg[i][j]
                window.clearInterval(gameloop);
                go.play();
                audio.pause();
            }
        }
    }
}

function checkRows() {
    grid.forEach(function (row, index) {
        var playable = false;
        var emptyFields = false;
        row.forEach(function (field) {
            if (field == 0 || field == 1) {
                emptyFields = true;
            } else if (field !== 3) {
                playable = true;
            }
        });
        if (playable && !emptyFields) {
            grid.splice(index, 1);
            grid.unshift(defaultRow.slice(0, defaultRow.length));
            points = points + 100;
            fallVariable++;
        }
    });
}

function movement(x, y) {
    //check for collision
    var collision = false;
    for (var k = 2; k >= 0; k--) {
        for (var i = 0; i < 3; i++) {
            if (((grid[y + k + 1][x + i] == 2) || (grid[y + k + 1][x + i] == 3)) && (grid[y + k][x + i] == 1)) {
                collision = true;
            }
        }
    }
    if (!collision) {
        for (var k = 2; k >= 0; k--) {
            for (var i = 0; i < 3; i++) {
                if ((grid[y + k + 1][x + i] !== 2) && (grid[y + k][x + i] !== 2) && (grid[y + k + 1][x + i] !== 3)) {
                    grid[y + k + 1][x + i] = grid[y + k][x + i];
                }
            }
        }
        resetBlock(y, x);
        resetBlock(y, x + 1);
        resetBlock(y, x + 2);
        fallVariable++;
    } else {
        placeStone(x, y);
    }
}

function placeStone(x, y) {
    for (var k = 2; k >= 0; k--) {
        for (var i = 0; i < 3; i++) {
            if (grid[y + k][x + i] == 1) {
                grid[y + k][x + i] = 2;
            }
        }
    }
    newStone();
}

function movementHor(x, y, left) {
    //check for collision
    var collision = false;
    for (var i = y; i < y + 4; i++) {
        if (left) {
            for (var j = x; j < x + 3; j++) {
                if (((grid[i][j - 1] == 2) || (grid[i][j - 1] == 3)) && (grid[i][j] == 1)) {
                    collision = true;
                }
            }
        } else {
            for (var j = x + 2; j >= x; j--) {
                if (((grid[i][j + 1] == 2) || (grid[i][j + 1] == 3)) && (grid[i][j] == 1)) {
                    collision = true;
                }
            }
        }
    }
    if (!collision) {
        for (var i = y; i < y + 4; i++) {
            if (left) {
                for (var j = x; j < x + 3; j++) {
                    if (grid[i][j - 1] !== 2 && grid[i][j - 1] !== 3) {
                        if (grid[i][j] !== 2 && grid[i][j] !== 3) {
                            grid[i][j - 1] = grid[i][j];
                        } else {
                            grid[i][j - 1] = 0;
                        }
                    }
                }
            } else {
                for (var j = x + 2; j >= x; j--) {
                    if (grid[i][j + 1] !== 2 && grid[i][j + 1] !== 3) {
                        if (grid[i][j] !== 2 && grid[i][j] !== 3) {
                            grid[i][j + 1] = grid[i][j];
                        } else {
                            grid[i][j + 1] = 0;
                        }
                    }
                }
            }
        }
        if (left) {
            resetBlock(y, x + 2);
            resetBlock(y + 1, x + 2);
            resetBlock(y + 2, x + 2);
            spielerpos--;
        } else {
            resetBlock(y, x);
            resetBlock(y + 1, x);
            resetBlock(y + 2, x);
            spielerpos++;
        }
    }
}

function resetBlock(y, x) {
    if (grid[y][x] !== 2 && grid[y][x] !== 3) {
        grid[y][x] = 0;
    }
}

function rotate(x, y) {
    var orientationOld = orientation;
    orientation = (orientation + 1) % 4;
    //check for collision
    var collision = false;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (((grid[i + y][j + x] == 2) || (grid[i + y][j + x] == 3)) && (matrizenMatrix[aktuellerStein][orientation][i][j] == 1)) {
                collision = true;
            }
        }
    }
    if (!collision) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                grid[i + y][j + x] = matrizenMatrix[aktuellerStein][orientation][i][j];
            }
        }
    } else {
        orientation = orientationOld;
    }
}

function fall() {
    dropRate = 4;
}

function stop() {
    dropRate = 0;
}

document.onkeydown = function (e) {
    var key = e.keyCode;
    if (key == 37) {
        e.preventDefault()
        movementHor(spielerpos, fallVariable, true);
    }
    if (key == 39) {
        e.preventDefault()
        movementHor(spielerpos, fallVariable, false);
    }
    if (key == 38) {
        e.preventDefault()
        rotate(spielerpos, fallVariable);
    }
    if (key == 40) {
        e.preventDefault()
        fall();
    }
    if (key == 82) {
        e.preventDefault()
        restart();
    }
    if (e.shiftKey && key == 80) { // Shift + P
        e.preventDefault()
        points = points + 50; 
    } 
    if (e.shiftKey && key == 83) { // Shift + S
        e.preventDefault()
        if (dropRate == 1 || dropRate == 4)
            stop();
        else
            fall();
        }
    if(e.shiftKey && key == 70) { // Shift + F
        e.preventDefault()
        for (var i = 0; i<16; i++) {
            if (grid[29][i] !== 3) {
                grid[29][i] = 2;
            }
        }
    }
}


restart();