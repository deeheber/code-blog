(function(module){
  var homeController = {};

  topNav.handleNav();

  homeController.index = function(ctx, next){
    /*** Load Article Data into HTML ***/
    projectView.index(ctx.posts);
    next();
  };

  homeController.show = function(ctx, next){
    /*** view for the tabs and nav ***/
    $('main > div').hide();
    $('#home').show();
    /*** If href in the nav = / then make that nav link .active ***/
    $('a').removeClass('active');
    $('li > a[href$="/"]').addClass('active');
    /*** Change color for active sidebar link ***/
    $('.sidebarLink').removeClass('active-sidebar');
    $('.sidebarLink').each(function(){
      if($(this).data('category') == ctx.params.categoryName){
        $(this).addClass('active-sidebar');
      }
    });
    if(typeof ctx.params.categoryName === 'undefined'){
      $('li > a[href$="/category"]').addClass('active-sidebar');
    }
    /*** Change select menu option ***/
    console.log(ctx.params.categoryName);
    $('#category-filter > option').each(function(){
      if($(this).val() === ctx.params.categoryName){
        this.selected = true;
      }
    });
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
