<?php
/**
 * @file
 * gobelins_formation_domain.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function gobelins_formation_domain_taxonomy_default_vocabularies() {
  return array(
    'domain_types' => array(
      'name' => 'Domain types / Flags',
      'machine_name' => 'domain_types',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
    'jobs' => array(
      'name' => 'Jobs',
      'machine_name' => 'jobs',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
    ),
  );
}
