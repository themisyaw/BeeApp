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
    <header class="site-header" id="personalinfo">
      <div class="container">
        <h1 class="text-center p-4">BeeAppLocal</h1>
       
      </div>
      <div class="container ">
        <span class="dashicons rounded-circle m-4 p-2 align-items-center justify-content-center d-flex dashicons-plus-alt2 openAddNewBeehive"></span>
        <div class=" newbeehiveForm messageDiv">
          
          <input type="number" class="newBeehiveNumberInput "/>
          <button class="btn btn-dark addNewBeeHive ">AddNew</button>

        </div>
        <div class="container">
          <button id="openDivBtn" class="btn btn-primary mt-5">Open Sliding Div</button>
        </div>

        <div class="messageDiv m-2">
          <button id="closeDivBtn" class="btn btn-danger btn-sm float-end">×</button>
          <span class="p-4">Message</span>
        </div>
        
      </div>
       
       <?php 
        // get_template_part( 'theme-parts/bottom-menu-content', 'content' );
        ?>
    </div>
    
         
       
      

      
   
    </header>
   
  


