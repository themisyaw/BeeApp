<?php

function register_beehiveForFeed_user_route() {
    register_rest_route( 'userBeehives/v1', 'beehivesForFeed', array(
        'methods' => 'GET',
        'callback' => 'get_beehivesForFeed_for_current_user',
        'permission_callback' => 'is_author_logged_in',
    ) );
}
add_action( 'rest_api_init', 'register_beehiveForFeed_user_route' );

function get_beehivesForFeed_for_current_user( $data ) {
    
    $user_id = get_current_user_id();
    $args = array(
        'post_type' => 'beehive',  
        'author' => $user_id,      
        'posts_per_page' => -1,    
    );
    $query = new WP_Query( $args );
    
    if ( $query->have_posts() ) {
        $beehivesForFeed = array();
        while ( $query->have_posts() ) {
            $query->the_post();

            if(get_field( 'giaTaisma' )){
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
            
                $beehivesForFeed[] = array(
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
        }
        
        usort( $beehivesForFeed, function( $a, $b ) {
            return intval( $a['beehiveNumber'] ) - intval( $b['beehiveNumber'] );
        });
        wp_reset_postdata();

        return new WP_REST_Response( $beehivesForFeed, 200 );
    }

    return new WP_REST_Response( 'No beehives found for the current user.', 404 );
}
