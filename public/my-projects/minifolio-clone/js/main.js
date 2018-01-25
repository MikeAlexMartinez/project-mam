'use strict'

$(document).ready(function() {
  
  // Only run this code on the homepage (where there's a project portfolio)
  if ($('.projects-container').length) {
  
    // create independent project container
    // objects to define waypoints, and distinct functions
    // to calculate delays.
    const delay = 75;
    const projectContainers = [{
      id: 'projects-container-top',
      difference: function(n, l) {
        // fadein project from left to right
        return delay * n;
      },
      class: 'animated fadeIn'
    },
    {
      id: 'projects-container-bottom',
      difference: function(n, l) {
        // fadein projects from right to left
        return (l*delay) - (delay * n);
      },
      class: 'animated fadeIn'
    }];
  
    projectContainers.forEach((v, i) => {
      registerWaypoint(v,i);
    });

    // fancybox code for project image viewing
    $('.fancybox').fancybox({
      helpers: {
        // Create dark overlay behing project image
        overlay : {
          css : {
            'background': 'rgba(58, 42, 45, 0.95)'
          }
        }
      }
    });

  }
  
  // load handler for contact form when on contact page
  if ($('#contactForm').length) {

    $('#contactForm').submit(function(evt) {
      evt.preventDefault();

      const data = {
        source: $('#form-source').val(),
        name: $('#form-name').val(),
        email: $('#form-email').val(),
        message: $('#form-message').val(),
      };

      const posting = $.post('/api/message', data, "json");

      posting.done(function(data) {
        console.log(data);
        $('#toast').addClass('success');
        if(data.success && data.success !== '') {
          $('#toast').html(`<p class="message">${data.success}</p>`);
        } else {
          $('#toast').html(`<p class="message">"Message Submitted!"</p>`);
        }
      }).fail(function(err) {
        $('#toast').addClass('error');
        const res = err.responseJSON;
        if(res.error && res.error !== '') {
          $('#toast').html(`<p class="message">${res.error}</p>`);
        } else {
          $('#toast').html(`<p class="message">"Error Encountered! Please try again later"</p>`);
        }
      });
    });
  }

  // toggle menu icon
  $('#menu-icon').click(function() {

    // for smaller screens show alternate menu
    $(this).toggleClass('open');
    $('#links').toggleClass('visible');

  });

});

// banner - fixed on scroll waypoint
const navWaypoint = new Waypoint({
  element: document.getElementById('banner'),
  handler: function(direction) {
    checkFixed();
  },
  offset: -1
});

// register independent waypoints for both banks of project 
// containers 
function registerWaypoint(v,i) {
  const target = `projectWaypoint${i}`;
  
  window[target] = new Waypoint({
    element: document.getElementById(v.id),
    handler: function() {
      // function to fade in projects with appropriate delays
      fadeInProjects(v);

      // destroy waypoint to prevent unnecessary rerunning of function
      this.destroy();
    },
    offset: '85%'
  });
}

// banner waypoint handler function
function checkFixed() {
  const scrollPos = $(document).scrollTop();
  if (scrollPos === 0) {
    $('#navigation').removeClass('fixed');
  } else {
    $('#navigation').addClass('fixed');
  }
}

// project container waypoint handler function
function fadeInProjects(v) {
  
  const selector = $(`#${v.id} .project`);
  const l = selector.size();

  // fadeIn each project with different delay
  // time.
  selector.each(function(i, e) {
    const delay = v.difference(i, l);
    const classVal = v.class;

    setTimeout(function() {
      $(e).addClass(classVal);
    }, delay);
  });
}
