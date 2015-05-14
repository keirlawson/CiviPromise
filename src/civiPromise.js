var civiPromise = {};

(function () {
  'use strict';

  var HTTP_GET = 'GET';
  var HTTP_POST = 'POST';
  var STANDARD_ENDPOINT = '/sites/all/modules/civicrm/extern/rest.php';

  var civiDetails = {};

  function generateQueryParam(params, key) {
    var encodedKey = encodeURIComponent(key);
    var encodedValue = encodeURIComponent(params[key]);
    return encodedKey + '=' + encodedValue;
  }

  function generateQueryString(params) {
    var generateFn = generateQueryParam.bind(undefined, params);
    var queryString = Object.keys(params).map(generateFn);
    return '?' + queryString;
  }

  function generateParams(entityType) {
    var params = {
      json: 1,
      version: 3,
      entity: entityType
    };

    //
    //  key: civiDetails.siteKey,
    //  api_key: civiDetails.apiKey,
    //  action: action

    return params;
  }

  function composeUrl(method, entityType) {
    var queryString = generateQueryString(generateParams(entityType));
    return civiDetails.siteLocation + STANDARD_ENDPOINT + queryString;
  }

  function queryCivi(method, entityType) {
    return fetch(composeUrl(method, entityType));
  }

  civiPromise.get = function (entityType) {
    return queryCivi(HTTP_GET, entityType);
  };

  civiPromise.create = function (entityType) {
    return queryCivi(HTTP_POST, entityType);
  };

  civiPromise.setSiteLocation = function (siteLocation) {
    civiDetails.siteLocation = siteLocation;
  };

  civiPromise.setCredentials = function (siteKey, apiKey) {
    civiDetails.siteKey = siteKey;
    civiDetails.apiKey = apiKey;
  };
})();
