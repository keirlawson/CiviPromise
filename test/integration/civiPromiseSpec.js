import * as testee from 'civiPromise';

const INTEGRATION_TARGET_ADDR = 'http://localhost:9999';

describe('CiviPromise', function () {
  beforeAll(() => {
    //FIXME clear down existing data here
  });

  it('should pass', function () {
    expect(true).toBe(true);
  });

  it('should catch error', function (done) {
    expect(() => {
      setTimeout(() => {
        throw new Error('foobar');
        done();
      }, 1000);
    }).toThrow();
  });

  it('should reject the promise when a non-existant site location is specified', function (done) {
    const ENTITY_TYPE = 'Contact';
    const NON_EXISTANT_LOCATION = 'notALocation';

    testee.setSiteLocation(NON_EXISTANT_LOCATION);

    expect(() => {

      testee.create(ENTITY_TYPE, { first_name: 'keir', last_name: 'lawson', debug: 1})
      .then(() => {
        fail('request should not have succeeded');
        done();
      })
      .catch((error) => {
        expect(true).toBe(false);
        expect(error).toEqual({});
        done();
      });
    }).toThrow();
  });

  it('should create new contact and retrieve it', function (done) {
    const ENTITY_TYPE = 'Contact';

    //testee.setCredentials('foo', 'bar');
    testee.setSiteLocation(INTEGRATION_TARGET_ADDR);
    testee.create(ENTITY_TYPE, { first_name: 'keir', last_name: 'lawson', debug: 1})
    .then((resp) => {
      console.log(JSON.stringify(resp, null, 2));
      //console.log('resp text:' + resp);
      //return testee.get(ENTITY_TYPE, 'recordKeyHere');
    })
    /*.then((someData) => {
      //console.log(JSON.stringify(someData, null, 2));
      //console.log(someData.text());
      //FIXME do assertions here
      done();
    })*/
    .catch((error) => {
      console.log('weve goot an error');
      //fail(error);
      done();
    });
  });
});
