'use strict';
//=include jquery.js

$(document).ready(() => {

  /**
   * General error Message
   */
  const errorMessage = 'Oops! We encountered an error!';

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

    toggleBugReporter();
  });

  $('#closeBugReporter').click((evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    toggleBugReporter();
  });
  
  function toggleBugReporter() {
    // change bug-reporter colour to red
    $('#bug-report .imgContainer').toggleClass('red');
    // rotate and fadin in bug-reporter
    $('.bug-reporter').toggleClass('show');;
  }

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
   * Delete button
   */
  $('.deleteButton').click((evt) => {
    const target = $(evt.target);
    const route = target.attr('target');
    const item = target.attr('item');
    const toastContainer = $('.toastContainer');
    const toastGeneral = $('.toastGeneral');
    const row = $(`#${item}`);

    // add 
    toastGeneral.addClass('warning');

    // append message and buttons
    toastGeneral.append(
      '<div class="appendedToast">' +
        '<div class="toastMessage">' +
          '<p> Are you sure you want to Delete this item?</p>' +
        '</div>' +
        '<div class="toastControls">' +
          '<div class="buttonContainer clicky">' + 
            '<button id="toastCancel" class="btn">Cancel</button>' +
          '</div>' +
          '<div class="buttonContainer clicky">' +
            '<button id="toastDelete" class="btn red">Delete</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    $('#toastCancel').click((evt) => {
      console.log('delete action cancelled');
      toastGeneral.removeClass('active');

      setTimeout(() => {
        toastContainer.css('z-index', 0);

        toastGeneral.empty();

      }, 1000);
    });

    $('#toastDelete').click((evt) => {
      console.log('delete action submitted');

      const del = $.ajax({
        url: route,
        dataType: 'json',
        method: 'delete',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      del.done(function deletedProject(res) {
        
        // remove toast
        clearToast('Success');

        // remove item from table
        row.remove();

      }).fail(function failDelete(res) {
        clearToast('Error');
      });

    });

    // show toastContainer with
    toastContainer.css('display', 'block');
    toastContainer.css('z-index', 25);
    toastGeneral.addClass('active');
        
    function clearToast(m) {
      console.log(m);
      toastGeneral.removeClass('active');
      
      setTimeout(() => {
        toastContainer.css('z-index', 0);
        toastContainer.css('display', 'none');
        toastGeneral.empty();

      }, 1000);
    }
  });

  /**
   * Item control change from view mode to Edit mode
   */
  $('#EditButton').click(function() {
    const updateLocation = window.location.href.replace(/\/view$/,'/edit');
    window.location = updateLocation;
  });

  /**
   * Show general toast message if message exists
   */
  if ($('.toastContainer').hasClass('show')) {
    const container = $('.toastContainer');
    container.css('display', 'block');
    container.css('z-index', 25);
    const target =  $('.toastGeneral');

    setTimeout(() => {
      target.addClass('active');

      // show message for 3 seconds
      setTimeout(() => {
        target.removeClass('active');

        setTimeout(() => {
          container.css('z-index', 0);
          container.css('display', 'none');
        }, 500);
      }, 2000);

    }, 200);
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