## Running integration tests

Integration tests require a CiviCRM instance to run against.  To run them locally the `setupTestEnv.sh` shell script located within the integration tests directory can be used. This script downloads and installs a Drupal/CiviCRM environment.  This script requires the following to be already installed:

* PHP (including php-mysql)
* MySQL
* [Drush](http://www.drush.org/en/master/) (most readily installed via the PHP package manager [Composer](https://getcomposer.org/))
