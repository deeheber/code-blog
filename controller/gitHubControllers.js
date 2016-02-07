(function(module){
  var gitHubController = {};

  gitHubController.index = function(){
    /*** Call to GitHub's API to load and print out info ***/
    repos.fetchAll(repoView.index);
    /*** View for the page ***/
    $('main > div').hide();
    $('#github').show();
    /*** If href = /about then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/github"]').addClass('active');
  };
  module.gitHubController = gitHubController;
})(window);
