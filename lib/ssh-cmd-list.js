/**
 * @author bmcclure
 *
 * A deployment module for pushing to a remote repository with Git
 */

var async = require('async');

function execute(seq, cmd, callback) {
  console.log('Executing command "' + cmd + '" via SSH');

  seq(cmd, function (error, stdout) {
    console.log(stdout);

    if (error) {
      console.error('There was an error executing "' + cmd + '"', error);
    } else {
      console.log('Successfully executed "' + cmd + '"');
    }

    callback(error, stdout);
  });
}

module.exports = function (seq, commands, callback) {
  console.log('Executing "' + commands.length + '" commands via SSH');

  var cmdList = [];

  commands.forEach(function (command) {
    cmdList.push(async.apply(execute, seq, command));
  });

  async.series(cmdList, function (err, results) {
    if (err) {
      console.error('There was an error executing the commands', err);
    } else {
      console.log('All commands were executed successfully')
    }

    callback(err, results);
  });
};
