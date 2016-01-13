var projectView = {};

projectView.handleNavTabs = function(){
  $('.tab').hide();
  $('#main-nav').on('click', '.tabLink', function(event){
    event.preventDefault();
    var tabId = $(this).data('tab');
    $('#'+ tabId).show();
    $('#'+ tabId).show().siblings().hide();
  });
};

projectView.populateFilters = function(){
  $('article').each(function(){
    var value = $(this).data('category');
    var newOption = '<option value="'+value+'">'+value+'</option>';
    /**If the value doesn't exist then add it to the dropdown**/
    if ($('#category-filter option[value="' + value + '"]').length === 0) {
      $('#category-filter').append(newOption);
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
    }
  });
};
projectView.setPreview = function(){
  /*** Display only the first paragraph in the post body ***/
  $('.post_body *:nth-of-type(n+2)').hide();
  /***add event handler to display the full post body on click here***/
  $('article').on('click', '.read_more ', function(event){
    event.preventDefault();
    $(this).parent().find('.post_body *:nth-of-type(n+2)').show();
    $(this).parent().find('.read_more').hide();
  /*** NEXT STEPS: add the ability to collapse an expanded description ***/
  });
};

$(document).ready(function() {
  projectView.handleNavTabs();
  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.setPreview();
});
