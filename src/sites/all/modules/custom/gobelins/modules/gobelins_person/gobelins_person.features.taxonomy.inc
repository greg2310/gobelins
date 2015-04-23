<?php
/**
 * @file
 * gobelins_person.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function gobelins_person_taxonomy_default_vocabularies() {
  return array(
    'person_role' => array(
      'name' => 'Person role',
      'machine_name' => 'person_role',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => -8,
    ),
  );
}
