#!/bin/bash
DB_UNAME='root'
DB_NAME='int_test'
DRUPAL_DIR='testDrupal'
CIVI_ARCHIVE_NAME='civicrm-4.6.3-drupal.tar.gz'
CIVI_DOWNLOAD_URL='https://download.civicrm.org'

#Fail the whole script on any errors
set -e

#Set up DB
read -s -p "Enter MySQL root password: " DB_ROOT_PASSWORD
mysql -e "create database IF NOT EXISTS $DB_NAME;" -u$DB_UNAME -p$DB_ROOT_PASSWORD

#Install Drupal
drush dl drupal-7.x --drupal-project-rename=$DRUPAL_DIR
cd $DRUPAL_DIR
drush site-install standard -y --account-name=admin --account-pass=admin --db-url=mysql://$DB_UNAME:$DB_ROOT_PASSWORD@localhost/$DB_NAME

#Fix directory permissions
chmod +w sites/default

#Install CiviCRM
if [ ! -f $CIVI_ARCHIVE_NAME ]; then
  wget $CIVI_DOWNLOAD_URL/$CIVI_ARCHIVE_NAME
fi
tar -xf $CIVI_ARCHIVE_NAME --strip=2 civicrm/drupal/drush/civicrm.drush.inc
drush cache-clear drush
drush civicrm-install --tarfile=$CIVI_ARCHIVE_NAME --dbuser=$DB_UNAME --dbpass=$DB_ROOT_PASSWORD --dbname=$DB_NAME
cd ..
