(function(module){
  Post.all = [];
  Post.filteredCategories = [];

  function Post(option){
    this.title = option.title;
    this.publishedOn = option.publishedOn;
    this.category = option.category;
    this.body = option.body;
    this.projectURL = option.projectURL;
  }

  Post.prototype.toHtml = function() {
    var theTemplateScript  = $('#post-template').html();
    var theTemplate = Handlebars.compile(theTemplateScript);

    /*** Calculation for how long ago a post was created ***/
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.dateInfo = this.daysAgo + ' days ago';

    /*** Convert date format to MM/DD/YYYY ***/
    var toMmDdYy = function(input) {
      var ptrn = /(\d{4})\-(\d{2})\-(\d{2})/;
      if(!input || !input.match(ptrn)) {
        return null;
      }
      return input.replace(ptrn, '$2/$3/$1');
    };

    var context = {
      'category': this.category,
      'title': this.title,
      'publishedOn': this.publishedOn,
      'projectURL': this.projectURL,
      'body': this.body,
      'dateInfo': this.dateInfo,
      'formattedDate': toMmDdYy(this.publishedOn)
    };

    var theCompiledHml = theTemplate(context);

    return theCompiledHml;
  };

  Post.loadAll = function(sourceData){
    /***Sorts blog by newest projects first ***/
    sourceData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    /*** Add JSON data to the Post array and write to the html ***/
    Post.all = sourceData.map(function(el){
      return new Post(el);
    });
  };

  Post.filterCategory = function(selectedCategory){
    /*** Empty the Post.selection array ***/
    Post.filteredCategories.length = 0;
    /***  Filter the Post.all down to the selected category  ***/
    Post.filteredCategories = Post.all.filter(function(arrayItem){
      return arrayItem.category === selectedCategory;
    });
  };

  Post.fetchAll = function(callback){
    if(localStorage.sourceData){
      /*** Get eTag to see if the file on the server was changed ***/
      /*** This helps to make sure the data in local storage is up to date ***/
      $.ajax({
        method: 'HEAD',
        url: '/scripts/projectData.json',
        success: function(data, message, xhr){
          if (localStorage.eTag == xhr.getResponseHeader('ETag')) {
            console.log('loading from local storage');
            /***file wasn't modified so use cached version***/
            Post.loadAll(JSON.parse(localStorage.sourceData));
            callback();
          }
          else {
            console.log('eTag changed, loading from the server');
            /***the file on the server was modified or this is the first time loading the site...requesting the entire JSON file again***/
            $.ajax({
              method: 'GET',
              url: '/scripts/projectData.json',
              success: function(data2, message2, xhr2){
                localStorage.setItem('eTag', xhr.getResponseHeader('ETag'));
                localStorage.setItem('sourceData', JSON.stringify(data2));
                Post.loadAll(data2);
                callback();
              }
            });
          }
        }
      });
    } else {
      // not present in local storage so pull from server
      //localStorage.setItem('eTag', newETag);
      $.ajax({
        method: 'GET',
        url: '/scripts/projectData.json',
        success: function(data, message, xhr){
          console.log('not present in local storage');
          localStorage.setItem('eTag', xhr.getResponseHeader('ETag'));
          localStorage.setItem('sourceData', JSON.stringify(data));
          Post.loadAll(data);
          callback();
        },
        error: function(data, message, xhr){
          alert('Error loading data');
        }
      });
    }

  };

  module.Post = Post;
})(window);
