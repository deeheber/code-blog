(function(module){
  var repoView = {};

  var content = function(repo){
    return '<li><a href="'+repo.html_url+'" target="_blank">'+repo.name+'</a></li>';
  };

  repoView.index = function(){
    /***  Clear out the list ***/
    $('#repoList').empty();

    /*** Write repos to the list ***/
    $('#repoList').append(
      repos.noForkRepos.map(content)
    );
  };
  module.repoView = repoView;
})(window);
