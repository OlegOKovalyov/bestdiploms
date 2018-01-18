/* Owl Carousel */
jQuery(document).ready(function(){
  jQuery('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:false,
    autoplay:true,
    autoplayHoverPause:true,
    autoplayTimeout:1800,
    smartSpeed:900,
    responsiveClass:true,
    navText:["<i class='fa fa-angle-left fa-2x'></i>","<i class='fa fa-angle-right fa-2x'></i>"],
    responsive:{
        0:{
            items:1,
            nav:true,
            loop: true
        },
        575:{
            items:2,
            nav:true,
            loop: true
        },
        768:{
            items:3,
            nav:true,
            loop: true
        },
        992:{
            items:3,
            nav:true,
            loop:true
        },
        1200:{
            items:4,
            nav:true,
            loop:true
        }
    }
  });

  jQuery("#carousel").owlCarousel({
    navigation:true,
    navigationText : ["&#xe079;","&#xe080;"],
  });


  }); /* Завершение начальной функции $(document).ready(function(); *** Не удалять! *** */