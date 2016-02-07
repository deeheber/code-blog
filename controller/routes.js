/***  Routes for Home About Stats ***/
page('/', homeController.index);
page('/about', aboutController.index);
page('/stats', statsController.index);
page('/github', gitHubController.index);

/***  Activates page.js ***/
page();
