(function(module){
  var aboutController = {};

  aboutController.index = function(){
    $('main > div').hide();
    $('#about').show();
    /*** If href = /about then make that nav link .active ***/
    
  };

  module.aboutController = aboutController;
})(window);
