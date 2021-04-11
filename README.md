# Danielle's (old) Development Portfolio

My (old) blog, where I explore, discover, and chronicle my adventures in learning through coding projects.

**Note:** This site has been retired, but I'm keeping it around to have as a reminder of how far I've come.

## Directions to edit and run locally
- Ensure you have [node.js](https://nodejs.org/en/) installed on your computer and also have a [GitHub](https://github.com/) account.
- Download the .zip file or clone the repo
- Generate a [GitHib API token](https://github.com/settings/tokens/new)
- In the project root create a blank file called `token.js`
-  Within the `token.js` file add the following:
  ```
  var GITHUB_TOKEN = '[enter your generated github token string here]';

  module.exports = GITHUB_TOKEN;
  ```

  Note: **Never** publish an API token anywhere accessibile to the public
- In the project root run `npm install`
- `npm start` will run the site on `localhost:3000` unless you have a `PORT` variable specified in your `process.env`.
