import * as testee from 'civiPromise';

const INTEGRATION_TARGET_ADDR = 'http://localhost:9999';

describe('CiviPromise', function () {
  beforeAll(() => {
    //FIXME clear down existing data here
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
