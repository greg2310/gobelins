#!/bin/bash

PROJECT_PATH="/home/smile/gobelins"
TMP_REBUILD=$PROJECT_PATH/tmp_rebuild
WWW_PATH="/var/www/gobelins"

# Rebuild.
drush make --no-cache $PROJECT_PATH/conf/gobelins.make $TMP_REBUILD

if [ -d "$TMP_REBUILD" ]; then
  echo "Drush make ended without any error. Let's rebuild our project !"

  # Move successfull drush make output in project sources path
  rm -rf $WWW_PATH
  mkdir -p $WWW_PATH
  cp -R $TMP_REBUILD/* $WWW_PATH
  rm -rf $TMP_REBUILD

  # Create project symlinks.
  ln -s $PROJECT_PATH/conf/drupal/default/settings.php     $WWW_PATH/sites/default/settings.php
  ln -s $PROJECT_PATH/src/sites/all/modules/custom         $WWW_PATH/sites/all/modules/custom
  ln -s $PROJECT_PATH/src/sites/all/themes/custom          $WWW_PATH/sites/all/themes/custom
  ln -s $PROJECT_PATH/src/sites/all/translations           $WWW_PATH/sites/all/translations
  ln -s $PROJECT_PATH/data/files                           $WWW_PATH/sites/default/files

  # RobotsTxt module works only after removing the Drupal robots.txt file.
  rm -rf $WWW_PATH/robots.txt

  rm -rf $WWW_PATH/install.php

  # Fix perms.
  chown -R smile:apache $WWW_PATH

  # Launch databases update.
  drush @dev updb

  # Restart apache.
  /etc/init.d/httpd restart

  # Restart redis.
  /etc/init.d/redis restart
else
  echo "Drush make ended with error(s). You need to check it before trying to rebuild your project."
fi
