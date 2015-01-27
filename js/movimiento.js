 // Begin jQuery
 
$(document).ready(function() {
 
/* =Reflection Nav
-------------------------------------------------------------------------- */	
 
    // Append span to each LI to add reflection
 
    $("#nav-reflection a").append("");	
 
    // Animate buttons, move reflection and fade
 
    $("#nav-reflection img").hover(function() {
        $(this).stop().animate({ marginTop: "-10px" }, 200);
        $(this).parent().find("span").stop().animate({ marginTop: "18px", opacity: 0.25 }, 200);
    },function(){
        $(this).stop().animate({ marginTop: "0px" }, 300);
        $(this).parent().find("span").stop().animate({ marginTop: "1px", opacity: 1 }, 300);
    });
 
/* =Shadow Nav
-------------------------------------------------------------------------- */
 
    // Append shadow image to each LI
 
   
 
// End jQuery
 
});