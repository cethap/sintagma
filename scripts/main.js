(function($){
  $(function(){

      $('.sf-menu').mobileMenu({defaultText: "Navegar a..."});
      // main navigation init
      $('ul.sf-menu').superfish({
        delay: 300, // the delay in milliseconds that the mouse can remain outside a sub-menu without it closing
        animation: {
          opacity: "show",
          height: "show"
        }, // used to animate the sub-menu open
        speed: "normal", // animation speed
        autoArrows: false, // generation of arrow mark-up (for submenu)
        disableHI: true // to disable hoverIntent detection
      });

      //Zoom fix
      //IPad/IPhone
      var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,
        gestureStart = function () {
          viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },
        scaleFix = function () {
          if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
            viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
            document.addEventListener("gesturestart", gestureStart, false);
          }
        };
      scaleFix();


      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel",
        start: function(slider){
          if(homePage){
            $(".flex-viewport").css("max-height",$(window).height()-310);
          }
        }
      });



      $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#slider',
        start: function(slider){
          //$('body').removeClass('loading');
          if(homePage){
            $(".flex-viewport").css("max-height",$(window).height()-310);
          }
        }
      });


      $('#GallerySlide').flexslider({
        animation: "slide"
      });


      $(window).resize(function(){
          if(homePage){
            $(".flex-viewport").css("max-height",$(window).height()-310);
          }
      });

  });
})(jQuery);



