var posts = [];

function Post(option){
  this.title = option.title;
  this.publishedOn = option.publishedOn;
  this.body = option.body;
  this.projectURL = option.projectURL;
}

Post.prototype.toHtml = function() {
  var $newPost = $('article.template').clone();

  /***Pulling post data into template***/
  $newPost.find('h2').text(this.title);
  $newPost.find('.date').append(this.publishedOn);
  $newPost.find('.post_body').html(this.body);
  $newPost.find('a').attr('href', this.projectURL);

  $newPost.removeAttr('class', 'template');

  //$newPost.append('<hr>');
  $newPost.css('borderBottomStyle', 'solid');
  $newPost.css('borderBottomWidth', '1px');

  return $newPost;
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

$('article:last').css('border', 'none');
