<?php
/**
 * @file
 * gobelins_component.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_component_node_info() {
  $items = array(
    'component' => array(
      'name' => t('Component'),
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
