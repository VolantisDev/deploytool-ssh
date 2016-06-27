/**
 * @author bmcclure
 */

module.exports = {
  name: 'ssh',
  tag: 'deployment',
  init: function () {

  },
  deploy: require('./lib/deploy'),
  sshCmdList: require('./lib/ssh-cmd-list'),
  sshKey: require('./lib/ssh-key')
};
