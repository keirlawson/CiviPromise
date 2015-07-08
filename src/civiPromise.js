import 'isomorphic-fetch';
import generateUrl from 'generateUrl';

const HTTP_GET = 'GET';
const HTTP_POST = 'POST';

const CREATE_ACTION = 'create';
const GET_ACTION = 'get';

let civiDetails = {};

function validateResponseBody(responseBody) {
  if ( responseBody.is_error === '???') {//FIXME check what this is
    return Promise.reject('Error msg here');//FIXME check what this is
  } else {
    return Promise.resolve(responseBody);
  }
}

function fetchBody(url, method) {
  let responsePromise = fetch(url, {method});
  //FIXME what if status code isnt 200?
  return responsePromise.then(response => response.json()).then(validateResponseBody);
}

function queryCivi(method, action, entityType, data) {
  let url = generateUrl(action, entityType, civiDetails, data);
  console.log(url);
  return fetchBody(url, method);
}

export const get = queryCivi.bind(undefined, HTTP_GET, GET_ACTION);

export const create = queryCivi.bind(undefined, HTTP_POST, CREATE_ACTION);

export function setSiteLocation(siteLocation) {
  civiDetails.siteLocation = siteLocation;
}

export function setCredentials(siteKey, apiKey) {
  civiDetails.siteKey = siteKey;
  civiDetails.apiKey = apiKey;
}
