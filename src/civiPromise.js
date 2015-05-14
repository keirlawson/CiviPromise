var civiPromise = {};

(function () {
  'use strict';

  var HTTP_GET = 'GET';
  var HTTP_POST = 'POST';

  var civiDetails = {};

  function composeUrl() {
    
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
