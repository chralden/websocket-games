var statemachine = {

    currenState: null, 

    states: {},

    assets: {},

    // define a function for a particular game state
    define: function(stateName, stateFunction) {
        var self = this;

        if(!self.states[stateName]){
            self.states[stateName] = stateFunction;
            return stateFunction;
        }else{
            return false;
        }
    },

    goTo: function(newState) {
        var self = this;
        return self.set(newState)();
    },

    // set the current game state
    set: function(newState) {
        var self = this;
        
        if(self.states[newState]){
            self.currentState = newState;
            return self.states[self.currentState];
        }else{
            return false;
        }
    },

    // get the current game state function
    get: function() {
        var self = this;
        
        if(self.currentState){
            return self.states[self.currentState];
        }else{
            return false;
        }
    }, 

    // clear all state functions
    clear: function() {
        var self = this;

        self.assets = {};
        return self.states = {};
    }

};

// expose statemachine factory
module.exports = function(config) {
    var state = Object.create(statemachine);
    
    // if config passed extend state with config
    if(config){
        $.extend(state, config);
    }
    return state;
};
