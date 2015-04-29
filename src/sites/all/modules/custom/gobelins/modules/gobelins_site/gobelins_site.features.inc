<?php
/**
 * @file
 * gobelins_site.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_site_node_info() {
  $items = array(
    'site' => array(
      'name' => t('Site'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Titre'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
