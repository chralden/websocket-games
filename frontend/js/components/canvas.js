//> Canvas element factory component

//### Load Dependencies

// track the animation frame
var animationFrame = false;

var canvas = {

    el: null,
    context: null,

    width: 700,
    height: 400,

    fillView: false,

    init: function(config) {
        var self = this;

        // extend canvas with passed configuration
        if(config){
            $.extend(self, config);
        }

        // if there's an element let's initialize it
        if(self.el){
            self.context = self.el.getContext('2d');

            if(self.fillView){
                self.resize();
            }else{
                self.el.width = self.width;
                self.el.height = self.height;
            }
        }
        self.listeners();
    },

    listeners: function() {
        var self = this;
    },

    click: function(onClick) {
        var self = this;
        $(self.el).on('click',function(event){
            var bounds = self.el.getBoundingClientRect();
            var x = event.clientX - bounds.left,
            y = event.clientY - bounds.top;
            onClick(x,y);
        });
    },

    keypress: function(onKeyPress){
        var self = this;
        var lastDownTarget;
        document.addEventListener('mousedown', function(event) {
            lastDownTarget = event.target;
        }, false);

        document.addEventListener('keydown', function(event) {
            if(lastDownTarget == self.el) {
                event.preventDefault();
                onKeyPress(event.keyCode);
            }
        }, false);
    },

    animate: function(animation) {

        function step(){
            animation();
            animationFrame = window.requestAnimationFrame(step);
        }

        animationFrame = window.requestAnimationFrame(step);
    },

    stop: function() {
        var self = this;

        if(animationFrame){
            window.cancelAnimationFrame(animationFrame);
            animationFrame = false;
        }
        self.clearRect(0, 0, self.el.width, self.el.height);
    },

    resize: function() {
        var self = this;

        function calcSize() {
            self.el.width = window.innerWidth;
            self.el.height = window.innerHeight;
        }

        $(window).on('resize', calcSize);
        calcSize();
    }

};

// return a new canvas object initialized with given configuration
module.exports = function(config) {

    var c = Object.create(canvas);
    c.init(config);
    return c;
};
