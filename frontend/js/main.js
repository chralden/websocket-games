//> Application Main:
//> Load all script dependencies for Websocket Games
//> This application uses Browserify [http://browserify.org/] to manage modules.

//### Load components

// Object.create Polyfill
var createFill = require('./components/create.js'),

// games mediator, runs code for specific games based on hash
games = require('./games/games-mediator.js'),

// state machine factory
state = require('./components/state-machine.js'),

// game bar ui element
gamebar = require('./ui/GameBar.jsx');


// instantiate global websocket object as user
window.user = io();

// add the websocket game state manager to the global namespace
window.WSGame = state();

// render game bar to DOM passing current player
gamebar('gamebar');

// initialize the games mediator
games();
