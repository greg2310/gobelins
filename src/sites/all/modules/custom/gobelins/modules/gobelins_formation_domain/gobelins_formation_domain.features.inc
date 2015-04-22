<?php
/**
 * @file
 * gobelins_formation_domain.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_formation_domain_node_info() {
  $items = array(
    'formation_domain' => array(
      'name' => t('Formation Domain'),
      'base' => 'node_content',
      'description' => t('Manage content domain for Formation entities'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
