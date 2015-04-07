<?php

$aliases['dev'] = array (
  'root' => '/var/www/gobelins',
  'uri'  => 'gobelins.lxc',
);

$aliases['integ'] = array (
  'remote-host' => 'gobelins.eqx.intranet', // or IP
  'remote-user' => 'root',
  'root'        => '/var/www/gobelins',
  'uri'         => 'gobelins.eqx.intranet'
);

$aliases['stage'] = array (
  'remote-host' => '',
  'remote-user' => 'smile',
  'root'        => '/var/www/gobelins',
  'uri'         => ''
);

$aliases['prod'] = array (
  'remote-host' => '',
  'remote-user' => 'smile',
  'root'        => '/var/www/gobelins',
  'uri'         => ''
);
