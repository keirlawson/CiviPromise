import testee from 'generateUrl';
import url from 'url';

const EXPECTED_PATH = '/sites/all/modules/civicrm/extern/rest.php';

function containsStandardComponents(parsedQuery, action, entityType) {
  return parsedQuery.action === action
    && parsedQuery.entity === entityType
    && parsedQuery.json === '1'
    && parsedQuery.version === '3';
}

describe('generateUrl function', function () {
  it('should generate a correct URL when provided a site location', function () {
    let result = testee('create', 'contact', { siteLocation: 'http://somehost' });

    let parsedResult = url.parse(result, true);

    expect(parsedResult.host).toEqual('somehost');
    expect(parsedResult.pathname).toEqual(EXPECTED_PATH);
    expect(containsStandardComponents(parsedResult.query, 'create', 'contact')).toBe(true);
    expect(Object.keys(parsedResult.query).length).toEqual(4);
  });

  it('should generate a correct URL when provided a site location and keys', function () {
    const CIVI_DETAILS = { siteLocation: 'http://somehost', siteKey: 'someSiteKey', apiKey: 'someApiKey'};

    let result = testee('update', 'group', CIVI_DETAILS);

    let parsedResult = url.parse(result, true);

    expect(parsedResult.host).toEqual('somehost');
    expect(parsedResult.pathname).toEqual(EXPECTED_PATH);
    expect(containsStandardComponents(parsedResult.query, 'update', 'group')).toBe(true);
    expect(parsedResult.query.key).toEqual('someSiteKey');
    expect(parsedResult.query.api_key).toEqual('someApiKey');
    expect(Object.keys(parsedResult.query).length).toEqual(6);
  });

  it('should generate a correct URL when provided a site location and data', function () {
    const DATA = { someField: 'someValue', anotherField: 'anotherValue'};
    let result = testee('create', 'membership', { siteLocation: 'http://somehost'}, DATA);

    let parsedResult = url.parse(result, true);

    expect(parsedResult.host).toEqual('somehost');
    expect(parsedResult.pathname).toEqual(EXPECTED_PATH);
    expect(containsStandardComponents(parsedResult.query, 'create', 'membership')).toBe(true);
    expect(parsedResult.query.someField).toEqual('someValue');
    expect(parsedResult.query.anotherField).toEqual('anotherValue');
    expect(Object.keys(parsedResult.query).length).toEqual(6);
  });

  it('should generate a correct URL when provided a site location, data and keys', function () {
    const CIVI_DETAILS = { siteLocation: 'http://somehost', siteKey: 'someSiteKey', apiKey: 'someApiKey'};
    const DATA = { someField: 'someValue', anotherField: 'anotherValue'};

    let result = testee('get', 'relationship', CIVI_DETAILS, DATA);

    let parsedResult = url.parse(result, true);

    expect(parsedResult.host).toEqual('somehost');
    expect(parsedResult.pathname).toEqual(EXPECTED_PATH);
    expect(containsStandardComponents(parsedResult.query, 'get', 'relationship')).toBe(true);
    expect(parsedResult.query.someField).toEqual('someValue');
    expect(parsedResult.query.anotherField).toEqual('anotherValue');
    expect(parsedResult.query.key).toEqual('someSiteKey');
    expect(parsedResult.query.api_key).toEqual('someApiKey');
    expect(Object.keys(parsedResult.query).length).toEqual(8);
  });
});
