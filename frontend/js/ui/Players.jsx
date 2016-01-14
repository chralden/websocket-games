var React = require('react');

var Players = React.createClass({
    render: function() {

        var playerList = this.props.names.map(function(player, index){
            return (
                <div
                    className = { 'player' + (index + 1) }
                    key = { player }>
                        Player { index + 1 }: { player }
                </div>
            );
        });

        return (
            <div className = "players-bar">{playerList}</div>
        );
    }
});

module.exports = Players;
