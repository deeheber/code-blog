var posts = [];

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

/***Sorts blog by newest projects first ***/
sourceData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

/*** Push new post to Posts array and write to the html ***/
sourceData.forEach(function(el){
  posts.push(new Post(el));
});

posts.forEach(function(content){
  $('#articles').append(content.toHtml());
});
