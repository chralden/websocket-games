    // object to contain player slots
var _ = require('lodash'),

    players = [],

    maxplayers = 2;

// export functions to manipulate players
module.exports = {

    // check if collection has reached max
    roomFull: function roomFull() {
        return players.length >= maxplayers;
    },

    // check if given player is registered
    isPlaying: function isPlaying(player) {
        return _.findIndex(players, 'id', player.id);
    },

    // remove a player from collection
    removePlayer: function removePlayer(player) {
        return _.remove(players, 'id', player.id);
    },

    // add a player to collection
    addPlayer: function addPlayer(player) {
        players.push(player);
        return player.id;
    },

    // notify all registered players of current state
    notifyPlayers: function updatePlayers() {

        var newstatus = (this.roomFull()) ? 'PLAY' : 'WAIT';

        // when a status changes update room about new players
        this.io.emit('updatePlayers', this.getPlayers());

        _.forEach(players, function(player) {

            // update the players status to reflect room state
            player.updateStatus(newstatus);
        });

    },

    // update a players state in the collection of players
    update: function(player, state) {

        // are we registering
        if(state === 'register') {

            // if there is space add the player
            if(!this.roomFull()){

                // add the new player
                this.addPlayer(player);
                updated = player.id;

            // if not notify the player that the room is full
            }else{
                player.updateStatus('FULL');
            }

        }else{

            // if current player is registered remove
            if(this.isPlaying(player) >= 0){

                // remove the player
                this.removePlayer(player);
                updated = players;
            }

        }

        // notify all players of new player count and update state
        this.notifyPlayers();

    },

    // register a player
    registerPlayer: function registerPlayer(player) {
        return this.update(player, 'register');
    },

    // deregister a player
    deregisterPlayer: function deregisterPlayer(player) {
        return this.update(player, 'deregister');
    },

    // return array of player names
    getPlayers: function getPlayers() {
        return players.map(function(player){
            return player.name;
        });
    }

};
