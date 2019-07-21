var chai = require('chai');
var expect = chai.expect;

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

var socketHelper = require('../lib/socket-helper');

describe('Socket Helper Imports', function() {
  describe('createEvent', function() {
    it('should return an FSA compliant object', function() {
      var eventType = 'SAMPLE_EVENT';
      var eventPayload = { data: 'Hello World' };

      var event = socketHelper.createEvent(eventType, eventPayload);

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.equal(eventType);
      expect(event.payload).to.equal(eventPayload);
    });

    it('should return an FSA compliant object when extra properties are provided', function() {
      var eventType = 'SAMPLE_EVENT';
      var eventPayload = { data: 'Hello World' };

      var event = socketHelper.createEvent(
        eventType,
        eventPayload,
        'prop1',
        'prop2'
      );

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.deep.equal(eventType);
      expect(event.payload).to.deep.equal(eventPayload);
    });

    it('should return an FSA compliant object when payload is not provided', function() {
      var eventType = 'SAMPLE_EVENT';

      var event = socketHelper.createEvent(eventType);

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.deep.equal(eventType);
      expect(event.payload).to.deep.equal(undefined);
    });

    it('should return an FSA compliant object when no properties are provided', function() {
      var event = socketHelper.createEvent();

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.deep.equal(undefined);
      expect(event.payload).to.deep.equal(undefined);
    });
  });

  describe('EVENT and TYPE', function() {
    it('should return correct EVENT', function() {
      expect(socketHelper.EVENT).to.deep.equal(EVENT);
    });

    it('should return correct TYPE', function() {
      expect(socketHelper.TYPE).to.deep.equal(TYPE);
    });
  });
});
