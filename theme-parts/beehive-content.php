
<?php

$beehives_query_args = array(
    'post_type' => 'beehive',
    'author'    => get_current_user_id(), 
    'posts_per_page' => -1 
);

$beehives_query = new WP_Query( $beehives_query_args );

if($beehives_query->have_posts()){
    set_query_var( 'beehives_query', $beehives_query );
    // get_template_part('theme-parts/groceryAddItem','content');
    get_template_part('theme-parts/groceryList','content');
}

?>

