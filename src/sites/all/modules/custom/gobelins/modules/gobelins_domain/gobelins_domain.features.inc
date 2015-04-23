<?php
/**
 * @file
 * gobelins_domain.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_domain_node_info() {
  $items = array(
    'domain' => array(
      'name' => t('Domain'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
