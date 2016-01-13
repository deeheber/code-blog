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

  var context = {
    'category': this.category,
    'title': this.title,
    'publishedOn': this.publishedOn,
    'projectURL': this.projectURL,
    'body': this.body
  };

  var theCompiledHml = theTemplate(context);
  return theCompiledHml;

  /***Adding category attribute to each post for filtering***/
  //$newPost.attr('data-category', this.category);

  /***Pulling post data into template***/
  //$newPost.find('h2').text(this.title);
  //$newPost.find('.date').append(' on ' + this.publishedOn);
  //$newPost.find('.post_body').html(this.body);
  //$newPost.find('.external_link a').attr('href', this.projectURL);

  //$newPost.removeAttr('class', 'template');

  //$newPost.find('time').html('Finished ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

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
