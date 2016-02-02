
//> Maze
var MazeBuilder = require('./mazeBuilder.js');
var ShapeBuilder = require('./shapeBuilder.js');
module.exports = function(canvas){

    canvas.init({
        width: 800,
        height: 800
    });

    // the assets we need for our game
    var context = canvas.context,

    //## Game States
    START = '_START_',
    PLAY = '_PLAY_';

    var maze;

    var player = {
        x:0,
        y:0,
    };

    var MAZE_WIDTH = 100, MAZE_HEIGHT = 100;
    //# START

    // start screen
    WSGame.define(START, function start() {
        // this is where start stuff would go
        var playerCellSize = canvas.width / MAZE_WIDTH;

        maze = MazeBuilder.createMaze(MAZE_WIDTH,MAZE_HEIGHT);
        var shape = ShapeBuilder(canvas, maze);

        // MazeBuilder.printMaze(maze);
        canvas.animate(function(){
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.stroke(shape);
            context.beginPath();
            context.fillStyle = "blue";
            context.rect(player.x * playerCellSize + 2, player.y * playerCellSize + 2, playerCellSize-4, playerCellSize-4);
            context.fill();
        });

        canvas.keypress(function(event){

        });
        canvas.keypress(function(keycode){
            switch (keycode) {
                case 37: // left
                if (maze[player.x][player.y].connectWest && player.x > 0){ player.x--; }
                break;
                case 38: // up
                if (maze[player.x][player.y].connectNorth && player.y > 0){ player.y--; }
                break;
                case 39: // right
                if (maze[player.x][player.y].connectEast && player.x < maze.width-1){ player.x++; }
                break;
                case 40: // down
                if (maze[player.x][player.y].connectSouth && player.y < maze.height-1){ player.y++; }
                break;
            }
        });

        WSGame.goTo(PLAY);
    });

    //# PLAY

    // define gameplay animations and functionalities
    WSGame.define(PLAY, function play() {

        var state = [];



    });

    // start game by going to setup state
    WSGame.goTo(START);

};
