
<?php


get_header();

if ( is_user_logged_in() ) {

    $beehives_query_args = array(
        'post_type' => 'beehive',
        'author'    => get_current_user_id(), 
        'posts_per_page' => -1,
        'meta_key'=>'beehiveNumber',
        'orderby'=>'meta_value_num',
        'order'=>'ASC'
    );
    
    $beehives_query = new WP_Query( $beehives_query_args );
    
    if($beehives_query->have_posts()){
        set_query_var( 'beehives_query', $beehives_query );
        get_template_part('theme-parts/beehiveEdit','content');
        get_template_part('theme-parts/groceryAddItem','content');
        get_template_part('theme-parts/beehives','content');
    }
    

}

get_footer();



?>