
<?php

$beehives_query = get_query_var( 'beehives_query' );
?>
<section class="container my-5 beehivesListTab d-block">
<ul class=" py-0 px-2 row d-blockjustify-content-center beehivesListULsss  ">
            <div class="py-4 my-3 shadow rounded text-start col-5 mx-2 kypsssseli">
                <div class="row d-block p-0 m-0">
                    <div class="col">
                        <h5 class="text-dark text-center" >101</h5>
                    </div>
                    <div class="col p-0 text-center">
                        <?php echo get_svg_icon('beehive'); ?>
                    </div>
                </div>
            </div>
            <div class="py-4 my-3 shadow rounded text-start col-5 mx-2 kyssspseli">
                <div class="row d-block p-0 m-0">
                    
                    <div class="col">
                        <h5 class="text-dark text-center" >101</h5>
                        
                    
                    </div>
                    <div class="col p-0 text-center">
                        
                        <?php echo get_svg_icon('beehive'); ?>
                    </div>
                </div>
                
            
                
            </div>
       
       
    
   

</ul>
    <h3 class="py-3 text-start"> List </h3>
<?php
if ($beehives_query->have_posts()) {
    ?> <ul class=" py-0 px-2 row justify-content-center beehivesListUL "> <?php 
    while ($beehives_query->have_posts()) {
        $beehives_query->the_post();
        ?>
            <div class="py-4 my-3 shadow rounded text-start col-12 mx-2 kypseli" data-id="<?php the_ID(); ?>">
                <div class="row p-0 m-0">
                    
                    <div class="col">
                        <h5 class="text-dark" >Beehive <?php echo get_field('beehiveNumber') ?></h5>
                        <h6 class="text-dark" >:  <?php echo get_field('telara') ?></h6>
                    
                    </div>
                    <div class="col-4 p-0 text-center">
                        
                        <?php echo get_svg_icon('beehive'); ?>
                    </div>
                </div>
                
            
                
            </div>
        <?php
       
    }
   
?>
</ul>
</section>
<?php
 wp_reset_postdata();
} else {
    echo 'No posts found.';
}

?>

