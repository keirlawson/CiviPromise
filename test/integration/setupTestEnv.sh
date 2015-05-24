#!/bin/bash
DB_UNAME='root'
DB_NAME='int_test'
DRUPAL_DIR='testDrupal'

read -s -p "Enter MySQL root password: " DB_ROOT_PASSWORD
mysql -e "create database IF NOT EXISTS $DB_NAME;" -u$DB_UNAME -p$DB_ROOT_PASSWORD
drush dl drupal-7.x --drupal-project-rename=$DRUPAL_DIR
cd $DRUPAL_DIR
drush site-install standard -y --account-name=admin --account-pass=admin --db-url=mysql://$DB_UNAME:$DB_ROOT_PASSWORD@localhost/$DB_NAME 
cd ..
