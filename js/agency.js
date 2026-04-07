(function($) {
  "use strict";

  // Close responsive menu on link click
  $('.nav-link').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Highlight active nav item based on current page
  var page = window.location.pathname.split('/').pop() || 'index.html';
  $('.navbar-nav .nav-link').each(function() {
    if ($(this).attr('href') === page) {
      $(this).addClass('active');
    }
  });

})(jQuery);
