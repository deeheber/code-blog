(function(module){
  var repoView = {};

  var content = function(repo){
    return '<li><a href="'+repo.html_url+'" target="_blank">'+repo.name+' <span class="lnr lnr-link"></span></a></li>';
  };

  repoView.index = function(repositories){
    /***  Clear out the list ***/
    $('#repoList').empty();

    /*** Write repos to the list ***/
    $('#repoList').append(
      repositories.map(content)
    );
  };
  module.repoView = repoView;
})(window);
