/***  Routes for Home ***/
page('/',
  homeController.loadAll,
  homeController.index);

/*** Category filter options for home page ***/
page('/category', '/');

page('/category/:categoryName',
  homeController.loadByCategory,
  homeController.index);

/*** Route for about and github ***/
page('/about', aboutController.index);
page('/github', gitHubController.index);

/***  Activates page.js ***/
page();
