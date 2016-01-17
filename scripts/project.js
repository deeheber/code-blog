

function Post(option){
  this.title = option.title;
  this.publishedOn = option.publishedOn;
  this.category = option.category;
  this.body = option.body;
  this.projectURL = option.projectURL;
}

Post.all = [];

Post.prototype.toHtml = function() {
  var theTemplateScript  = $('#post-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);

  /*** Calculation for how long ago a post was created ***/
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.dateInfo = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var context = {
    'category': this.category,
    'title': this.title,
    'publishedOn': this.publishedOn,
    'projectURL': this.projectURL,
    'body': this.body,
    'dateInfo': this.dateInfo
  };

  var theCompiledHml = theTemplate(context);

  return theCompiledHml;
};

Post.loadAll = function(sourceData){
  /***Sorts blog by newest projects first ***/
  sourceData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  /*** Push new post to Posts array and write to the html ***/
  sourceData.forEach(function(el){
    Post.all.push(new Post(el));
  });
};


Post.fetchAll = function(){
  /*** Check if the data is in local storage ***/
  if(localStorage.sourceData){
    Post.loadAll(JSON.parse(localStorage.sourceData));
    projectView.initHomePage();
  }
  else {
  /*** Pulls JSON data from the server via an AJAX call if not in local storage ***/
    $.ajax('/scripts/projectData.json').done(function(returnedObj){
      console.log(returnedObj);
      localStorage.setItem('sourceData', JSON.stringify(returnedObj));
      Post.loadAll(returnedObj);
      projectView.initHomePage();
    });
  }
};
