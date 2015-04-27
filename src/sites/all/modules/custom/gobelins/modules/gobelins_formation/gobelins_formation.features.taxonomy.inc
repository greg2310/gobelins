<?php
/**
 * @file
 * gobelins_formation.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function gobelins_formation_taxonomy_default_vocabularies() {
  return array(
    'flags' => array(
      'name' => 'Flags',
      'machine_name' => 'flags',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => -9,
    ),
  );
}
