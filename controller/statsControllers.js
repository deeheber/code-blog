(function(module){
  var statsController = {};

  statsController.index = function(){
    $('main > div').hide();
    $('#stats').show();
    /*** If href = /stats then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/stats"]').addClass('active');
  };

  module.statsController = statsController;
})(window);
