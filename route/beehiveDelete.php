<?php

add_action('rest_api_init', function () {
    register_rest_route('beehives/v1', 'delete', array(
        'methods' => 'DELETE',
        'callback' => 'delete_beehive',
        'permission_callback' => function () {
            return current_user_can('delete_posts'); 
        },
        
    ));
});

function delete_beehive(WP_REST_Request $request) {
    $id = $request->get_param('id');

    if (empty($id) || !is_numeric($id)) {
        return new WP_Error('invalid_id', 'Invalid beehive ID', array('status' => 400));
    }
    $deleted = wp_delete_post($id, true); 
    if ($deleted) {
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Beehive deleted successfully',
            'deleted_id' => $id,
        ));
    } else {
        return new WP_Error('delete_failed', 'Failed to delete beehive', array('status' => 500));
    }
}