<?php

require get_theme_file_path('/route/beehiveSave.php');
require get_theme_file_path('/route/getbeeHives.php');
require get_theme_file_path('/icons/beehiveIcon.php');


function beeApp_Post_Types() {
// Note Post Type
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
    // Check if the user is logged in
    if ( is_user_logged_in() ) {
        $current_user_id = get_current_user_id();

        // If the request is for posts or custom post types like 'note', filter by author (current user)
        if ( isset( $request['post_type'] ) && ( 'post' === $request['post_type'] || 'beehive' === $request['post_type'] ) ) {
            // Add the 'author' argument to filter posts by the current user
            $args['author'] = $current_user_id;
        }
    }

    return $args;
}
add_filter( 'rest_post_query', 'filter_rest_api_query_by_current_user', 10, 2 );
add_filter( 'rest_beehive_query', 'filter_rest_api_query_by_current_user', 10, 2 );  



function custom_login_redirect($redirect_to, $request, $user) {
    // Redirect users to a custom dashboard or home page
    return home_url(); // Change to your desired URL
}
add_filter('login_redirect', 'custom_login_redirect', 10, 3);

function redirect_non_logged_in_users() {
    global $pagenow;

    // Check if the user is not logged in and not accessing login or admin pages
    if ( ! is_user_logged_in() && $pagenow !== 'wp-login.php' && ! is_admin() ) {
        wp_redirect( wp_login_url() ); // Redirect to the login page
        exit;
    }
}
add_action( 'template_redirect', 'redirect_non_logged_in_users' );

add_action( 'template_redirect', 'redirect_non_logged_in_users' );

add_action( 'wp_logout', function() {
    wp_redirect( wp_login_url() ); // Redirect to the login page
    exit;
});



add_filter('rest_post_collection_params', function ($params) {
    if (isset($params['per_page'])) {
        $params['per_page']['maximum'] = 1000; // Increase the maximum limit
    }
    return $params;
});

function test() {

    wp_enqueue_style('dashicons');
    wp_enqueue_style('beeman-styles', get_theme_file_uri('/src/css/beelist.css'));
    // wp_enqueue_style('groceries-styles', get_theme_file_uri('/src/css/grocery.css'));
    // wp_enqueue_style('reminder-styles', get_theme_file_uri('/src/css/reminder.css'));
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