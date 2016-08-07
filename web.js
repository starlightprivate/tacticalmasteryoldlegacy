var http = require('http');
var express = require('express');
var path = require('path');
var gzippo = require('gzippo');

var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon('./img/icon/icon40px.png'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));



// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
