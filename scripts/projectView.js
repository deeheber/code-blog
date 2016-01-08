var projectView = {};

projectView.populateFilters = function(){
  $('article').each(function(){
    if(!$(this).hasClass('template')){
      var dataCategory = $(this).attr('data-category');
      var newOption = '<option value="'+dataCategory+'">'+dataCategory+'</option>';
      $('#category-filter').append(newOption);
    }
  });
};

projectView.handleCategoryFilter = function(){

};

$(document).ready(function() {
  projectView.populateFilters();
  projectView.handleCategoryFilter();
});
