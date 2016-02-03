(function(module){
  var homeController = {};

  /*** Load Article Data into HTML ***/
  Post.fetchAll(projectView.initHomePage);
  topNav.handleNav();
  
  homeController.index = function(){
    /*** view for the page ***/
    $('main > div').hide();
    $('#home').show();
    /*** If href = / then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/"]').addClass('active');
  };

  module.homeController = homeController;
})(window);
