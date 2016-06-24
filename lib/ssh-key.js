/**
 @author bmcclure
 */

var fs = require('fs');
var deploytool = require('deploytool');

/**
 *
 * @param environment
 * @returns {string|*}
 */
module.exports = function (environment) {
  if (typeof environment == 'string') {
    environment = deploytool.environment.load(environment);
  }

  environment.applyDefaults({
    'type': 'ssh',
    'ssh': {
      'privateKey': '',
      'privateKeyCI': '',
      'privateKeyDir': process.env.HOME + '/.ssh',
      'privateKeyFile': '',
      'privateKeyFileCI': ''
    }
  });

  var config = environment.config;
  var ci = (process.env.CI);

  var key = config.ssh.privateKey;
  if (config.ssh.privateKeyCI && ci) {
    key = config.ssh.privateKeyCI;
  }

  var keyFile = config.ssh.privateKeyFile;
  if (config.ssh.privateKeyFileCI && ci) {
    keyFile = config.ssh.privateKeyFileCI;
  }

  if (keyFile) {
    key = fs.readFileSync(config.ssh.privateKeyDir + '/' + keyFile)
  }

  return key;
};
