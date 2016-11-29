/**
 * Created by marcus on 11/29/16.
 */

var exec = require('child_process').exec;
var compile = 'javac HelloWorld.java';
var run = 'java HelloWorld';
exec(compile, function(error, stdout, stderr) {
    // command output is in stdout
    if (!error) {
        exec(run, function(error1, stdout1, stderr1) {
            if (!error1) {
                console.log(stdout1);
            } else {
                console.log(error1);
            }
        });
    } else {
        console.log(error);
    }
});