const Chai = require('chai');
const assert = Chai.assert;
const Path = require('path');

const LogWinston = require('../index').LogWinston;
const Logger = require('../index');

describe('log-winston', () => {

  it('create console all', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'console'
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  it('create console error', () => {
    let log = new LogWinston({
      transports: [
        {
          level: 'error',
          type: 'console'
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  it('create file', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'file',
          filename: Path.join(__dirname, '../logfiles/info.log')
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });

  it('to loggly', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'loggly',
          token: 'xxxxx',
          subdomain: 'test-env'
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });


  it('to slack', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'slack',
          url: 'https://hooks.slack.com/services/XXXXXXX/XXXXX/XXXXX',
        }
      ]
    });
    log.info('start', 'some info');
    log.error('error', 'hot line');
  });



  it('has a decorator', () => {
    let log = new LogWinston({
      transports: [
        {
          type: 'memory'
        }
      ],
      decorator: (msg) => {
        return 'yes it worked';
      }
    });
    log.info('some info');
    assert.isTrue(log.hasMessages(), 'did store something');
    assert.equal(log.log[0].message, 'yes it worked', 'did change the message');
  });


  it('pipe', () => {
    let log = new Logger({toConsole: false});
    let logW = new LogWinston( {
      transports: [
       {
         type: 'memory'
        },
      ],
      pipe: log
    });

    logW.info('some field', 'what');
    assert.equal(logW.log.length, 1, 'has one message');
    assert.equal(log.log.length, 1, 'has one message');
    logW.pipe = false;
    logW.info('some field', 'some more');
    assert.equal(logW.log.length, 2, 'has two message');
    assert.equal(log.log.length, 1, 'has one message');

  })

});
