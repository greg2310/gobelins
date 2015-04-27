<?php
/**
 * @file
 * gobelins_formation.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function gobelins_formation_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_details|node|formation|form';
  $field_group->group_name = 'group_details';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Details',
    'weight' => '13',
    'children' => array(
      0 => 'field_subtitle',
      1 => 'field_public',
      2 => 'field_objectives',
      3 => 'field_aptitudes',
      4 => 'field_validation',
      5 => 'field_presentation',
      6 => 'field_prerequisite',
      7 => 'field_learning',
      8 => 'field_program',
      9 => 'field_material',
      10 => 'field_skills',
      11 => 'field_course_material',
      12 => 'field_hours',
      13 => 'field_evaluation',
      14 => 'field_selection',
      15 => 'field_terms',
      16 => 'field_exam',
      17 => 'field_the_more',
      18 => 'title',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-details field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_details|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_links|node|formation|form';
  $field_group->group_name = 'group_links';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Links',
    'weight' => '9',
    'children' => array(
      0 => 'field_formations',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-links field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_links|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_medias_documents|node|formation|form';
  $field_group->group_name = 'group_medias_documents';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Medias & documents',
    'weight' => '14',
    'children' => array(
      0 => 'field_medias',
      1 => 'field_documents',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-medias-documents field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_medias_documents|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_references|node|formation|form';
  $field_group->group_name = 'group_references';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'References',
    'weight' => '8',
    'children' => array(
      0 => 'field_reference',
      1 => 'field_cpf_code',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-references field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_references|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_search_classification|node|formation|form';
  $field_group->group_name = 'group_search_classification';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Search & classification',
    'weight' => '11',
    'children' => array(
      0 => 'field_flags',
      1 => 'field_jobs',
      2 => 'field_thematics',
      3 => 'field_domains',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-search-classification field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_search_classification|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_structural_informations|node|formation|form';
  $field_group->group_name = 'group_structural_informations';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Structural informations',
    'weight' => '10',
    'children' => array(
      0 => 'field_url',
      1 => 'field_registration_mode',
      2 => 'field_testimonies',
      3 => 'field_persons',
      4 => 'field_projects',
      5 => 'field_faq_items',
      6 => 'field_news',
      7 => 'field_duration',
      8 => 'field_price',
      9 => 'field_site',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-structural-informations field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_structural_informations|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tabs|node|formation|form';
  $field_group->group_name = 'group_tabs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Tabs',
    'weight' => '0',
    'children' => array(
      0 => 'group_references',
      1 => 'group_links',
      2 => 'group_structural_informations',
      3 => 'group_search_classification',
      4 => 'group_details',
      5 => 'group_medias_documents',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-tabs field-group-htabs',
      ),
    ),
  );
  $export['group_tabs|node|formation|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_testimonies|node|formation|form';
  $field_group->group_name = 'group_testimonies';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'formation';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Testimonies',
    'weight' => '15',
    'children' => array(
      0 => 'field_testimonies',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-testimonies field-group-htab',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $export['group_testimonies|node|formation|form'] = $field_group;

  return $export;
}
