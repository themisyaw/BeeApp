
<?php


get_header();


if ( is_user_logged_in() ) {
    ?>
    <!-- beehives list -->
    
    
  
</div>
    
    <?php 
        get_template_part('theme-parts/beehivelistLoader','content');
    ?>
    <section class="container mb-5 pb-5 mt-2 beehivesListTab d-block">
    <div class="row px-2 justify-content-between d-flex align-items-center">
          <div class="align-items-center openSearchInput p- position-retive bglight shadow justify-content-center ml1 d-flex rounded closeSearch">
            <span class="dashicons rounded bglight mx-2 searchIcon  dashicons-search align-items-center d-flex   ">
              
            </span>
            <input type="number"  class="border-0 bg-transparent form-control p-0 searchInput" aria-label="" aria-describedby="">
            
          </div>
          <div class="align-items-center justify-content-center openAddNewBeehive bglight shadow rounded mr-1 col-5 py-2  d-flex">
            <span class="mr-2 text-dark">Add new</span>
            <span class="dashicons rounded d-flex bglight addNewIcon  align-items-center justify-content-center  dashicons-plus-alt2 ">
            </span>
          </div>
        </div>
        <ul class=" py-0 px-2 row row-cols-2 beehivesListUL ">
            
        
        </ul>
    </section>
    <!-- beehives edit page -->
    <section class="mb-5 pb-5 container beehiveEditSaveTab d-none">
    <div class="button btn deleteBeehiveBtn color-dark bg-light">Delete</div>
        <h3 class="text-start py-3"> Beehive </h3>
        
        <ul class="list-group p-0 beehiveUl px-2"> 
            
            
        </ul>
    </section>
    <!-- beehives for feed list -->
    <section class="my-5 pb-5 container beehiveForFeedTab d-none">
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