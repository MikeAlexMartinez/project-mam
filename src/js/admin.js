'use strict';
//=include jquery.js

$(document).ready(() => {

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

    // do validations here....


    const data = {
      sender: $('#bug-name').val(),
      email: $('#bug-email').val(),
      bugDescription: $('#bug-message').val(),
    };
    
    const successMessage = 'Bug Report received! Exterminator en-route!';
    
    const posting = $.post({
      url: '/api/bug', 
      data: data, 
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });
    
    posting.done(function() {
      // Need to clear fields if message was successful
      $('#bug-name').val('');
      $('#bug-email').val('');
      $('#bug-message').val('');
      
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