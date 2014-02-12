var express = require('express');
var dao = require('./dao/dao.js');
var automation = require('./routes/automation.js');
var app = express();

app.use(express.static(__dirname + '/static'));

argv = require('optimist').argv;

var local = argv['local'] ? argv['local'] : false;

var host = 'http://tcm.test-lab.ch';
//var host = 'http://ec2-54-197-79-64.compute-1.amazonaws.com';

var uiPath = (local == false)? host :'http://localhost:8080';
var backEndPath = (local == false)? host + ':7777':'http://localhost:9000';

app.configure(function(){
    app.set('port', process.env.PORT || 7777);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(app.router);

     app.use(function(err, req, res, next){
        console.error(err.stack);
        res.send(500, 'Something broke!');
     });

    //app.use(express.static(__dirname + '/static'));
});

app.get('/api/environments', automation.environments);
app.get('/api/accounts', automation.accounts);
app.post('/api/accounts', automation.setAccount);
app.delete('/api/accounts/:id', automation.removeAccount);
app.get('/api/versions', automation.getVersions);
app.post('/api/versions', automation.setVersion);
app.delete('/api/versions/:id', automation.removeVersion);
app.get('/api/properties', automation.getProperties);
app.post('/api/properties', automation.setProperty);
app.delete('/api/properties/:id', automation.removeProperty);






app.listen(app.get('port'));

console.log('Express server listening on port ' + app.get('port'));

