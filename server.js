/**
 * Created by marcus on 11/29/16.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var co = require('co');
var Q = require('q');
var app = express();
var moment = require('moment');
var multer = require('multer');
var parts = multer();
var jsonParser = bodyParser.json();
var exec = require('child_process').exec;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var saveFile = function(content, filename) {
    var deferred = Q.defer();
    fs.writeFile(filename, content, function(err) {
        if(err) {
            deferred.reject(err);
            return;
        }
        console.log("The file was saved!");
        deferred.resolve(filename);
    });

    return deferred.promise;
};

app.post("/api/submit", parts.array(), jsonParser, function(req, res) {
    co(function * () {
        var content = req.body.content;
        var filename = yield saveFile(content, "HelloWorld.java");

        var compile = 'javac ' + filename;
        var run = 'java ' + filename.split(".").shift();

        exec(compile, function(error, stdout, stderr) {
            // command output is in stdout
            if (!error) {
                exec(run, function(error1, stdout1, stderr1) {
                    if (!error1) {
                        console.log(stdout1);
                        res.status(200).json({
                            status: true,
                            data: stdout1
                        })
                    } else {
                        console.log(error1);
                    }
                });
            } else {
                console.log(error);
            }
        });

    }).catch(function(error) {
        console.log(error.stack);
        res.status(500).json({
            status: false,
            message: "Error compiling code."
        })
    });

});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
