
var WALL_SIZE = 20;
var PASSAGE_SIZE = 40;

module.exports = function(canvas, maze){

	var cellWidth = (canvas.width / maze.width);
	var cellHeight = (canvas.height / maze.height);

	var mazeShape = new Path2D();
	mazeShape.moveTo(0,0);
	mazeShape.lineTo(canvas.width, 0);
	mazeShape.lineTo(canvas.width, canvas.height);
	mazeShape.lineTo(0, canvas.height);
	mazeShape.closePath();

	for (var y=0; y < maze.height; y++){
		for (var x=0; x < maze.width; x++){
			var cell = maze[x][y];

			if (!cell.connectSouth){
				mazeShape.moveTo(x*cellWidth, (y+1)*cellHeight);
				mazeShape.lineTo((x+1)*cellWidth, (y+1)*cellHeight);
				mazeShape.closePath();
			}

			if (!cell.connectEast){
				mazeShape.moveTo((x+1)*cellWidth, (y)*cellHeight);
				mazeShape.lineTo((x+1)*cellWidth, (y+1)*cellHeight);
				mazeShape.closePath();
			}
		}
	}

	return mazeShape;
};
