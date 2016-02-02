
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

    //# START

    // start screen
    WSGame.define(START, function start() {
        // this is where start stuff would go
        maze = MazeBuilder.createMaze(200,200);
        var shape = ShapeBuilder(canvas, maze);

        MazeBuilder.printMaze(maze);
        canvas.animate(function(){
            context.stroke(shape);
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
