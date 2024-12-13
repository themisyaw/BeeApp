<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> -->
  
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script> -->

    <?php wp_head();
     
    ?>   
  </head>
  <body class=""<?php body_class(); ?>>
    <header class="site-header bgWheat" id="personalinfo">
      <div class="container pb-3">
      <h1 class="text-center">BeeAppLocal</h1>
        <div class="row px-2 justify-content-between d-flex align-items-center">
          <div class="align-items-center openSearchInput p- position-retive bglight shadow justify-content-center ml1 d-flex rounded closeSearch">
            <span class="dashicons rounded bglight mx-2 searchIcon  dashicons-search align-items-center d-flex   ">
              

            </span>
            <input type="number"  class="border-0 bg-transparent form-control p-0 searchInput" aria-label="" aria-describedby="">
            

          </div>

          <div class="align-items-center justify-content-end openAddNewBeehive bglight shadow rounded mr-1 col-5 py-2  d-flex">
            <span class="mr-3 text-dark">Add new</span>
            <span class="dashicons rounded d-flex bglight addNewIcon  align-items-center justify-content-center  dashicons-plus-alt2 ">
            

            </span>
            
          </div>
          
          

        </div>
        
      </div>
      
        <!-- <div class="messageDiv m-2">
          <button id="closeDivBtn" class="btn btn-danger btn-sm float-end">×</button>
          <span class="p-4">Message</span>
        </div> -->
        
       <?php 
        // get_template_part( 'theme-parts/bottom-menu-content', 'content' );
        ?>
    
    </header>
    
      <div class="align-items-center position-absolute top-0 justify-content-center mr-1 col newbeehiveForm">
          <div class="row rounded d-flex align-items-center justify-content-center">
            <div class="col-6 d-flex">
              <input tabindex="-1" type="number" class="newBeehiveNumberInput form-control w-50"/>
              <button class="btn btn-dark addNewBeeHive ">Save</button>
            </div>
            
            
          </div>
      </div>
    
   