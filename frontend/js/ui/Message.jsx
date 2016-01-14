var React = require('react'),
    NameInput = require('./NameInput.jsx');

var messages = {
    'INIT': 'Loading Game',
    'OPEN': 'Enter your name and press "return" to join the game',
    'FULL': 'Sorry, the game is currently full :(',
    'WAIT': 'Waiting for another player to join',
    'PLAY': 'You are playing!'
};

var Message = React.createClass({
    render: function() {
        var inputNode = '';

        if(this.props.state === 'OPEN'){
            inputNode = <NameInput />
        }

        return (
            <div className="message">
                { messages[this.props.state] }
                <div>{ inputNode }</div>
            </div>
        );
    }
});

module.exports = Message;
