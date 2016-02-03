(function(module){
  var statsController = {};

  /*** Loads Data into the HTML for the stats page content ***/
  /*** add projectView.initStats(); here ?***/


  statsController.index = function(){
    /*** Show/hide the correct sections ***/
    $('main > div').hide();
    $('#stats').show();
    /*** If href = /stats then make that nav link .active ***/
    $('a').removeClass('active');
    $('a[href$="/stats"]').addClass('active');
  };

  module.statsController = statsController;
})(window);
