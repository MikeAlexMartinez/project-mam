'use strict';
//=include jquery.js
//=include masonry.pkgd.min.js
//=include owl.carousel.min.js

$(document).ready(() => {
  
  const errorMessage = 'Oops! We encountered an error. Please retry later...  ( -_-)';

  /**
   * Set up owl carousel with skills
   */
  const skillsOwl = $('#owl-skill');

  skillsOwl.owlCarousel({
    loop: true,
    margin: 0,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 3 
      },
      1500: {
        items: 5
      }
    }
  });

  // Add custom owl carousel buttons
  // Go to next item in carousel
  $('.owlBtn.next').click(function() {
    skillsOwl.trigger('next.owl.carousel');
  });

  // Go to previous item in carousel
  $('.owlBtn.prev').click(function() {
    skillsOwl.trigger('prev.owl.carousel');
  });

  // Set height of owl buttons
  setOwlBtnHeight();

  // Reset height when window resizes
  $( window ).resize(() => {
    setOwlBtnHeight();
  });

  /**
   * Set up masonry grid gallery
   * 
   **/
  $('#gallery .grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 20,
  });

  /**
   * Scroll to top click handler for footer
   * 
   **/
  $('#scrollToTop').click(() => {
    
    // get width of viewport
    const width = $( window ).width();
    const speed = 1000;

    // targets for wider screens
    let scrollTo = $('#rightSide');
    let move = $('html, body');

    if(width < 1025) {
      // change targets for smaller screens
      scrollTo = $('#title');
    }

    // animate the page
    scrollToTop(scrollTo, move, speed);
  });

  /**
   * Navigation menu control
   * 
   */
  $('#menu-icon').click(() => {
    // change burger icon
    $('#menu-icon').toggleClass('open');
    // slide in navigation
    $('#navigation').toggleClass('open');

    const navSlide = $('.nav-slide');

    if(navSlide.length) {
      navSlide.toggleClass('open');
    }
    
    // adjust bug-reporting entry point
    $('.bug-reporter').toggleClass('nav-open');

  });

  /**
   * Login form visibility control
   */
  $('.brandLogo').click((evt) => {
    const target = $(evt.target).attr('class');
    
    $('#adminForm').addClass('show');
  });
  $('#closeLogin').click((evt) => {
    
    $('#adminForm').removeClass('show');
  });
  $('.ion-md-close-circle').click((evt) => {
    evt.stopPropagation();
    
    $('#adminForm').removeClass('show');
  });

  /**
   * Bug reporting Transitions 
   */
  $('#bug-report').click((evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    // change bug-reporter colour to red
    $('#bug-report .imgContainer').toggleClass('red');
    // rotate and fadin in bug-reporter
    $('.bug-reporter').toggleClass('show');;
    
  });
  
  /**
   * Bug reporting form handling
   */
  $('#bugReporter').submit(function(evt) {
    evt.preventDefault();
    console.log('new Bug Submitted!');

    const data = {
      sender: $('#bug-name').val(),
      email: $('#bug-email').val(),
      bugDescription: $('#bug-message').val(),
    };
    
    const successMessage = 'Bug Report received! Exterminator en-route!';
    
    const posting = $.post('/api/bug', data, 'json');
    
    posting.done(function() {
      // Need to clear fields if message was successful

      showToast('bug','success', successMessage);
    }).fail(function() {
      showToast('bug','error', errorMessage);
    });

  });

  /**
   * Show general toast message if message exists
   */
  if ($('.toastContainer').hasClass('show')) {
    const target =  $('.toastGeneral');
    
    setTimeout(() => {
      target.addClass('active');

      // show message for 3 seconds
      setTimeout(() => {
        target.removeClass('active');
      }, 3000);

    }, 200)
  }

  /**
   * contact form handling
   **/
  $('#contactForm').submit(function(evt) {
    evt.preventDefault();
    console.log('New message Submitted!');

    const data = {
      sender: $('#contact-name').val(),
      email: $('#contact-email').val(),
      message: $('#contact-message').val(),
    };
    
    const successMessage = 'Message received! ( ^_^) ';
    
    const posting = $.post('/api/message', data, 'json');
    
    posting.done(function() {
      // Need to clear fields if message was successful

      showToast('contact','success', successMessage);
    }).fail(function() {
      showToast('contact','error', errorMessage);
    });
    
  });
  
  /**
   * subscribe form handling
   **/
  $('#subscribeForm').submit(function(evt) {
    evt.preventDefault();
    console.log('New Subscription Submitted!');

    const data = {
      email: $('#subscribe-email').val(),
      active: true,
    };
    
    const posting = $.post('/api/subscriber', data, 'json');
    
    const successMessage = 'Thanks for subscribing! ( ^_^) ';
    
    posting.done(function() {
      
      showToast('subscribe', 'success', successMessage);
      
    }).fail(function(err) {
      
      if(err.status === 409) {
        // Need to clear fields if message was successful

        showToast('subscribe', 'success', successMessage);
      } else {
        showToast('subscribe', 'error', errorMessage);
      }
      
    });
    
  });
  
});

function showToast(section, status, message) {
  const target = $(`#${section}Toast`);
  
  target.html(message);
  target.addClass(status);
  
  setTimeout(() => {
    target.addClass('exit');
  }, 3500);
  
  setTimeout(() => {
    target.removeClass(`${status} exit`);
    target.html('');
  }, 6000);
}

/**
 * animates move by scrolling from the target to 
 * the top of the page at the defined speed 
 * @function scrollToTop
 * @param { Object } target 
 * @param { Object } move 
 * @param { Number } speed 
 * @return { null }
 * 
 * Handles smooth scroll of move element, to the 
 * target with no offset at the defined speed.
 * 
 */
function scrollToTop(target, move, speed) {
  move.animate({
    scrollTop: target.offset().top
  }, speed, () => {
    target.focus();
  });
}

/**
 * @return {null}
 */
function setOwlBtnHeight() {
  // Set height and of buttons
  const height = $('.owl-item:first-child').height();
  
  $('.owlBtn').css('height', height);
  $('.owlBtn').css('padding-top', height / 2 - 25);
}