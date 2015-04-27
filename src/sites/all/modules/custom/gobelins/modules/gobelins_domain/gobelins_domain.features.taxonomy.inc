<?php
/**
 * @file
 * gobelins_domain.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function gobelins_domain_taxonomy_default_vocabularies() {
  return array(
    'domain_types' => array(
      'name' => 'Domain types',
      'machine_name' => 'domain_types',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => -10,
    ),
    'jobs' => array(
      'name' => 'Jobs',
      'machine_name' => 'jobs',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => -7,
    ),
    'thematic' => array(
      'name' => 'Thematic',
      'machine_name' => 'thematic',
      'description' => '',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => -6,
    ),
  );
}
