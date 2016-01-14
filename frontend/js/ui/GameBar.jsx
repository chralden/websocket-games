var React = require('react'),
    ReactDOM = require('react-dom'),
    Message = require('./Message.jsx'),
    Players = require('./Players.jsx');

var GameBar = React.createClass({

    getInitialState: function() {
        return {
            playerStatus: 'INIT',
            players: []
        };
    },

    componentDidMount: function() {
        var self = this;

        user.on('updateStatus', function(status) {
            this.status = status;

            self.setState({ playerStatus: this.status });
        });

        user.on('updatePlayers', function(players) {
            self.setState({ players: players });
        });
    },

    render: function() {

        return (
            <div className="game-bar">
                <Players names={ this.state.players } />
                <Message state={ this.state.playerStatus } />
            </div>
        );
    }
});

module.exports = function(target) {

    // render the Bar to the target
    ReactDOM.render(
      <GameBar />,
      document.getElementById(target)
    );
};
