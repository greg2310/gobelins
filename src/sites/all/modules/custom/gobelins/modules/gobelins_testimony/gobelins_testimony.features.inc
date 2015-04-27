<?php
/**
 * @file
 * gobelins_testimony.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_testimony_node_info() {
  $items = array(
    'testimony' => array(
      'name' => t('Testimony'),
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
