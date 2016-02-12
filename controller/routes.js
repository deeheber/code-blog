/***  Routes for Home About Stats ***/
page('/', homeController.index);

/*** Category filter options for home page ***/
page('/category', '/');
page('/category/:categoryName',
  homeController.loadByCategory,
  homeController.show);

page('/about', aboutController.index);
page('/github', gitHubController.index);

/***  Activates page.js ***/
page();
