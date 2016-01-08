var projectView = {};

projectView.populateFilters = function(){
  $('article').each(function(){
    if(!$(this).hasClass('template')){
      var value = $(this).attr('data-category');
      var newOption = '<option value="'+value+'">'+value+'</option>';
      $('#category-filter').append(newOption);
    }
  });


};

projectView.handleCategoryFilter = function(){
  $('#category-filter').on('change', function(){
    //grab the selected value from the drop down menu
    var selectedOption = $(this).val();

    if(selectedOption){
      //runs if a valid category is selected
      $('article').hide().each(function(){
        if($(this).attr('data-category') == selectedOption){
          $(this).show();
        }
      });
    }
    else {
      $('article').show();
      $('.template').hide();
    }

  });
};

$(document).ready(function() {
  projectView.populateFilters();
  projectView.handleCategoryFilter();
});
