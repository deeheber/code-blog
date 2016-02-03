(function(module){
  var statsController = {};

  statsController.index = function(){
    /***Will run if the user navigates directly to the /stats page***/

    /*** Show/hide the correct sections ***/
    $('main > div').hide();
    $('#stats').show();
    /*** If href = /stats then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/stats"]').addClass('active');
  };

  module.statsController = statsController;
})(window);
