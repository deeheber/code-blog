var topNav = {};

topNav.handleNav = function(){
  $('#cross').hide();

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
};

$(document).ready(function() {
  topNav.handleNav();
});
