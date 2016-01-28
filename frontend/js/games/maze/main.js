
//> Maze
module.exports = function maze(canvas){

    // the assets we need for our game
    var context = canvas.context,

    //## Game States
    START = '_START_',
    PLAY = '_PLAY_';

    //# START

    // start screen
    WSGame.define(START, function start() {
        // this is where start stuff would go


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
