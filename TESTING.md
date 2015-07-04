## Running integration tests

Integration tests expect a CiviCRM instance running on localhost at port 8888 to run tests against.  To run them locally the `setupTestEnv.sh` shell script located within the integration tests directory can be used. This script downloads and installs a Drupal/CiviCRM environment.  This script requires the following to be already installed:

* PHP (including various [Drupal required extensions](https://www.drupal.org/requirements/php#extensions), usually mysql, xml and gd)
* MySQL
* [Drush](http://www.drush.org/en/master/) (most readily installed via the PHP package manager [Composer](https://getcomposer.org/))
