(function(module){
  var topNav = {};

  topNav.handleNav = function(){
    /*** Expose the nav when clicking the hamburger ***/
    $('#hamburger').on('click', function(){
      $('#main-nav').slideToggle('slow', function(){
        $('#hamburger').hide();
        $('#cross').show();
      });
    });

    /*** Hide nav when x is clicked on ***/
    $('#cross').on('click', function(){
      $('#main-nav').slideToggle('slow', function(){
        $('#cross').hide();
        $('#hamburger').show();
      });
    });

    /***Removes inline styles added by jQuery while mobile styles enabled. This is helpful if the screen is resized to a larger size***/
    $(window).resize(function(){
      if (window.matchMedia('(min-width: 770px)').matches) {
        //Desktop Style
        $('#main-nav').removeAttr('style');
        $('#hamburger').removeAttr('style');
        $('#cross').removeAttr('style');
      } 
    });
  };
  module.topNav = topNav;
})(window);
