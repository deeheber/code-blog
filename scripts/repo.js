(function(module){
  var repos = {};

  repos.all = [];
  repos.noForkRepos = [];

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
        //console.log(data);
        repos.all = data;
      }
    }).done(function(){
      /*** Exclude forked repos from the list ***/
      repos.noForkRepos = repos.all.filter(function(item){
        if(item.fork == false){
          return item;
        }
      });
      //console.log(repos.noForkRepos);
      repos.loadAll(repos.noForkRepos);
      callback();
    });
  };
  module.repos = repos;
})(window);
