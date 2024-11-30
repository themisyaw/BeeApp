<?php
// Register the custom REST API route
function register_beehive_user_route() {
    register_rest_route( 'userBeehives/v1', 'beehives', array(
        'methods' => 'GET',
        'callback' => 'get_beehives_for_current_user',
        'permission_callback' => 'is_author_logged_in',
    ) );
}
add_action( 'rest_api_init', 'register_beehive_user_route' );

// Check if the user is an author
function is_author_logged_in() {
    // Check if the current user is logged in and has the 'author' role
    if ( is_user_logged_in()  ) {
        return true;
    }
    return false;
}

// Callback function to get all beehive posts for the current user
function get_beehives_for_current_user( $data ) {
    // Get the current user's ID
    $user_id = get_current_user_id();

    // Query for the Beehive custom post type
    $args = array(
        'post_type' => 'beehive',  // Change this to your custom post type
        'author' => $user_id,      // Filter by the current user's ID
        'posts_per_page' => -1,     // Get all posts
    );

    // Get the posts
    $query = new WP_Query( $args );

    // Check if there are posts
    if ( $query->have_posts() ) {
        $beehives = array();

        // Loop through the posts and add them to the array
        while ( $query->have_posts() ) {
            $query->the_post();
        
            $arrwsties = array(
                'orfano' => get_field( 'orfano' ),
                'kakibasilissa' => get_field( 'kakiBasilissa' ),
                'baroa' => get_field( 'baroa' ),
                'askosfairwsi' => get_field( 'askosfairwsi' ),
                'nozemiasi' => get_field( 'nozemiasi' ),
                'amerikanikiSipsogonia' => get_field( 'amerikanikiSipsogonia' ),
            );
        
            $telara = get_field( 'telara' );
            $new_telara = get_field( 'newtelara' );
            $telara = ( $telara === null || $telara === '' ) ? 0 : $telara;
            $new_telara = ( $new_telara === null || $new_telara === '' ) ? 0 : $new_telara;
        
            $beehives[] = array(
                'id' => get_the_ID(),
                'arrwsties' => $arrwsties,
                'beehiveNumber' => get_field( 'beehiveNumber' ),
                'telara' => $telara,
                'newtelara' => $new_telara,
                'giaTrugo' => get_field( 'giaTrugo' ),
                'giaTaisma' => get_field( 'giaTaisma' ),
                'beehiverating' => get_field( 'beehiverating' ),
                'beehiveType' => get_field( 'beehiveType' ),
                'title' => get_the_title(),
                'date' => get_the_date(),
            );
        }
        

        

        // Reset post data
        wp_reset_postdata();

        return new WP_REST_Response( $beehives, 200 );
    }

    return new WP_REST_Response( 'No beehives found for the current user.', 404 );
}
?>