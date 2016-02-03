/***  Routes for Home About Stats ***/
page('/', homeController.index);
page('/about', aboutController.index);
page('/stats', statsController.index);

/***  Activates page.js ***/
page();
