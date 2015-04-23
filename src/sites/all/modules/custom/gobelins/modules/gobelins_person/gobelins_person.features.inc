<?php
/**
 * @file
 * gobelins_person.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_person_node_info() {
  $items = array(
    'person' => array(
      'name' => t('Person'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Lastname'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
