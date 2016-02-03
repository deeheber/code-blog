(function(module){
  var statsController = {};

  statsController.index = function(){
    $('main > div').hide();
    $('#stats').show();
    /*** If href = /stats then make that nav link .active ***/
    
  };

  module.statsController = statsController;
})(window);
