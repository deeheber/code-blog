(function(module){
  var homeController = {};

  topNav.handleNav();

  homeController.index = function(){
    /*** Load Article Data into HTML ***/
    Post.fetchAll(projectView.initHomePage);
    /*** view for the page ***/
    $('main > div').hide();
    $('#home').show();
    /*** If href = / then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/"]').addClass('active');
  };

  homeController.loadByCategory = function(ctx, next){

    //next();
  };

  module.homeController = homeController;
})(window);
