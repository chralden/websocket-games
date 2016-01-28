function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
    var r = randomIntBetween(0, 255),
        g = randomIntBetween(0, 255),
        b = randomIntBetween(0, 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

//> A test game -- draw dots
module.exports = function dotDraw(canvas){

    // the assets we need for our game
    var context = canvas.context,

    //## Game States
    START = '_START_',
    PLAY = '_PLAY_';

    //# START

    // start screen
    WSGame.define(START, function start() {
        // this is where start stuff would go
        user.profile = {
			color: randomColor()
		};

        WSGame.goTo(PLAY);
    });

    //# PLAY

    // define gameplay animations and functionalities
    WSGame.define(PLAY, function play() {

        var state = [];

        /* IF WE WANT OUR GAME TO ANIMATE ON A LOOP
		canvas.animate(function(){

        });
		*/

        canvas.click(function(x,y){
            if (user.status === PLAY){
                var clickAction = {
                    type: 'click',
                    payload: {
                        x: x,
                        y: y,
                        color: user.profile.color
                    }
                };
                user.emit('user action', clickAction);
            }
        });

        canvas.keypress(function(keycode){
            console.log('on key press',keycode);
            // 37, 38, 39, 40 -> left, up, right, down
        });

        user.on('user action', function(action){
			if(action){
				switch(action.type){

					case 'click':
						// draw the dot on click
						context.fillStyle = action.payload.color;
						context.beginPath();
						context.moveTo(action.payload.x, action.payload.y);
						context.arc(action.payload.x, action.payload.y, 10, 0, Math.PI * 2, false);
						context.fill();

						break;

					default:
						break;

				}
			}
		});

    });

    // start game by going to setup state
    WSGame.goTo(START);

};
