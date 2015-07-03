import fetch from 'isomorphic-fetch';
import generateUrl from 'generateUrl';

const HTTP_GET = 'GET';
const HTTP_POST = 'POST';

const CREATE_ACTION = 'create';
const GET_ACTION = 'get';

let civiDetails = {};

function queryCivi(method, action, entityType, data) {
  let url = generateUrl(action, entityType, civiDetails, data);
  return fetch(url, {method});
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
