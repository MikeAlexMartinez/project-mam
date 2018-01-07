'use strict';
//=include jquery.js
//=include masonry.pkgd.min.js
//=include owl.carousel.min.js

$(document).ready(() => {
  
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
  $('#scrollToTop').click((evt) => {
    
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
   * Slide in Project detail
   * 
   **/
  $('.imgInfo .btn').click((evt) => {

    // get width of viewport
    const width = $( window ).width();
    const node = $(evt.target);
    const target = $(`#${node.attr('target')}`);
    let scrollTo = $('#rightSide');

    if(width < 1025) {
      // change targets for smaller screens
      scrollTo = $('#title');
    }

    // scroll to top when not at the top.
    scrollToTop(scrollTo, $('html, body'), 300);

    // Slide in project detail
    target.addClass('show');  

    // hide main content to prevent excessive overflow-y
    $('#rightSide').addClass('hide');

  });

  $('.close-project').click((evt) => {
    $('.out-right.show').removeClass('show');
    $('#rightSide').removeClass('hide');
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
  });

  $('#title').click((evt) => {

    const menu = $('#menu-icon'); 

    if (menu.hasClass('open')) {
      console.log('menu is open')
    }
  });
  $('#rightSide').click((evt) => {
    const menu = $('#menu-icon'); 
    
    if (menu.hasClass('open')) {
      console.log('menu is open')
    }
  });

  /**
   * contact form handling
   * 
   **/
  const errorMessage = 'Oops! We encountered an error. Please retry later...  ( -_-)';
  
  $('#contactForm').submit(function(evt) {
    evt.preventDefault();
    console.log("New message Submited!");
    
    const data = {
      source: $('#contact-source').val(),
      name: $('#contact-name').val(),
      email: $('#contact-email').val(),
      message: $('#contact-message').val(),
    };
    
    const successMessage = 'Message received! Please check your inbox ( ^_^) ';
    
    const posting = $.post('/api/message', data, "json");
    
    posting.done(function(data) {
      
      showToast('contact','success', successMessage);
      
    }).fail(function(err) {
      
      showToast('contact','error', errorMessage);
    });
    
  });
  
  /**
   * subscribe form handling
   * 
   **/
  $('#subscribeForm').submit(function(evt) {
    evt.preventDefault();
    console.log("New Subscriber Submited!");
    
    const data = {
      source: $('#subscribe-source').val(),
      email: $('#subscribe-email').val(),
      active: true,
    };
    
    const posting = $.post('/api/subscriber', data, "json");
    
    const successMessage = 'Thanks for subscribing! Please check your inbox. ( ^_^) ';
    
    posting.done(function() {
      
      showToast('subscribe', 'success', successMessage);
      
    }).fail(function(err) {
      
      console.log(err);
      
      if(err.status === 409) {
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
 * 
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