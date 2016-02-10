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
      url: '/github/users/deeheber/repos',
      type: 'GET',
      success: function(data, message, xhr){
        //console.log(data);
        repos.all = data;
      }
    }).done(function(){
      repos.loadAll(repos.all);
      callback();
    });
  };
  module.repos = repos;
})(window);
