<?php
/**
 * @file
 * gobelins_formation.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function gobelins_formation_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function gobelins_formation_node_info() {
  $items = array(
    'formation' => array(
      'name' => t('Formation'),
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
