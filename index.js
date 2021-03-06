'use strict';

const Defaults = require('./defaults');
const ClientHook = require('./lib/client-hook');
const ListenHook = require('./lib/listen-hook');

const PLUGIN_NAME = 'amqp-transport';

module.exports = function(opts) {
  var seneca = this;
  var so = seneca.options();
  var options = seneca.util.deepextend(Defaults, so.transport, opts);
  var listen = new ListenHook(seneca, options);
  var client = new ClientHook(seneca, options);
  seneca.add({
    role: 'transport',
    hook: 'listen',
    type: 'amqp'
  }, listen.hook());
  seneca.add({
    role: 'transport',
    hook: 'client',
    type: 'amqp'
  }, client.hook());

  return {
    name: PLUGIN_NAME
  };
};
