(function(module){
  var notFoundController = {};

  notFoundController.index = function(){
    $('main > div').hide();
    $('#notFound').show();
    /*** Remove active link from top nav ***/
    $('a').removeClass('active');
  };

  module.notFoundController = notFoundController;
})(window);
