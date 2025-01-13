    <div class="row  bottomMenu  justify-content-center align-items-center fixed-bottom">

            <div class="basicMenu col col-lg-6">

            
    
                <div class="align-items-end mx-2   justify-content-between d-flex basicMenu">
                    <div class="openBeehivesListBtn bottomMenuitemText ">
                        <div class="d-block text-center  py-2 px-2 rounded">
                                    <?php echo get_svg_icon('beehiveBottom'); ?> 
                                    <div class="text-dark fs-13   px-3  rounded mt-1">Beehives (<span class="beehivesTotal"></span>)</div>
                        </div>
                    </div>
                    <div class="openBeehivesForFeedBtn bottomMenuitemText ">
                        <div class="d-block text-center  py-2 px-2  rounded">
                                <?php echo get_svg_icon('beehiveForFoodBottom'); ?>
                                <div class="text-dark fs-13   px-3  rounded mt-1">Feed (<span class="feedTotal"></span>)</div>
                        </div>
                    </div>
                    <div class="openBeehivesForHarvestBtn bottomMenuitemText ">
                        <div class="d-block text-center  py-2  px-2  rounded">
                                <?php echo get_svg_icon('beehiveForHarvestBottom'); ?>
                                <div class="text-dark fs-13 px-3  rounded mt-1">Harvest (<span class="harvestTotal"></span>)</div>
                        </div>
                    </div>

                </div>
            </div>
                
           

            <div class="col py-3 mx-3 col-lg-6 text-center forfeedmenu d-none">
                <div class="row">
                    <div class="col-6">
                        <button class="btn w-100 text-light errorbg  py-2 cancelsaveForFeed">Cancel</button>
                    </div>
                    <div class="col-6">
                        <button class="btn w-100  text-light bg-dark  py-2 saveForFeed ">Save</button>
                    </div>
                </div>
            </div>

            <div class="col py-3 mx-3 col-lg-6 text-center beehiveEditMenu d-none">
                <div class="row">
                    <div class="col-6 ">
                        <button class="btn w-100  text-light py-2 errorbg  cancelsave">Cancel</button>
                    </div>
                    <div class="col-6">
                        <button class="btn w-100 text-light bg-dark py-2 save ">Save</button>
                    </div>
                </div>

                
            </div>
            
    </div>
    

    