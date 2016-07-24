  var $studentItem = $('.student-item');
  var $pagination = $('.pagination');
  var $searchCriteria = $('#search-criteria');
  var perPage = 10;

  // count number of student items
  var studentCount = $studentItem.length;
  // number of pages = number of students / 10 rounded up
  var pageNumber = Math.ceil(studentCount / perPage);
  // remove all student items
  var initialTen = $studentItem.hide();
  // display first 10 student items
  initialTen = $studentItem.slice(0, perPage).show();
  // pagination ul
  var paginationHTML = '<div class = "pagination">';
  paginationHTML += '<ul>';
  // calc number of links
  for (var i = 1; i < pageNumber + 1; i++) {
    // li and link for each page
    paginationHTML += '<li><a href ="#">' + i + '</a></li>';
  }
  // end of ul
  paginationHTML += '</ul>';
  paginationHTML += '</div>';


  // display list to page
  $('.student-list').append(paginationHTML);

  // pagination link click
  $('.pagination li a').on('click', function() {
    // remove active
    $('.pagination li a.active').removeClass('active');
    // add active class
    $(this).addClass('active');
    // page number of clicked
    var pageNum = this.text;
    // Start point for slice
    // e.g 3 * 10
    var startFrom = pageNum * perPage - perPage;
    // end point for slice
    // e.g 30 + 10
    var endOn = startFrom + perPage;
    // display students based on number clicked
    $studentItem.hide().slice(startFrom, endOn).show();

  });

  //Search section - creation of html

  var $searchSection = $('<div class="student-search"></div>');
  $searchSection.append('<input id = "search-criteria" placeholder="Search for students..."></input>');
  $searchSection.append('<button>Search</button>');

  //Append search section
  $('.page-header').append($searchSection);

  // Error message for no matches found
  var $noMatches = $('<h2>No Matches</h2>');
  // Add to page
  $('.page').append($noMatches);
  // hide initially
  $noMatches.hide();

  // search box on type
  $('.page-header').on('input', '#search-criteria', function() {
    // remove all result classes
    $studentItem.each(function() {
      $(this).removeClass("result");
    });

    // value of searched
    var text = $(this).val().toLowerCase();
    // results of search
    var results = $("ul.student-list li:contains('" + text.toLowerCase() + "')");
    results.addClass("result");
    // show or hide based on result matching div
    $studentItem.each(function() {
      if ($(this).hasClass('result')) {
        $(this).show("slow");
      } else {
        $(this).hide();

      }

    });
    // see if results are greter than 10
    if (results.length > 10) {
      // remove all student items
      var initialTen = $studentItem.hide();
      // display first 10 student items
      initialTen = $studentItem.slice(0, perPage).show();
      // show pagination
      $('.pagination').show();

      // pagination show the correct number


      // hide no matches message
      $noMatches.hide();
    } else if (results.length === 0) {
      // Hide pagination in no results
      $('.pagination').hide();
      // Show no matches message
      $noMatches.show();

    } else {
      // Hide pagination if less thatn 10 results
      $('.pagination').hide();
    }

  });