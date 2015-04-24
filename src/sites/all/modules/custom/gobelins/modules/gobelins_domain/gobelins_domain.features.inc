<?php
/**
 * @file
 * gobelins_domain.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function gobelins_domain_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_node_info().
 */
function gobelins_domain_node_info() {
  $items = array(
    'domain' => array(
      'name' => t('Domaine'),
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
