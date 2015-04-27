<?php
/**
 * @file
 * gobelins_faq.features.inc
 */

/**
 * Implements hook_node_info().
 */
function gobelins_faq_node_info() {
  $items = array(
    'faq' => array(
      'name' => t('FAQ Item'),
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
