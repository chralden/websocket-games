//> The games mediator checks for a games hash and runs specified game if exists

//### Load Dependencies

// canvas animation object factory
var canvas = require('../components/canvas.js'),

// registry of available games
gamesList = require('../games/registry.js');

//### Games Mediator

var gamesMediator = function(){
    var gameName = window.location.hash.replace('#', '') || false;
    $(function main() {
        // create the game canvas
        var gameCanvas = canvas({
            el: document.getElementById('game'),
        });

        if(gameName){
            if (gamesList[gameName] === undefined){
                console.log('Websocket Games: Unknown Game selected.');
            }
            else {
                // using the specified game, update the game canvas
                gamesList[gameName](gameCanvas);
            }
        }
        else{
            console.log('Websocket Games: No game selected.');
        }
    });
};

module.exports = gamesMediator;
