
<?php


get_header();


if ( is_user_logged_in() ) {
    ?>
   
</div>
    <?php 
        get_template_part('theme-parts/beehivelistLoader','content');
    ?>
    <section class="container mb-5 pb-5 mt-2 beehivesListTab d-block">
        <div class="row p-2 mt-3 justify-content-between d-flex align-items-center beehivesInnerHeader">
            <div class="align-items-center openSearchInput col-lg-1 position-retive bglight shadow justify-content-center  d-flex rounded closeSearch">
                <span class="dashicons rounded bglight mx-2 searchIcon  dashicons-search align-items-center d-flex   ">
                </span>
                <input type="number"  class="border-0 bg-transparent form-control p-0 searchInput" aria-label="" aria-describedby="">               
            </div>
            <div class="align-items-center justify-content-center openAddNewBeehive bglight shadow rounded mr-1 col-5 col-lg-2 py-2  d-flex">
                <span class="mr-2 text-dark">Add new</span>
                <span class="dashicons rounded d-flex bglight addNewIcon  align-items-center justify-content-center  dashicons-plus-alt2 ">
                </span>
            </div>
        </div>
        <ul class=" py-0 px-2 mt-3 row row-cols-2 row-cols-lg-4 beehivesListUL ">
        </ul>
    </section>
    <!-- beehives edit page -->
    <section class="mb-5 pb-5 mt-2 container col-lg-6 beehiveEditSaveTab d-none">
        <div class="row px-3 justify-content-end py-2 beehivesEditSaveInnerHeader">
            <div class="deleteBeehiveBtn align-items-center justify-content-center  errorbg shadow rounded px-3 py-2  d-flex">
                <span class="dashicons dashicons-trash m-0 text-light d-flex">
                </span>
            </div>
        </div>
        <ul class="list-group p-0 beehiveUl px-3"> 
        </ul>
    </section>
    <!-- beehives for feed/harvest list -->
    <section class="mb-5 pb-5 container beehiveForFeedTab d-none">
        <h4 class="text-start py-2 mt-3 d-flex justify-content-center align-items-center"> Beehives for <span class="d-flex mb-0 ml-2 bg-dark text-light rounded p-2 listTitleSpan"><h5 class="m-0"></h5></span> </h4>
        <div class="beehivesForFeed">
            <ul class=" py-0 px-2 mt-3 row row-cols-3  row-cols-lg-6 beehiveUlForFeed ">
            </ul>
        </div>
    </section>
    <?php
    get_template_part('theme-parts/bottom-menu','content');
    
}
get_footer();

?>