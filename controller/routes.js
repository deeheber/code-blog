/***  Routes for Home ***/
page('/',
  homeController.init,
  homeController.loadAll,
  homeController.index,
  homeController.show
);

/*** Category filter options for home page ***/
page('/category', '/');
page('/category/all', '/');

page('/category/:categoryName',
  homeController.init,
  homeController.loadByCategory,
  homeController.index,
  homeController.show
);

/*** Route for about and github ***/
page('/about', aboutController.index);
page('/github', gitHubController.index);

/***  404 error page ***/
page('*', notFoundController.index);

/***  Activates page.js ***/
page();
