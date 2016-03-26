# Danielle's Development Portfolio

My blog, where I explore, discover, and chronicle my adventures in learning through coding projects.

[Live Site Here](http://www.deeheber.com)

##Directions to edit and run locally
1. Download the .zip file
2. Generate a [GitHib API token](https://github.com/settings/tokens/new)
3. Under /scripts create a blank file called token.js
4. Within token.js add the following
`var gitHubToken = '[enter your generated github token string here] '; `
as a note: never publish your GitHub API token anywhere accessibile to the public
5. Before the closing `<body>` tag in the *index.html* file add the following code `<script type="text/javascript" src="/scripts/token.js"></script>`
6. Run the files over http using a local server on your computer. [Live server](https://www.npmjs.com/package/live-server) or [node.js](https://nodejs.org/en/) are decent options if you aren't sure how to do this.

[![Stories in Ready](https://badge.waffle.io/deeheber/code-blog.png?label=ready&title=Ready)](http://waffle.io/deeheber/code-blog)
