var posts = [];

function Post(option){
  this.title = option.title;
  this.publishedOn = option.publishedOn;
  this.body = option.body;
  this.projectURL = option.projectURL;
}

Post.prototype.toHtml = function() {
  var $newPost = $('article.template').clone();

  $newPost.find('h2').text(this.title);

  $newPost.removeClass('template');

  $newPost.append('<hr>');

  return $newPost;
};

/*** Push new post to Posts array and write to the html ***/
sourceData.forEach(function(el){
  posts.push(new Post(el));
});

// posts.forEach(function(content){
//   $('#articles').append(content.toHtml());
// });

/* Sorting function here */
