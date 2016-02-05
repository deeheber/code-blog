(function(module){

  var gitHubController = {};

  gitHubController.index = function(){
    $('main > div').hide();
    $('#github').show();
    /*** If href = /about then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/github"]').addClass('active');
  };

  module.gitHubController = gitHubController;

})(window);
