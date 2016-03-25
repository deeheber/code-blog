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
  };

  projectView.handleCategoryFilter = function(selectedCategory){
    /***  Mobile category filter drop down event ***/
    $('#category-filter').one('change', function() {
      var selectedCategory = $(this).val();
      page('/category/'+selectedCategory);
    });

    /*** Change color for active sidebar link ***/
    $('.sidebarLink').removeClass('active-sidebar');
    $('.sidebarLink').each(function(){
      if($(this).data('category') == selectedCategory){
        $(this).addClass('active-sidebar');
      }
    });
    if(typeof selectedCategory === 'undefined'){
      $('li > a[href$="/category"]').addClass('active-sidebar');
    }

    /*** Change select menu option on URL change or screen resize ***/
    $('#category-filter > option').each(function(){
      if($(this).val() === selectedCategory){
        this.selected = true;
      }
    });
  };

  projectView.fixedCategorySidebar = function(){
    $(window).on('scroll', function(){
      var stop = $('#sidebar').offset().top;
      console.log('sidebar top '+stop); //top 230.59375
      var documentTop = $(window).scrollTop();
      console.log('top of document ' + documentTop);
      if(documentTop >= stop){
        $('#sidebar').css('position', 'fixed');
        $('#sidebar').css('top', '0px');
        $('#sidebar').css('float', 'right');
        $('#sidebar').css('margin-left', '62%');
      } 

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

  projectView.index = function(selectedPosts, selectedCategory){
    /*** Clear articles from page if / was already loaded ***/
    $('#articles').empty();
    /*** Writes blog posts to the page and enables views ***/
    selectedPosts.forEach(function(content){
      $('#articles').append(content.toHtml());
    });

    /*** In case someone typed in the URL with a capital category name  ***/
    if(selectedCategory){
      selectedCategory = selectedCategory.toLowerCase();
    }

    projectView.populateCategories();
    projectView.handleCategoryFilter(selectedCategory);
    projectView.fixedCategorySidebar();
    projectView.setPreview();
  };

  module.projectView = projectView;
})(window);
