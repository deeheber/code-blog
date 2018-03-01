(function(module){
  var repos = {};

  repos.all = [];

  /*** Sorts repos by the last git push date ***/
  repos.loadAll = function(data){
    data.sort(function(a,b) {
      return (new Date(b.pushed_at)) - (new Date(a.pushed_at));
    });

  };

  repos.fetchAll = function(callback){
    $.ajax({
      url: '/github/users/deeheber/repos?per_page=100',
      type: 'GET',
      success: function(data, message, xhr){
        repos.all = data;
        /*** Filter out repositories that are forks of someone else's***/
        var excludeForkRepos = repos.all.filter(function(repository){
          return repository.fork === false;
        });
        /*** Sort by most recent push to the repo ***/
        excludeForkRepos.sort(function(a,b) {
          return (new Date(b.pushed_at)) - (new Date(a.pushed_at));
        });
        callback(excludeForkRepos);
      },
      fail: function(xhr, status, errorThrown){
        alert('Sorry, the server is unavailable. Please try again later.');
        callback();
      }
    });
  };
  module.repos = repos;
})(window);
