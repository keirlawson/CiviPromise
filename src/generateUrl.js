const STANDARD_ENDPOINT = '/sites/all/modules/civicrm/extern/rest.php';

function generateQueryParam(params, key) {
  let encodedKey = encodeURIComponent(key);
  let encodedValue = encodeURIComponent(params[key]);
  return `${encodedKey}=${encodedValue}`;
}

function generateQueryString(params) {
  let generateFn = generateQueryParam.bind(undefined, params);
  let queryString = Object.keys(params).map(generateFn).join('&');
  return '?' + queryString;
}

function generateParams(action, entityType, civiDetails, data) {
  let params = {
    json: 1,
    version: 3,
    entity: entityType,
    action
  };

  if (civiDetails.apiKey !== undefined && civiDetails.siteKey !== undefined) {
    Object.assign(params, {key: civiDetails.siteKey, api_key: civiDetails.apiKey});// eslint-disable-line camelcase
  }

  return Object.assign(params, data);
}

export default function generateUrl(action, entityType, civiDetails, data){
  let queryString = generateQueryString(generateParams(action, entityType, civiDetails, data));
  return civiDetails.siteLocation + STANDARD_ENDPOINT + queryString;
}
