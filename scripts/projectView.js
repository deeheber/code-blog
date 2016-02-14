(function(module) {
  var projectView = {};

  projectView.populateCategories = function(){
    /*** Clears out the sidebar and drop down filter if the page is reloaded to prevent duplicates ***/
    $('#category-filter').children().not(':first').remove();
    $('#sidebar-filter').children().not(':first').remove();

    /*** Make sure 'All Categories' is white by default when navigating to '/' ***/
    $('.sidebarLink').addClass('active-sidebar');

    /*** Populate category dropdown and sidebar using a Handlebars template ***/
    var dropdownTemplate = Handlebars.compile($('#dropdown-template').html());
    var sidebarTemplate =Handlebars.compile($('#sidebar-template').html());

    var content = {
      filter: [ ]
    };

    /***Scan through categories in projectData and populate the categories***/
    Post.all.forEach(function(el){
      var value = el.category;
      /*** Checking to see if the value already exists in the array ***/
      if (content.filter.indexOf(value) == -1) {
        content.filter.push(value);
      }
    });

    var dropdownHtml = dropdownTemplate(content);
    var sidebarHtml = sidebarTemplate(content);

    $('#category-filter').append(dropdownHtml);
    $('#sidebar-filter').append(sidebarHtml);
    /*** End handlebars code ***/

  };

  projectView.handleCategoryFilter = function(){
    $('#category-filter').on('change', function(){
      var selectedOption = $(this).val();
      if(selectedOption){
        $('article').hide().each(function(){
          if($(this).data('category') == selectedOption){
            $(this).show();
          }
        });
      }
      else {
        /***Show all posts if the first item in the dropdown is selected***/
        $('article').show();
      }
      /***Highlight sidebar nav for selected category in case the window is resized***/
      $('.sidebarLink').removeClass('active-sidebar');
      $('.sidebarLink').each(function(){
        if($(this).data('category') == selectedOption){
          $(this).addClass('active-sidebar');
        }
      });

    });
  };

  projectView.handleSidebarFilter = function(){
    /***Hide/show articles when a category in the sidebar is clicked***/
    $('#sidebar').on('click', 'a', function(event){
      event.preventDefault(event);
      var clickedLink = event.target;
      var selectedOption = $(this).data('category');
      if(selectedOption){
        $('article').hide().each(function(){
          if($(this).data('category') == selectedOption){
            $(this).show();
          }
        });
      }
      else {
        /***Show all posts if the first item in the dropdown is selected***/
        $('article').show();
      }
      /***Highlight sidebar nav link for selected category***/
      $('.sidebarLink').removeClass('active-sidebar');
      $(clickedLink).addClass('active-sidebar');

      /***Change drop down filter that appears on smaller screens in case the window size is changed***/
      $('#category-filter').children().each(function(){
        $(this).removeAttr('selected');
        if($(this).val() == selectedOption){
          /*** Fixed for Safari compatability ***/
          $(this).prop('selected', true);
        }
      });
    });
  };

  projectView.setPreview = function(){
    /*** Display only the first paragraph in the post body ***/
    $('.post_body *:nth-of-type(n+2)').hide();
    /***add event handler to display the full post body on click here***/
    $('article').on('click', '.read_more ', function(event){
      var clickedLink = $(this);
      event.preventDefault(event);
      $(this).parent().find('.post_body *:nth-of-type(n+2)').slideToggle(function(){
        if($(this).is(':visible')){
          clickedLink.html('<a>Read Less</a>');
        }
        else {
          clickedLink.html('<a>Read More</a>');
        }
      });
    });
  };

  projectView.index = function(selectedPosts){
    /*** Clear articles from page if / was already loaded ***/
    $('#articles').empty();
    /*** Writes blog posts to the page and enables views ***/
    selectedPosts.forEach(function(content){
      $('#articles').append(content.toHtml());
    });

    projectView.populateCategories();
    //projectView.handleCategoryFilter();
    //projectView.handleSidebarFilter();
    projectView.setPreview();
  };

  module.projectView = projectView;
})(window);
