var projectView = {};

projectView.populateFilters = function(){
  $('article').each(function(){
    if(!$(this).hasClass('template')){
      var value = $(this).attr('data-category');
      var newOption = '<option value="'+value+'">'+value+'</option>';
      /**If the value doesn't exist > add it to the dropdown**/
      if ($('#category-filter option[value="' + value + '"]').length === 0) {
        $('#category-filter').append(newOption);
      }
    }
  });
};

projectView.handleCategoryFilter = function(){
  $('#category-filter').on('change', function(){
    var selectedOption = $(this).val();
    if(selectedOption){
      $('article').hide().each(function(){
        if($(this).attr('data-category') == selectedOption){
          $(this).show();
        }
      });
    }
    else {
      /***Show all posts if the first item in the dropdown is selected***/
      $('article').show();
      $('.template').hide();
    }
  });
};
projectView.setPreview = function(){
  $('.post_body *:nth-of-type(n+2)').hide();

  /***add event handler to display the full post body on click here***/
  $('article').on('click', function(event){
    if(event.target.nodeName =='A' && event.target.innerHTML == 'Read More →'){
      /***runs if a "read more" link is clicked***/
      event.preventDefault();
      $(this).find('.post_body *:nth-of-type(n+2)').show();
      $(this).find('.read_more').hide();
    }
  });

};

$(document).ready(function() {
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.setPreview();
});
