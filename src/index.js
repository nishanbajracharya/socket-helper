var merge = require('lodash.merge');

// Socket IO Events
var EVENT = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message'
};

// Custom Event Types
var TYPE = {
  MESSAGE: 'MESSAGE',
  CONNECTION: 'CONNECTION',
  DISCONNECTION: 'DISCONNECTION',
  NEW_CONNECTION: 'NEW_CONNECTION'
};

/**
 * Decorate type and payload similar to Flux Standard Actions
 *
 * @param {string} type
 * @param {Object} payload
 */
function createEvent (type, payload) {
  return { type, payload };
}

// Default configs for helper
var defaultConfig = {
  overrides: {
    message: false,
    connection: false,
    disconnection: false,
    newConnection: false,
  }
};

/**
 * Wrapper for Socket.io
 *
 * @param {SocketIO.Server} _io
 * @param {function} _onConnection
 * @param {object} _config
 */
function socketHelper(_io, _onConnection, _config) {
  if (!_config) {
    _config = {};
  }

  // Generate configs to be used
  var io = _io;
  var onConnection = _onConnection;
  var config = merge(defaultConfig, _config);

  io.on(EVENT.CONNECTION, function(socket) {
    // Get ID of socket
    var clientID = socket.id;

    onConnection && onConnection(socket, clientID);
  });
}

module.export = socketHelper;
module.exports.TYPE = TYPE;
module.exports.EVENT = EVENT;
module.exports.createEvent = createEvent;