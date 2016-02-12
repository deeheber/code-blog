(function(module){
  var homeController = {};

  topNav.handleNav();

  homeController.index = function(){
    // /*** Load Article Data into HTML ***/
    // Post.fetchAll(projectView.initHomePage);
    // /*** view for the page ***/
    // $('main > div').hide();
    // $('#home').show();
    // /*** If href = / then make that nav link .active ***/
    // $('a').removeClass('active');
    // $('a[href$="/"]').addClass('active');
    console.log('index loaded');
  };

  homeController.loadAll = function(ctx, next){
    console.log('load all works');
    next();
  };

  homeController.loadByCategory = function(ctx, next){
    console.log('load by category works');
    next();
  };

  module.homeController = homeController;
})(window);
