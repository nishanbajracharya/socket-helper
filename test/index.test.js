var chai = require('chai');
var expect = chai.expect;

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

      var event = socketHelper.createEvent(eventType, eventPayload, 'prop1', 'prop2');

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.equal(eventType);
      expect(event.payload).to.equal(eventPayload);
    });

    it('should return an FSA compliant object when payload is not provided', function() {
      var eventType = 'SAMPLE_EVENT';

      var event = socketHelper.createEvent(eventType);

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.equal(eventType);
      expect(event.payload).to.equal(undefined);
    });

    it('should return an FSA compliant object when no properties are provided', function() {
      var event = socketHelper.createEvent();

      expect(event).to.have.all.keys('type', 'payload');

      expect(event.type).to.equal(undefined);
      expect(event.payload).to.equal(undefined);
    });
  });
});