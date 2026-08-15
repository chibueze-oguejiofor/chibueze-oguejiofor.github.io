(function($) {
  "use strict";

  // Close responsive menu on link click (theme/search controls excluded)
  $('.nav-link:not(.nav-control)').click(function() {
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

  // Dark/light theme toggle — the <head> boot script in each page applies the
  // stored (or system-preferred) theme before first paint; this handles the
  // navbar button and persists the visitor's choice.
  var setThemeIcon = function() {
    var dark = document.documentElement.classList.contains('dark-mode');
    $('#theme-toggle i').toggleClass('fa-moon', !dark).toggleClass('fa-sun', dark);
  };
  setThemeIcon();
  $('#theme-toggle').click(function(e) {
    e.preventDefault();
    var dark = document.documentElement.classList.toggle('dark-mode');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (err) {}
    setThemeIcon();
  });

  // Site search — static index of every page's content. When site content
  // changes, update the matching entries here (title/text are what's matched).
  var searchIndex = [
    // Bio
    { page: 'Bio', url: 'bio.html', title: 'Chibueze N. Oguejiofor, Ph.D. — Scientist II, Verisk', text: 'Scientist II Verisk Catastrophe & Risk Solutions United States catastrophe risk modeling industry hurricane dynamics physics parametric risk models' },
    { page: 'Bio', url: 'bio.html', title: 'Doctoral research at the University of Notre Dame', text: 'richter lab tropical cyclone rapid intensification air-sea interaction submesoscale turbulent scales storm intensity geostatistical framework sea surface temperature SST anomalies physics of turbulence roll vortices mesovortices streaks updraft-downdraft couplets hurricane eyewalls' },
    { page: 'Bio', url: 'bio.html', title: 'Ph.D. in Civil and Environmental Engineering & Earth Sciences (Fluid Dynamics), 2020 - 2024', text: 'University of Notre Dame United States dissertation On the Internal Processes Modulating Tropical Cyclone Intensity Turbulent Stresses & Submesoscale Dynamics timeline academic journey' },
    { page: 'Bio', url: 'bio.html', title: 'Postgraduate (PGd.) in Earth System Physics, 2019 - 2020', text: 'International Center for Theoretical Physics ICTP Italy thesis Local and Non-Local PBL schemes in WRF model Impact on the Intensification of Tropical cyclone Idai timeline academic journey' },
    { page: 'Bio', url: 'bio.html', title: 'Masters (MSc.) in Mathematical Sciences, 2018 - 2019', text: 'African Institute for Mathematical Sciences AIMS Rwanda thesis Simulating the influence of Sea Surface Temperature on Tropical Cyclones over South-West Indian ocean UEMS-WRF regional climate model timeline academic journey' },
    { page: 'Bio', url: 'bio.html', title: 'Bachelors (BSc.) in Geophysics, 2012 - 2017', text: 'University of Lagos Nigeria timeline academic journey' },
    { page: 'Bio', url: 'bio.html', title: 'Curriculum Vitae (CV)', text: 'view complete CV resume pdf' },
    // Research
    { page: 'Research', url: 'research.html', title: 'Tropical Cyclone Rapid Intensification', text: 'Influence of Sea Surface Temperature SST length scales published multiscale anomalies predictability onset timing' },
    { page: 'Research', url: 'research.html', title: 'Turbulence In Hurricanes', text: 'The Diffusive Role of Turbulence in Hurricane Momentum Dynamics momentum diffusion in intense hurricanes mean wind fields published' },
    { page: 'Research', url: 'research.html', title: 'Eddies In The Hurricane Eyewall', text: 'The Dynamics of Turbulent Structures in the N-W quadrant of the Eyewall arXiv preprint coming soon on-going research' },
    { page: 'Research', url: 'research.html', title: 'Synthetic Aperture Radar (SAR)', text: 'Inner-core fingers in Hurricane Helene 2024 shallow water equations Fortran90 Python CDO NCL NCO Bash scripting' },
    // Publications — peer-reviewed
    { page: 'Publications', url: 'publications.html', title: 'Near-surface Coherent Structures in an Intense Tropical Cyclone: Conditional Eddies and Vertical Momentum Fluxes (2025)', text: 'Oguejiofor Bryan Sullivan Richter Journal of Fluid Mechanics in preparation arXiv preprint peer-reviewed' },
    { page: 'Publications', url: 'publications.html', title: 'The Role of Turbulence in an Intense Tropical Cyclone: Momentum Diffusion, Eddy Viscosities, and Mixing Lengths (2024)', text: 'Oguejiofor Bryan Rotunno Sullivan Richter Journal of the Atmospheric Sciences peer-reviewed' },
    { page: 'Publications', url: 'publications.html', title: 'Onset of Tropical Cyclone Rapid Intensification: Evaluating the response to Length Scales of Sea Surface Temperature Anomalies (2023)', text: 'Oguejiofor Wainwright Rudzin Richter Journal of the Atmospheric Sciences peer-reviewed' },
    // Publications — thesis & dissertation
    { page: 'Publications', url: 'publications.html', title: 'Doctoral Dissertation (2024): On the Internal Processes Modulating Tropical Cyclone Intensity', text: 'Turbulent Stresses & Submesoscale Dynamics thesis dissertation Notre Dame' },
    { page: 'Publications', url: 'publications.html', title: 'Thesis (2020): Local and Non-Local PBL schemes in WRF model', text: 'planetary boundary layer Impact on the Intensification of Tropical cyclone Idai 2019 thesis ICTP' },
    { page: 'Publications', url: 'publications.html', title: 'Thesis (2019): Simulating the influence of SST on tropical cyclones over South-West Indian ocean', text: 'sea-surface-temperature UEMS-WRF regional climate model thesis AIMS' },
    // Publications — conferences
    { page: 'Publications', url: 'publications.html', title: '36th Conference on Hurricanes and Tropical Meteorology (AMS), 2024 — Long Beach, California', text: 'The diffusive role of turbulence in an intense tropical cyclone conference' },
    { page: 'Publications', url: 'publications.html', title: '23rd Conference on Air-Sea Interaction, 103rd AMS Annual Meeting, 2023 — Denver, Colorado', text: 'Tropical cyclone rapid intensification response to length scales of sea surface temperature anomalies conference' },
    { page: 'Publications', url: 'publications.html', title: '35th Conference on Hurricanes and Tropical Meteorology (AMS), 2022 — New Orleans', text: 'sensitivity of hurricane intensification to length scales of sea surface temperature SST heterogeneities conference' },
    { page: 'Publications', url: 'publications.html', title: 'Ocean Sciences Meeting (OSM), 2022 — virtual', text: 'dependence of hurricane intensity on varying SST patterns idealized model simulations conference' },
    { page: 'Publications', url: 'publications.html', title: 'Front Range Tropical Cyclone Workshop, 2022 — Fort Collins, Colorado', text: 'rapid intensification multiscale anomalies sea surface temperature conference' },
    { page: 'Publications', url: 'publications.html', title: 'American Geophysical Union (AGU) Fall Meeting, 2021 — New Orleans', text: 'dependence of hurricane intensity on varying SST patterns idealized model simulations conference recorded presentation' },
    { page: 'Publications', url: 'publications.html', title: 'Midwest Student Conference on Atmospheric Research (MSCAR), 2021 — virtual', text: 'dependence of hurricane intensity on varying SST patterns idealized model simulations conference slides' },
    // Satellite products
    { page: 'Satellite Products', url: 'satellite-products.html', title: 'Synthetic Aperture Radar (SAR)', text: 'Monitoring the structural evolution of storms with high resolution 500m SAR imagery Sentinel Radarsat RCM satellite missions Hurricane Humberto 2025 life cycle tropical storm extra tropical transition' },
    { page: 'Satellite Products', url: 'satellite-products.html', title: 'Cloud Profiling Radars & Multispectral Imagers', text: 'Cloud Profiling Radar CPR Multi-Spectral Imager MSI Atmospheric Lidar ATLID Broad-Band Radiometer BBR ESA EARTHCare satellite mission Typhoon Fung-Wong 2025 cross section storm structure Phillipines' },
    { page: 'Satellite Products', url: 'satellite-products.html', title: 'Geostationary Satellite', text: 'Advanced Baseline Imager ABI Geostationary Operational Environmental Satellite GOES SAR data sources Hurricane Melissa 2025 landfall Jamaica' },
    // Contact
    { page: 'Contact', url: 'contact.html', title: 'Contact — Connect with me', text: 'email oguejiofor.n.chibueze@gmail.com twitter github linkedin google scholar social' }
  ];

  var escapeHtml = function(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  var $searchOverlay = null;

  var closeSearch = function() {
    if ($searchOverlay) {
      $searchOverlay.removeClass('active');
      $('body').removeClass('search-open');
    }
  };

  var renderResults = function(query) {
    var $results = $searchOverlay.find('.site-search-results');
    $results.empty();
    var q = $.trim(query).toLowerCase();
    if (!q) {
      return;
    }
    var matches = $.grep(searchIndex, function(entry) {
      return (entry.title + ' ' + entry.text).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 12);
    if (!matches.length) {
      $results.append($('<li class="site-search-empty"></li>').text('No results for “' + query + '”'));
      return;
    }
    $.each(matches, function(i, entry) {
      var snippetHtml = '';
      var idx = entry.text.toLowerCase().indexOf(q);
      if (idx !== -1) {
        var start = Math.max(0, idx - 50);
        var end = Math.min(entry.text.length, idx + q.length + 50);
        snippetHtml = '<span class="site-search-snippet">' +
          (start > 0 ? '…' : '') +
          escapeHtml(entry.text.slice(start, idx)) +
          '<mark>' + escapeHtml(entry.text.slice(idx, idx + q.length)) + '</mark>' +
          escapeHtml(entry.text.slice(idx + q.length, end)) +
          (end < entry.text.length ? '…' : '') +
          '</span>';
      }
      $results.append(
        '<li><a href="' + entry.url + '">' +
        '<span class="site-search-page">' + escapeHtml(entry.page) + '</span>' +
        '<span class="site-search-title">' + escapeHtml(entry.title) + '</span>' +
        snippetHtml +
        '</a></li>'
      );
    });
  };

  var buildSearchOverlay = function() {
    $searchOverlay = $(
      '<div class="site-search-overlay" role="dialog" aria-label="Site search">' +
      '<div class="site-search-box">' +
      '<div class="site-search-input-wrap">' +
      '<input type="text" class="site-search-input" placeholder="Search this site…" aria-label="Search this site" autocomplete="off">' +
      '<button type="button" class="site-search-close" aria-label="Close search">&times;</button>' +
      '</div>' +
      '<ul class="site-search-results"></ul>' +
      '</div>' +
      '</div>'
    ).appendTo('body');
    $searchOverlay.on('click', function(e) {
      if (e.target === this) {
        closeSearch();
      }
    });
    $searchOverlay.find('.site-search-close').click(closeSearch);
    $searchOverlay.find('.site-search-input').on('input', function() {
      renderResults($(this).val());
    }).on('keydown', function(e) {
      if (e.key === 'Enter') {
        var first = $searchOverlay.find('.site-search-results li a').first();
        if (first.length) {
          window.location.href = first.attr('href');
        }
      }
    });
  };

  var openSearch = function() {
    if (!$searchOverlay) {
      buildSearchOverlay();
    }
    $searchOverlay.addClass('active');
    $('body').addClass('search-open');
    $searchOverlay.find('.site-search-input').val('').trigger('focus');
    $searchOverlay.find('.site-search-results').empty();
  };

  $('#search-toggle').click(function(e) {
    e.preventDefault();
    $('.navbar-collapse').collapse('hide');
    openSearch();
  });

  $(document).keydown(function(e) {
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

})(jQuery);
