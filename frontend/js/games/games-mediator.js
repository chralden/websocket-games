//> The games mediator checks for a games hash and runs specified game if exists

//### Load Dependencies

    // canvas animation object factory
var canvas = require('../components/canvas.js'),

    // registry of available games
    games = require('../games/registry.js');

//### Games Mediator

var gamesMediator = function(){

    var game = window.location.hash.replace('#', '') || false;

    $(function main() {

        // create the game canvas
        var gameCanvas = canvas({
            el: document.getElementById('game'),
        });

        if(game){

            // using the specified game, update the game canvas
            games[game](gameCanvas);

        }else{
             console.log('Websocket Games: No game selected.');
        }

    });

};

module.exports = gamesMediator;
