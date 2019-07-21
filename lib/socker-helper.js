"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pull = require('lodash.pull');

var merge = require('lodash.merge'); // Socket IO Events


var EVENT = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message'
}; // Custom Event Types

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

function createEvent(type, payload) {
  return {
    type: type,
    payload: payload
  };
} // Default configs for helper


var defaultConfig = {
  clients: [],
  overrides: {
    message: false,
    connection: false,
    disconnection: false,
    newConnection: false
  }
};
/**
 * Wrapper for Socket.io
 *
 * @param {SocketIO.Server} _io
 * @param {function} _onConnection
 * @param {function} _onDisconnection
 * @param {object} _config
 */

function socketHelper(_io, _onConnection, _onDisconnection, _config) {
  if (!_io) {
    throw new Error('Socket IO required. Cannot initialize helper without Socket IO');
  }

  if (!_config) {
    _config = {};
  } // Generate configs to be used


  var io = _io;
  var onConnection = _onConnection;
  var onDisconnection = _onDisconnection;
  var config = merge(defaultConfig, _config);
  io.on(EVENT.CONNECTION, function (socket) {
    // Get ID of socket
    var clientID = socket.id; // Save reference of new connection

    config.clients.push(clientID); // Prepare payload for connection

    var payload = preparePayload(clientID, config.clients); // Emit message to socket about new connection

    !config.overrides.connection && socket.emit(EVENT.MESSAGE, createEvent(TYPE.CONNECTION, payload)); // Notify other clients about new connection

    !config.overrides.newConnection && socket.broadcast.emit(EVENT.MESSAGE, createEvent(TYPE.NEW_CONNECTION, payload));
    socket.on(EVENT.DISCONNECT, function () {
      // Remove disconnected client
      pull(config.clients, clientID); // Prepare new payload

      payload = preparePayload(clientID, config.clients); // Notify other clients about disconnection

      !config.overrides.disconnection && socket.broadcast.emit(EVENT.MESSAGE, createEvent(TYPE.DISCONNECTION, payload)); // Call disconnection hooks if exists

      onDisconnection && onDisconnection(socket, payload);
    });
    socket.on(EVENT.MESSAGE, function (data) {
      // Prepare payload with message data
      var payload = preparePayload(clientID, config.clients, {
        event: data.type,
        data: data.payload
      }); // Send message to all clients

      !config.overrides.message && io.emit(EVENT.MESSAGE, createEvent(TYPE.MESSAGE, payload));
    }); // Call connection hook if exists

    onConnection && onConnection(socket, payload);
  });
  /**
   * Prepare Payload with caller clientID and existing clients
   *
   * @param {string} clientID
   * @param {string[]} clients
   */

  function preparePayload(clientID, clients, rest) {
    return _objectSpread({
      clientID: clientID,
      clients: clients
    }, rest);
  }
}

module.exports = socketHelper;
module.exports.TYPE = TYPE;
module.exports.EVENT = EVENT;
module.exports.createEvent = createEvent;
