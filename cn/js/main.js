$(function() {

	// Back to top
  $(window).scroll(function(event) {
    if ( $(this).scrollTop() >= 400 ) {
      $('.btn_backTop').show();
    } else {
      $('.btn_backTop').hide();
    }
  });

	$(document).on('click', '.btn_backTop', function(event) {
		event.preventDefault();
    $('body, html').animate({
      scrollTop: 0
    },200);
	});
	
});