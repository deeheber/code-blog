(function(module){
  var homeController = {};

  topNav.handleNav();

  homeController.init = function(ctx, next){
    /*** Prevents ugly loading screen before posts are loaded from async AJAX call ***/
    $('main > div').hide();
    next();
  },

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
    var selectedCategory = ctx.params.categoryName.toLowerCase();
    var categoryData = function(){
      Post.filterCategory(selectedCategory);
      ctx.posts = Post.filteredCategories;
      /*** Checks if category exists in the posts  ***/
      var categoryExists = false;
      var allCategories = Post.all.map(function(item){
        return item.category;
      });
      for(var index=0; index<allCategories.length; index++){
        if(allCategories[index] == selectedCategory){
          categoryExists = true;
          break;
        }
      }
      if(categoryExists == true){
        next();
      }
      else {
        notFoundController.index();
      }

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
