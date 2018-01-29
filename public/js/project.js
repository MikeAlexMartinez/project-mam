'use strict';

(function addProjectJS() {
  /**
   * Bug Reporting form visibility
   */
  $('#bug-report').click((evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    // change bug-reporter colour to red
    $('#bug-report .imgContainer').toggleClass('red');
    // rotate and fadin in bug-reporter
    $('.ov-bugReporter').toggleClass('show');
    
  });

  /**
   * Bug reporting submissions in projects
   */
  $('#bugReporter').submit(function(evt) {
    evt.preventDefault();
    console.log('new Bug Submitted!');

    // do validations here....
    const data = {
      sender: $('#ov-bug-name').val(),
      email: $('#ov-bug-email').val(),
      bugDescription: $('#ov-bug-message').val(),
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
      $('#ov-bug-name').val('');
      $('#ov-bug-email').val('');
      $('#ov-bug-message').val('');
      
      showToast('bug','success', successMessage);
    }).fail(function() {
      const errorMessage = `We encontered an error, please try again later!`;

      showToast('bug','error', errorMessage);
    });
  });

  function showToast(section, status, message) {
    const target = $(`#ov-${section}Toast`);
    
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
})();