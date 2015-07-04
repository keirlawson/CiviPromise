A thin wrapper around [CiviCRM](https://civicrm.org/)'s REST API using ES6 promises.  Currently designed to work as a commonjs module in the browser. For now only creating and retrieving entities is supported.

## Usage example ##

```js
var civiPromise = require('civi-promise');
var contactData = {first_name: 'Joe', last_name: 'bloggs'};

civiPromise.create('Contact', contactData)
  .then(function (civiResponse) {
    
  })
  .catch(function (error) {
    console.log('Something went wrong: ' + error);
  });
```

## API ##
