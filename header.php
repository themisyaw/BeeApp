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
    <script src="https://cdn.jsdelivr.net/npm/lodash/lodash.min.js"></script>
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script> -->

    <?php wp_head();
     
    ?>   
  </head>
  <body class=""<?php body_class(); ?>>
    <header class="site-header bgWheat position-relative" id="personalinfo">
      <div class="container py-3">
        <h1 class="text-center m-0 pt-2">BeeMan</h1>
        
        
        
      </div>
      
        <!-- <div class="messageDiv m-2">
          <button id="closeDivBtn" class="btn btn-danger btn-sm float-end">×</button>
          <span class="p-4">Message</span>
        </div> -->
        
       <?php 
        // get_template_part( 'theme-parts/bottom-menu-content', 'content' );
        ?>
         
         <div class="align-items-center position-absolute d-flex py-4  bgWheat h-100 top-0 justify-content-center pb-2 col newbeehiveForm">

         <div class="btn btn-alarm position-absolute border-0 text-dark closeCreateNewForm rounded bglight d-flex align-items-center shadow mx-1">
                <div class="dashicons dashicons-no"></div>
              </div>
          <div class="row rounded d-flex align-items-center justify-content-center">
            <div class="col-10 d-flex">
              <input tabindex="-1" type="number" placeholder="beehive number" class="mx-2 bglight border-0 shadow newBeehiveNumberInput form-control "/>
              <button class="btn btn-dark addNewBeeHive border-0 text-light  rounded  mx-2">Add</button>
              
            </div>
            
            
          </div>
      </div>
    
    </header>
    
     
    
   