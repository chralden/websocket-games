var playerManager = require('./players-manager'),
    gameState = [];

module.exports = function(io) {

    playerManager.io = io;

    io.on('connection', function(player) {

        // expose an update state method for each player
        player.updateStatus = function(status) {
            var self = this;

            // update the players status to reflect room state
            self.status = status;

            // notify subscribers that state has changed
            self.emit('updateStatus', self.status);
        };

        // update the players status to reflect room state
        player.updateStatus((playerManager.roomFull()) ? 'FULL' : 'OPEN');
        player.emit('updatePlayers', playerManager.getPlayers());

        player.on('join', function(name) {
            player.name = name;
            playerManager.registerPlayer(player);
        });

        // when a player leaves deregister them
        player.on('disconnect', function() {
            playerManager.deregisterPlayer(player);
        });

        //Pass through user actions
        player.on('user action', function(action) {
            gameState.push(action);
            io.emit('user action', action);
        });

    });

};
