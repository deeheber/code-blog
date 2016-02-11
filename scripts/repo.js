(function(module){
  var repos = {};

  repos.all = [];
  repos.noForkRepos = [];

  /*** Exclude forked repos from the list ***/
  repos.excludeForkedRepos = function(array){
    repos.noForkRepos = array.filter(function(item){
      if(item.fork == false){
        return item;
      }
    });
  };

  /*** Sorts repos by the last git push date ***/
  repos.loadAll = function(data){
    data.sort(function(a,b) {
      return (new Date(b.pushed_at)) - (new Date(a.pushed_at));
    });

  };

  repos.fetchAll = function(callback){
    $.ajax({
      url: '/github/users/deeheber/repos',
      type: 'GET',
      success: function(data, message, xhr){
        repos.all = data;
      }
    }).done(function(){
      repos.excludeForkedRepos(repos.all);
      repos.loadAll(repos.noForkRepos);
      callback();
    });
  };
  module.repos = repos;
})(window);
