
<?php


get_header();


if ( is_user_logged_in() ) {
    ?>
    <!-- beehives list -->
    
    
  
</div>
    
    <?php 
        get_template_part('theme-parts/beehivelistLoader','content');
    ?>
    <section class="container my-5 beehivesListTab d-block">
        <ul class=" py-0 px-2 row row-cols-2 beehivesListUL ">
            
        
        </ul>
    </section>
    <!-- beehives edit page -->
    <section class="my-5 container beehiveEditSaveTab d-none">
    
        <h3 class="text-start py-3"> Beehive </h3>
        
        <ul class="list-group p-0 beehiveUl"> 
            
            
        </ul>
    </section>
    <!-- beehives for feed list -->
    <section class="my-5 container beehiveForFeedTab d-none">
        <h3 class="text-start py-3"> Beehives For Feed </h3>

        <div class="beehivesForFeed bgWheat shadow">
            <ul class=" py-0 px-2 row row-cols-3 beehiveUlForFeed ">

            </u>
        </div>
        <div class="beehivesFed ">
            <ul class="list-group p-0 beehiveUlFed"> 
            
            </ul>
        </div>
    </section>
    <?php
    get_template_part('theme-parts/bottom-menu','content');
    
}
get_footer();

?>