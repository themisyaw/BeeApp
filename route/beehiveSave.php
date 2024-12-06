<?php
function saveBeehivesItemsRoute(){

    register_rest_route('beehives/v1', 'save', array(
        'methods'=>'POST',
        'callback'=>'updatebeehive',
        'permission_callback' => function () {
            return is_user_logged_in(); // Only logged-in users can access this route
        }
    ));
}
add_action('rest_api_init','saveBeehivesItemsRoute');

function updatebeehive($request) {
    $data = $request->get_json_params();

    if (isset($data['id'])) {
        // Handle a single beehive update
        return update_single_beehive($data);
    } elseif (isset($data[0]) && is_array($data)) {
        // Handle an array of beehives
        $results = [];
        foreach ($data as $beehive) {
            $result = update_single_beehive($beehive);
            $results[] = $result;
        }
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Beehives updated successfully.',
            'results' => $results,
        ));
    } else {
        return new WP_Error('invalid_data', 'Invalid data format.', array('status' => 400));
    }
}

function update_single_beehive($data) {
    if (empty($data['id']) || !is_numeric($data['id'])) {
        return new WP_Error('invalid_post_id', 'Invalid or missing post ID.', array('status' => 400));
    }
    $post_id = intval($data['id']);
    $post = get_post($post_id);
    if (!$post || $post->post_type !== 'beehive') { // Replace with your custom post type
        return new WP_Error('post_not_found', 'Post not found or invalid post type.', array('status' => 404));
    }

    $fields_to_update = array(
        'beehiveNumber',
        'beehiveType',
        'beehiverating',
        'giaTaisma',
        'giaTrugo',
        'newtelara',
        'telara'
    );
    foreach ($fields_to_update as $field) {
        if (isset($data[$field])) {
            update_field($field, $data[$field], $post_id); // Using ACF's `update_field` function
        }
    }
    $arrwsties = $data['arrwsties'] ?? []; // Grab arrwsties from the incoming data

    if (is_array($arrwsties)) {
        foreach ($arrwsties as $key => $value) {
            if (in_array($key, ['askosfairwsi', 'baroa', 'kakibasilissa', 'nozemiasi', 'orfano', 'amerikanikiSipsogonia'])) {
                update_field($key, $value, $post_id); // Use ACF's update_field function to update checkboxes
            }
        }
    }
    return array(
        'success' => true,
        'message' => 'Post updated successfully.',
        'post_id' => $post_id,
    );
}
