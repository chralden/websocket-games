function Tile(x,y){
    this.x = x;
    this.y = y;
    this.connectNorth = false;
    this.connectSouth = false;
    this.connectWest = false;
    this.connectEast = false;
    this.visited = false;
}

function createMaze(width,height){
    var maze = new Array(width);
    maze.width = width;
    maze.height = height;

    for (var x = 0; x < width; x++){
        maze[x] = new Array(height);
        for (var y=0; y < height; y++){
            maze[x][y] = new Tile(x,y);
        }
    }

    var cellStack = [];

    var randomStartX = randomInt(width);
    var randomStartY = randomInt(height);

    cellStack.push( maze[randomStartX][randomStartY] );
    while (cellStack.length > 0){
        var nextCell = cellStack.pop();
        nextCell.visited = true;

        var viableNeighbors = [];
        if (nextCell.x > 0 && maze[nextCell.x-1][nextCell.y].visited === false){
            viableNeighbors.push(maze[nextCell.x-1][nextCell.y]);
        }
        if (nextCell.x < width-1 && maze[nextCell.x+1][nextCell.y].visited === false){
            viableNeighbors.push(maze[nextCell.x+1][nextCell.y]);
        }
        if (nextCell.y > 0 && maze[nextCell.x][nextCell.y-1].visited === false){
            viableNeighbors.push(maze[nextCell.x][nextCell.y-1]);
        }
        if (nextCell.y < height-1 && maze[nextCell.x][nextCell.y+1].visited === false){
            viableNeighbors.push(maze[nextCell.x][nextCell.y+1]);
        }

        if (viableNeighbors.length > 0){
            // havent worked ourselves into a dead end
            var randomNeighbor = viableNeighbors[randomInt(viableNeighbors.length)];
            connectTiles(nextCell, randomNeighbor);
            cellStack.push(nextCell);
            cellStack.push(randomNeighbor);
        }
    }

    return maze;
}

function connectTiles(a,b){
    if (a.x < b.x){
        a.connectEast = true;
        b.connectWest = true;
    }
    else if (a.x > b.x){
        a.connectWest = true;
        b.connectEast = true;
    }
    else if (a.y < b.y){
        a.connectSouth = true;
        b.connectNorth = true;
    }
    else if (a.y > b.y){
        a.connectNorth = true;
        b.connectSouth = true;
    }
    else {
        throw new Error('tried to connect overlapping cell');
    }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function printMaze(maze){
    var gridString = '';
    var hEdgeString = 'O~';
    for (var xIdx=0; xIdx < maze.width; xIdx++){
        hEdgeString += "~~~~~" ;
    }
    hEdgeString += "O\n" ;

    var topString = '';
    for (var y=0; y < maze.height; y++){
        var rowString = '{|';
        var sepString = '{|';
        for (var x=0; x < maze.width; x++){
            var tile = maze[x][y];
            rowString += tile.connectEast  ? "     " : "    |";
            sepString += tile.connectSouth ? "    +" : "----+";
        }
        gridString += rowString + '}\n' + sepString + '}\n';
    }

    gridString = hEdgeString + gridString + hEdgeString;
    console.log(gridString);
}

module.exports = {
    createMaze : createMaze,
    printMaze : printMaze,
    Tile : Tile
};
