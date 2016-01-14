var path = require('path'),
    http = require('http'),
    buildDir = path.join(__dirname, '/build'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io')(server),
    gameroom = require('./gameroom');

app.set('port', process.env.PORT || 9022);
app.use(express.static(buildDir));
app.use('/static', express.static(buildDir));

app.get('/', function(req,res) {
    res.sendFile('/index.html');
});

gameroom(io);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
