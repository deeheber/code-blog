var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  app = express();

var proxyGitHub = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  console.log('GITHUBTOKEN IS '+ process.env.GITHUB_TOKEN);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: { 'Authorization': 'token ' + process.env.GITHUB_TOKEN },
  }))(request, response);
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('ready to go on port ' + port + '!');
});
