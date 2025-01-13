<?php

function createBeehivesItemsRoute() {
    register_rest_route('beehives/v1', 'create', array(
        'methods' => 'POST',
        'callback' => 'createBeehive',
        'permission_callback' => function () {
            return is_user_logged_in(); 
        },
        
    ));
}
add_action('rest_api_init', 'createBeehivesItemsRoute');

function createBeehive($request) {
    $beehiveNumber = $request->get_param('beehiveNumber');
    
    $post_id = wp_insert_post(array(
        'post_type'   => 'beehive', 
        'post_status' => 'publish', 
    ));

    if (is_wp_error($post_id)) {
        return new WP_Error('post_creation_failed', 'Failed to create a new beehive.', array('status' => 500));
    }

    if (function_exists('update_field')) {
        update_field('beehiveNumber', $beehiveNumber, $post_id);
        update_field('beehiverating', 0, $post_id);
    } 
    if (function_exists('update_field')) {
       
        $fields = array(
            'beehiveNumber' => $beehiveNumber,
            'beehiverating' => 0,
            'giaTaisma'     => false,
            'giaTrugo'      => false,
            'beehiveType' => "Κυψέλη",
            'beehiverating' => 0,
            'amerikanikiSipsogonia'=>false,
            'orfano'=>false,
            'nozemiasi'=>false,
            'kakibasilissa'=>false,
            'baroa'=>false,
            'askosfairwsi'=>false,
            'newtelara'=>0,
            'telara'=>0
        );

        foreach ($fields as $field_key => $value) {
            update_field($field_key, $value, $post_id);
        }
    
    }else {
        return new WP_Error('acf_missing', 'ACF plugin is not active or update_field function not found.', array('status' => 500));
    }

    return rest_ensure_response(array(
        'success'       => true,
        'message'       => 'New beehive created successfully.',
        'post_id'       => $post_id,
        'beehiveNumber' => $beehiveNumber,
    ));
}
