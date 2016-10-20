(function(module){
  var topNav = {};

  topNav.handleNav = function(){
    /*** Show nav when show button is clicked ***/
    $('#showMenu').on('click', function(){
      $('#main-nav').slideToggle('slow', function(){
        $('#showMenu').hide();
        $('#hideMenu').show();
      });
    });

    /*** Hide nav when hide button is clicked ***/
    $('#hideMenu').on('click', function(){
      $('#main-nav').slideToggle('slow', function(){
        $('#hideMenu').hide();
        $('#showMenu').show();
      });
    });

    /*** Close the nav when clicking a link --- in progress ***/
    // if (window.matchMedia('(max-width: 770px)').matches){
    //   $('#main-nav a').on('click', function(){
    //     if($('#showMenu').is(':hidden')) {
    //       $('#main-nav').slideToggle('slow', function(){
    //         $('#hideMenu').hide();
    //         $('#showMenu').show();
    //       });
    //     }
    //   });
    // }

    /***Removes inline styles added by jQuery while mobile styles enabled. This is helpful if the screen is resized to a larger size***/
    $(window).resize(function(){
      if (window.matchMedia('(min-width: 770px)').matches) {
        //Desktop Style
        $('#main-nav').removeAttr('style');
        $('#showMenu').removeAttr('style');
        $('#hideMenu').removeAttr('style');
      } 
    });
  };
  module.topNav = topNav;
})(window);
