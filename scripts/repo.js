(function(module){
  var repos = {};

  repos.all = [];

  repos.fetchAll = function(callback){
    $.ajax({
      url: 'https://api.github.com/users/deeheber/repos',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr){
        //console.log(data);
        repos.all = data;
      }
    }).done(callback);
  };
  module.repos = repos;
})(window);
