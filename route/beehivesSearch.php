<?php
// Register the custom REST API route for a specific beehive
function register_specific_beehive_route() {
    register_rest_route( 'beehives/v1', 'search/(?P<beehiveNumber>\d+)', array(
        'methods' => 'GET',
        'callback' => 'get_specific_beehive',
        'permission_callback' => 'is_author_logged_in',
    ) );
}
add_action( 'rest_api_init', 'register_specific_beehive_route' );

// Callback function to get a specific beehive by beehiveNumber
function get_specific_beehive( $data ) {
    // Get the current user's ID
    $user_id = get_current_user_id();
    $beehive_number = $data['beehiveNumber'];

    // Query for the specific beehive
    $args = array(
        'post_type' => 'beehive',  // Change this to your custom post type
        'author' => $user_id,      // Filter by the current user's ID
        'meta_query' => array(
            array(
                'key' => 'beehiveNumber',  // Meta field name
                'value' => $beehive_number, // Value to search for
                'compare' => '='
            )
        ),
        'posts_per_page' => 1, // Only need one result
    );

    // Get the posts
    $query = new WP_Query( $args );

    // Check if the post exists
    if ( $query->have_posts() ) {
        $query->the_post();
        
        $arrwsties = array(
            'orfano' => get_field( 'orfano' ),
            'kakibasilissa' => get_field( 'kakiBasilissa' ),
            'baroa' => get_field( 'baroa' ),
            'askosfairwsi' => get_field( 'askosfairwsi' ),
            'nozemiasi' => get_field( 'nozemiasi' ),
            'amerikanikiSipsogonia' => get_field( 'amerikanikiSipsogonia' ),
        );

        $telara = !empty( get_field( 'telara' ) ) ? get_field( 'telara' ) : 0;
        $new_telara = !empty( get_field( 'newtelara' ) ) ? get_field( 'newtelara' ) : 0;

        $beehive = array(
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

        // Reset post data
        wp_reset_postdata();

        return new WP_REST_Response( $beehive, 200 );
    }

    return new WP_REST_Response( 'No beehive found with the given beehiveNumber.', 404 );
}
