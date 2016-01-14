var React = require('react');

var Message = React.createClass({
    getInitialState: function() {
        return { value: '' };
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    handleKeyDown: function(event) {

        if(event.which == 13 && user.status === 'OPEN' && this.state.value){
            user.emit('join', this.state.value);
        }
    },

    render: function() {
        var value = this.state.value;
        return (
            <input
                type = "text"
                onChange = { this.handleChange }
                onKeyDown = { this.handleKeyDown }
                id = "playerName"
                name = "playerName"
                className = "name-field"
                value = { value }
            />
        );
    }
});

module.exports = Message;
