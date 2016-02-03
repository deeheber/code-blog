(function(module){
  var homeController = {};

  homeController.index = function(){
    /*** Load Article Data from JSON??? ***/

    /*** Fix the view for the page ***/
    $('main > div').hide();
    $('#home').show();
    /*** If href = / then make that nav link .active ***/

  };

  module.homeController = homeController;
})(window);
