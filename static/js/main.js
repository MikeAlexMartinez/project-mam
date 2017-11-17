/* eslint-disable */

$(document).ready(function runJq() {
  
  // register click listeners for nav bar elements
  $('.nav-item').click((evt) => {

    // Set 'scroll to' Target
    const target = evt.currentTarget.id.replace('nav-','');
    const scrollTo = $(`#${target}`);    

    // Amend classes of nav options
    $('.nav-item').removeClass('active');
    $(evt.currentTarget).addClass('active');
    
    // identify container of scroll bar
    const container = $('.main-content');
    console.log(scrollTo);
    
    // Scroll
    container.animate({
      scrollTop: scrollTo.offset().top 
        - container.offset().top 
        + container.scrollTop()
    }, 1000);
  });

});
