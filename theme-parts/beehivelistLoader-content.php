<?php

?>
<section class="container mb-5 pb-5 animatedSectionSearchInput d-none ">
    <div class="row p-2 mt-3 justify-content-between d-flex align-items-center beehivesInnerHeader">
        <div class="align-items-center opeSearchInputSpinner col-lg-1 position-retive bglight shadow justify-content-center d-flex rounded closeSearchSpinner">
            <span class="dashicons rounded bglight mx-2   dashicons-search align-items-center d-flex   ">
            </span>
            <input type="number"  class="border-0 bg-transparent form-control p-0 searchInputSpinner" aria-label="" aria-describedby="">
        </div>
        <div class="align-items-center justify-content-center  bglight shadow rounded mr-1 col-5 col-lg-2 py-2  d-flex">
            <span class="mr-2 text-dark">Add new</span>
            <span class="dashicons rounded d-flex bglight   align-items-center justify-content-center  dashicons-plus-alt2 ">
            </span>
        </div>
    </div>
    <ul class="  py-0 px-2 mt-3 row row-cols-2 row-cols-lg-4  loaderUl ">
        <div class="">
            <div class="my-2 px-1 d-flex justify-content-end ">
                <div class="">
                <?php echo get_svg_icon('beehiveForHarvest'); ?>
                </div>
                <div class="">
                <?php echo get_svg_icon('beehiveForFood'); ?>
                </div>
            </div>
            <div data-id=""  class="animated-element animate  d-block mb-3 row p-0 shadow bgWheat align-items-end justify-content-center rounded text-start  mx-2 ">
                <div class="py-1 d-flex justify-content-between position-relative">
                    <div class="p-0">
                        <span class=" text-dark beehiveNumberSpan position-absolute bglight rounded px-3 py-2 text-center fw-700 ">&nbsp;&nbsp;</span>
                    </div>
                    <div class="mr-2 d-flex align-items-center ">
                        <span class="bgRatingStars d-flex rounded-pill starsRating py-1 my-1 px-2 ">
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                        </span> 
                    </div>
                </div>
                <div class="px-1 py-3">
                    <div class="text-center"><?php echo get_svg_icon('beehive'); ?></div>
                    <div class="d-flex justify-content-between mx-2 pt-3  border-bottom border-light ">
                        <div class="  d-flex mb-1  align-items-end">
                        
                            <h6 class="roboto-regular m-0 fs-13">Frames</h6>
                        </div>
                        <div class="mb-1   p-0 text-center ">
                            <h6 class="roboto-light m-0 fs-13"><span class="animated-element animate fs-16 bg-light rounded-pill px-3 roboto-regular color-warning">&nbsp;&nbsp;&nbsp;</span> / 20</h6>
                        </div>
                    </div>
                    
                </div>
            
            </div>

        </div>
    </ul>
