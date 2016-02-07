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
    $('article').each(function(){
      var value = $(this).data('category');
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
    /***Keep sidebar fixed on scroll***/
    // var offset = $('#sidebar').offset();
    // $(window).on('scroll', function(){
    //   if($(window).scrollTop() > (offset.top * 0.5) && $(window).scrollTop() < offset.top){
    //     $('#sidebar').stop().css('top', (offset.top * 0.5));
    //   } else if ($(window).scrollTop() > offset.top){
    //     $('#sidebar').stop().css('top', 0);
    //   } else {
    //     //($(window).scrollTop() < (offset.top * 0.5))
    //     $('#sidebar').stop().css('top', offset.top);
    //   }
    // });
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

  projectView.initStats = function(){
    /*** Clears out prior stats content if the '/stats' page was already visited ***/
    $('#stats_content').empty();

    /*** Calc total num words in all posts ***/
    var wordTotal = Post.all.map(function(post){
      return post.body.match(/\b\w+/g).length;
    }).reduce(function(a, b){
      return a + b;
    });

    /*** Build handlebars template and append to the DOM ***/
    var statsTemplate = Handlebars.compile($('#stats-template').html());
    var statsContent = {
      'postNum': Post.all.length,
      'postWordTotal': wordTotal,
      'avgPostWord': (wordTotal/Post.all.length).toFixed(2)
    };
    var compiledHTML = statsTemplate(statsContent);

    $('#stats_content').append(compiledHTML);
  };

  projectView.initHomePage = function(){
    /*** Clear articles from page if / was already loaded ***/
    $('#articles').empty();
    /*** Writes blog posts to the page and enables views ***/
    Post.all.forEach(function(content){
      $('#articles').append(content.toHtml());
    });

    projectView.populateCategories();
    projectView.handleCategoryFilter();
    projectView.handleSidebarFilter();
    projectView.setPreview();
  };
  module.projectView = projectView;
})(window);
