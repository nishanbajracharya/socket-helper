# Socket Helper

Socket.io helper utilities with events inspired by flux standard actions. This package is targeted towards socket server applications and not client applications.

## Why Socket Helper?

SocketIO provides a large set of tools to run websocket servers with ease. What Socket Helper provides is a wrapper for SocketIO with `connection`, `new connection`, `disconnection` and basic `message` events preconfigured.

## Installation

The package is available in the npm registry. To install, use `npm` or `yarn`.

```sh
$ npm install --save socket-helper

$ yarn add socket-helper
```

## Usage

Once installed, make sure that `socket.io` is also installed as this package does not come with it. This will **not** work without `socket.io`.

### Basic Usage

To use Socket Helper, pass `io` from `socket.io` into it.

```js
var io = require('socket.io')(http);

var socketHelper = require('socket-helper');

socketHelper(io);
```

### Custom Listeners

Socket Helper comes with connection and disconnection event listeners by default. We can add our own listeners in addition to the existing ones.

```js
function onConnection(socket, payload) {
  console.log('Connected', payload);
}

function onDisconnection(socket, payload) {
  console.log('Disconnected', payload);
}

socketHelper(io, onConnection, onDisconnection);
```

### Configs and Overrides

We can customize the default configs used by Socket Helper by providing a custom config.

```js
var config = {
  clients: [],
  overrides: {
    message: true,
    connection: true,
    disconnection: true,
    newConnection: true
  }
};

socketHelper(io, onConnection, onDisconnection, config);
```

#### `clients`

The clients key stores the ids of currently active connections.

#### `overrides`

Overrides define whether in-built event handlers for `message`, `connection`, `disconnection` and `newConnection` are disabled or not.

## API

When a new connection is established, the socket server emits two events, one for the new connection and another for all other connected clients.

The data send with the socket event will be FSA compliant, i.e., will have the following format:

```js
{
  type: 'TYPE',
  payload: {
  }
}
```

The socket event will always emit events of name `message`. The data with the event will carry the information about how the event should be handled, similar to Flux actions.

### CONNECTION

| Event     | Type             | Payload                 |
| --------- | ---------------- | ----------------------- |
| `message` | `CONNECTION`     | `{ clientID, clients }` |
| `message` | `NEW_CONNECTION` | `{ clientID, clients }` |

### DISCONNECTION

| Event     | Type            | Payload                 |
| --------- | --------------- | ----------------------- |
| `message` | `DISCONNECTION` | `{ clientID, clients }` |

### MESSAGE

The server is configured by default to listen for and respond to events with name `message`. So when a client emits a `message` event, the server responds to it by broadcasting the message to all the clients including the sender.

| Event     | Type      | Payload                                                     |
| --------- | --------- | ----------------------------------------------------------- |
| `message` | `MESSAGE` | `{clientID, clients, event: data.type, data: data.payload}` |

The server expects client to also send the `message` event with data in FSA format. The data sent by client, will be mapped as `event: type` and `data: payload` when it is sent to all connected clients.

## Contributing

To contribute, follow one of the two options:

- **Open an Issue**

  Open an issue detailing:

  1. What the issue is
  2. Steps to reproduce
  3. Possible solutions

  Note: These details are recommended but are entirely optional.

- **Send a Pull Request**

  Fork this project and send a pull request to the `master` branch.

## LICENSE

MIT