</section>
<section class="container mb-5 pb-5 animatedSection ">
    <div class="row p-2 mt-3 justify-content-between d-flex align-items-center beehivesInnerHeader">
            <div class="align-items-center opeSearchInputSpinner  position-retive col-lg-1 bglight shadow justify-content-center ml1 d-flex rounded closeSearchSpinner">
                <span class="dashicons rounded bglight mx-2   dashicons-search align-items-center d-flex   ">
                </span>
                <input type="number"  class="border-0 bg-transparent form-control p-0 searchInputSpinner" aria-label="" aria-describedby="">                
            </div>
            <div class="align-items-center justify-content-center  bglight shadow rounded mr-1 col-5 col-lg-2 py-2  d-flex">
                <span class="mr-2 text-dark">Add new</span>
                <span class="dashicons rounded d-flex bglight   align-items-center justify-content-center  dashicons-plus-alt2 ">
                </span>
            </div>
    </div>
    <ul class="  py-0 px-2 mt-3 row row-cols-2 row-cols-lg-4  loaderUl ">
        <div class="">
            <div class="my-2 px-1 d-flex justify-content-end ">
                <div class="">
                <?php echo get_svg_icon('beehiveForHarvest'); ?>
                </div>
                <div class="">
                <?php echo get_svg_icon('beehiveForFood'); ?>
                </div>
            </div>
            <div data-id=""  class="animated-element animate  d-block mb-3 row p-0 shadow bgWheat align-items-end justify-content-center rounded text-start  mx-2 ">
                <div class="py-1 d-flex justify-content-between position-relative">
                    <div class="p-0">
                        <span class=" text-dark beehiveNumberSpan position-absolute bglight rounded px-3 py-2 text-center fw-700 ">&nbsp;...&nbsp;</span>
                    </div>
                    <div class="mr-2 d-flex align-items-center ">
                        <span class="bgRatingStars d-flex rounded-pill starsRating py-1 my-1 px-2 ">
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                        </span> 
                    </div>
                </div>
                <div class="px-1 py-3">
                    <div class="text-center"><?php echo get_svg_icon('beehive'); ?></div>
                    <div class="d-flex justify-content-between mx-2 pt-3  border-bottom border-light ">
                        <div class="  d-flex mb-1  align-items-end">
                            <h6 class="roboto-regular m-0 fs-13">Frames</h6>
                        </div>
                        <div class="mb-1   p-0 text-center ">
                            <h6 class="roboto-light m-0 fs-13"><span class="animated-element animate fs-16 bg-light rounded-pill px-3 roboto-regular color-warning">&nbsp;&nbsp;&nbsp;</span> / 20</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
                <div class="my-2 px-1 d-flex justify-content-end ">
                    <div class="">
                    <?php echo get_svg_icon('beehiveForHarvest'); ?>
                    </div>
                    <div class="">
                    <?php echo get_svg_icon('beehiveForFood'); ?>
                    </div>
                </div>
                <div data-id=""  class="animated-element animate  d-block mb-3 row p-0 shadow bgWheat align-items-end justify-content-center rounded text-start  mx-2 ">
                    <div class="py-1 d-flex justify-content-between position-relative">
                        <div class="p-0">
                            <span class=" text-dark beehiveNumberSpan position-absolute  bglight rounded px-3 py-2 text-center fw-700 ">&nbsp;...&nbsp;</span>
                        </div>
                        <div class="mr-2 d-flex align-items-center ">
                            <span class="bgRatingStars d-flex rounded-pill starsRating py-1 my-1 px-2 ">
                                <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                                <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                                <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                                <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                                <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            </span> 
                        </div>
                    </div>
                    <div class="px-1 py-3">
                        <div class="text-center"><?php echo get_svg_icon('beehive'); ?></div>
                        <div class="d-flex justify-content-between mx-2 pt-3  border-bottom border-light ">
                            <div class="  d-flex mb-1  align-items-end">
                            
                                <h6 class="roboto-regular m-0 fs-13">Frames</h6>
                            </div>
                            <div class="mb-1   p-0 text-center ">
                                <h6 class="roboto-light m-0 fs-13"><span class="animated-element animate fs-16 bg-light rounded-pill px-3 roboto-regular color-warning">&nbsp;&nbsp;&nbsp;</span> / 20</h6>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="">
            <div class="my-2 px-1 d-flex justify-content-end ">
                <div class="">
                <?php echo get_svg_icon('beehiveForHarvest'); ?>
                </div>
                <div class="">
                <?php echo get_svg_icon('beehiveForFood'); ?>
                </div>
            </div>
            <div data-id=""  class="animated-element animate  d-block mb-3 row p-0 shadow bgWheat align-items-end justify-content-center rounded text-start  mx-2 ">
                <div class="py-1 d-flex justify-content-between position-relative">
                    <div class="p-0">
                        <span class=" text-dark beehiveNumberSpan position-absolute bglight rounded px-3 py-2 text-center fw-700 ">&nbsp;...&nbsp;</span>
                    </div>
                    <div class="mr-2 d-flex align-items-center ">
                        <span class="bgRatingStars d-flex rounded-pill starsRating py-1 my-1 px-2 ">
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                        </span> 
                    </div>
                </div>
                <div class="px-1 py-3">
                    <div class="text-center"><?php echo get_svg_icon('beehive'); ?></div>
                    <div class="d-flex justify-content-between mx-2 pt-3  border-bottom border-light ">
                        <div class="  d-flex mb-1  align-items-end">
                        
                            <h6 class="roboto-regular m-0 fs-13">Frames</h6>
                        </div>
                        <div class="mb-1   p-0 text-center ">
                            <h6 class="roboto-light m-0 fs-13"><span class="animated-element animate fs-16 bg-light rounded-pill px-3 roboto-regular color-warning">&nbsp;&nbsp;&nbsp;</span> / 20</h6>
                        </div>
                    </div>
                    
                </div>
            
            </div>

        </div>
        <div class="">
            <div class="my-2 px-1 d-flex justify-content-end ">
                <div class="">
                <?php echo get_svg_icon('beehiveForHarvest'); ?>
                </div>
                <div class="">
                <?php echo get_svg_icon('beehiveForFood'); ?>
                </div>
            </div>
            <div data-id=""  class="animated-element animate  d-block mb-3 row p-0 shadow bgWheat align-items-end justify-content-center rounded text-start  mx-2 ">
                <div class="py-1 d-flex justify-content-between position-relative">
                    <div class="p-0">
                        <span class=" text-dark beehiveNumberSpan position-absolute bglight rounded px-3 py-2 text-center fw-700 ">&nbsp;...&nbsp;</span>
                    </div>
                    <div class="mr-2 d-flex align-items-center ">
                        <span class="bgRatingStars d-flex rounded-pill starsRating py-1 my-1 px-2 ">
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                            <span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>
                        </span> 
                    </div>
                </div>
                <div class="px-1 py-3">
                    <div class="text-center"><?php echo get_svg_icon('beehive'); ?></div>
                    <div class="d-flex justify-content-between mx-2 pt-3  border-bottom border-light ">
                        <div class="  d-flex mb-1  align-items-end">
                        
                            <h6 class="roboto-regular m-0 fs-13">Frames</h6>
                        </div>
                        <div class="mb-1   p-0 text-center ">
                            <h6 class="roboto-light m-0 fs-13"><span class="animated-element animate fs-16 bg-light rounded-pill px-3 roboto-regular color-warning">&nbsp;&nbsp;&nbsp;</span> / 20</h6>
                        </div>
                    </div>
                    
                </div>
            
            </div>

        </div>
    </ul>
