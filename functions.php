<?php

require get_theme_file_path('/route/beehiveSave.php');
require get_theme_file_path('/route/getbeeHives.php');
require get_theme_file_path('/route/beehiveCreate.php');
require get_theme_file_path('/route/beehiveDelete.php');
require get_theme_file_path('/route/beehivesSearch.php');
require get_theme_file_path('/icons/beehiveIcon.php');

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

function beeApp_Post_Types() {
register_post_type('beehive', array(
    'capability_type' => 'beehive',
    'map_meta_cap' => true,
    'show_in_rest' => true,
    'supports' => array('title'),
    'public' => false,
    'show_ui' => true,
    'labels' => array(
      'name' => 'Beehives',
      'add_new_item' => 'Add New beehive',
      'edit_item' => 'Edit beehive',
      'all_items' => 'All Beehives',
      'singular_name' => 'Beehive'
    ),
    'menu_icon' => 'dashicons-welcome-write-blog'
  ));
}
add_action('init', 'beeApp_Post_Types');
function filter_admin_user_posts($query) {
    if ( is_admin() && $query->is_main_query() && is_user_logged_in() ) {
        // Only allow users to see their own posts in the admin
        $query->set('author', get_current_user_id());
    }
}
add_action('pre_get_posts', 'filter_admin_user_posts');

function filter_rest_api_query_by_current_user( $args, $request ) {
    if ( is_user_logged_in() ) {
        $current_user_id = get_current_user_id();
        if ( isset( $request['post_type'] ) && ( 'post' === $request['post_type'] || 'beehive' === $request['post_type'] ) ) {
            $args['author'] = $current_user_id;
        }
    }
    return $args;
}
add_filter( 'rest_post_query', 'filter_rest_api_query_by_current_user', 10, 2 );
add_filter( 'rest_beehive_query', 'filter_rest_api_query_by_current_user', 10, 2 );  
function custom_login_redirect($redirect_to, $request, $user) {
    return home_url(); 
}
add_filter('login_redirect', 'custom_login_redirect', 10, 3);

function redirect_non_logged_in_users() {
    global $pagenow;
    if ( ! is_user_logged_in() && $pagenow !== 'wp-login.php' && ! is_admin() ) {
        wp_redirect( wp_login_url() ); 
        exit;
    }
}
add_action( 'template_redirect', 'redirect_non_logged_in_users' );
add_action( 'wp_logout', function() {
    wp_redirect( wp_login_url() ); 
    exit;
});
add_filter('rest_post_collection_params', function ($params) {
    if (isset($params['per_page'])) {
        $params['per_page']['maximum'] = 1000; 
    }
    return $params;
});
function test() {
    wp_enqueue_style('dashicons');
    wp_enqueue_style('beeman-styles', get_theme_file_uri('/src/css/beelist.css'));
    wp_enqueue_script('new-script', get_theme_file_uri('/src/js/index.js'), array('jquery'), '1.0', true);
	wp_localize_script('new-script', 'beeAppData', array(
        'root_url' => esc_url(home_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}
add_action( 'wp_enqueue_scripts', 'test' );

add_filter('script_loader_tag', function($tag, $handle) {
    if ('new-script' !== $handle) {
        return $tag;
    }
    return str_replace('text/javascript', 'module', $tag);
}, 10, 2);