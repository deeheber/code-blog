(function(module){
  var aboutController = {};

  aboutController.index = function(){
    $('main > div').hide();
    $('#about').show();
    /*** If href = /about then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/about"]').addClass('active');
  };

  module.aboutController = aboutController;
})(window);