</section>
<section class="mb-5 pb-5 container animatedSectionForFeed d-none">
    <h4 class="text-start py-2 mt-3 d-flex justify-content-center align-items-center"> Beehives for <span class="d-flex mb-0 ml-2 bg-dark text-light rounded p-2 "><h5 class="m-0">.......</h5></span> </h4>

    <div class="">
        <ul class=" py-0 px-2 mt-3 row row-cols-3 row-cols-lg-6 ">
            <div class="beehiveForFeed position-relative">
                <div class="d-flex justify-content-center  align-items-center rounded shadow  p-4 bgWheat mx-2 my-3 animated-element animate">
                    <h5 class="rounded  text-center bglight  beehiveFeedLabelLoader  px-3 py-1 w-50  position-absolute shadow">&nbsp;...&nbsp;</h5>
                        <?php echo get_svg_icon('beehiveForFeed'); ?>
                </div>
            </div>
            <div class="beehiveForFeed position-relative">
                <div class="d-flex justify-content-center  align-items-center rounded shadow  p-4 bgWheat mx-2 my-3 animated-element animate">
                    <h5 class="rounded  text-center bglight  beehiveFeedLabelLoader  px-3 py-1 w-50  position-absolute shadow">&nbsp;...&nbsp;</h5>
                        <?php echo get_svg_icon('beehiveForFeed'); ?>
                </div>
            </div>
            <div class="beehiveForFeed position-relative">
                <div class="d-flex justify-content-center  align-items-center rounded shadow  p-4 bgWheat mx-2 my-3 animated-element animate">
                    <h5 class="rounded  text-center bglight  beehiveFeedLabelLoader  px-3 py-1 w-50  position-absolute shadow">&nbsp;...&nbsp;</h5>
                        <?php echo get_svg_icon('beehiveForFeed'); ?>
                </div>
            </div>
            <div class="beehiveForFeed position-relative">
                <div class="d-flex justify-content-center  align-items-center rounded shadow  p-4 bgWheat mx-2 my-3 animated-element animate">
                    <h5 class="rounded  text-center bglight  beehiveFeedLabelLoader  px-3 py-1 w-50  position-absolute shadow">&nbsp;...&nbsp;</h5>
                        <?php echo get_svg_icon('beehiveForFeed'); ?>
                </div>
            </div>
            <div class="beehiveForFeed position-relative">
                <div class="d-flex justify-content-center  align-items-center rounded shadow  p-4 bgWheat mx-2 my-3 animated-element animate">
                    <h5 class="rounded  text-center bglight  beehiveFeedLabelLoader  px-3 py-1 w-50  position-absolute shadow">&nbsp;...&nbsp;</h5>
                        <?php echo get_svg_icon('beehiveForFeed'); ?>
                </div>
            </div>
            <div class="beehiveForFeed position-relative">
                <div class="d-flex justify-content-center  align-items-center rounded shadow  p-4 bgWheat mx-2 my-3 animated-element animate">
                    <h5 class="rounded  text-center bglight  beehiveFeedLabelLoader px-3 py-1 w-50  position-absolute shadow">&nbsp;...&nbsp;</h5>
                        <?php echo get_svg_icon('beehiveForFeed'); ?>
                </div>
            </div>

        </ul>
    </div>
    
</section>
    