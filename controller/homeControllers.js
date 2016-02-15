(function(module){
  var homeController = {};

  topNav.handleNav();

  homeController.index = function(ctx, next){
    /*** Load Article Data into HTML ***/
    projectView.index(ctx.posts, ctx.params.categoryName);
    next();
  };

  homeController.show = function(ctx, next){
    /*** view for the tabs and nav ***/
    $('main > div').hide();
    $('#home').show();
    /*** If href in the nav = / then make that nav link .active ***/
    $('a').removeClass('active');
    $('li > a[href$="/"]').addClass('active');
  };

  homeController.loadAll = function(ctx, next){
    var postData = function() {
      ctx.posts = Post.all;
      next();
    };

    if (Post.all.length) {
      ctx.posts = Post.all;
      next();
    } else {
      Post.fetchAll(postData);
    }
  };

  homeController.loadByCategory = function(ctx, next){
    var selectedCategory = ctx.params.categoryName;
    var categoryData = function(){
      Post.filterCategory(selectedCategory);
      ctx.posts = Post.filteredCategories;
      next();
    };
    /*** Checks Posts are already loaded ***/
    if (Post.all.length){
      categoryData();
    }
    else {
      Post.fetchAll(categoryData);
    }
  };

  module.homeController = homeController;
})(window);
