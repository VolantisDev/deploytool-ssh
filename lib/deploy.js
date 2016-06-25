/**
 * Created by Ben on 6/23/2016.
 */

var sequest = require("sequest");
var deploytool = require('deploytool');
var ssh_key = require('./ssh-key');
var sshCmdList = require('./ssh-cmd-list');

module.exports = function(environment, commit, callback) {
  environment = deploytool.environment.initialize(environment, {
    type: 'ssh',
    commands: [],
    host: '',
    ssh: {
      privateKey: ssh_key(environment)
    }
  });

  var config = environment.config;

  if (!config.host) {
    callback(new Error('host must be specified'));

    return;
  }

  // Remove privateKey if it's empty so that we can load the default key from the SSH agent
  if (config.ssh.hasOwnProperty('privateKey') && !config.ssh.privateKey) {
    config.ssh.splice('privateKey', 1);
  }

  console.log('Starting ' + config.type + ' deployment for environment ' + config.name);

  var seq = sequest.connect(config.host, config.ssh);

  sshCmdList(seq, config.commands, function (error, results) {
    seq.end();

    if (error) {
      console.error('Failed to deploy via ' + config.type + ' on environment ' + config.name);
    } else {
      console.log('Successfully deployed via ' + config.type + ' on environment ' + config.name);
    }

    callback(error, results);
  });
};
