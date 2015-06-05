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

  $(document).on('click', '.btn_arrow', function(event) {
    event.preventDefault();
    if ( $(this).hasClass('open') ) {
      sideMenuHandler('open');
    } else if ( $(this).hasClass('close') ) {
      sideMenuHandler('close');
    }
  });

  $(document).on('click', '.wrapper .down', function(event) {
    event.preventDefault();
    var e = $.Event("keydown");
    e.which = 34;
    e.keyCode = 34;
    $("body").trigger(e);
  }); 

  var sideMenuHandler = function(action) {
    var menubox_width = $('.menubox').outerWidth();
    if ( action == 'close' ) {
      $('.wrap').animate({
        left: -menubox_width + 'px'
      }, 500, function() {
        $('.btn_arrow').removeClass('close').addClass('open');
      });
    } else if ( action == 'open' ) {
      $('.wrap').animate({
        left: 0
      }, 500, function() {
         $('.btn_arrow').removeClass('open').addClass('close');
      });
    }

  };

  var playerAnimation = function() {
    $('.section_01 .player_03').fadeIn('slow', function() {
      $('.section_01 .player_02').fadeIn('slow', function() {
        $('.section_01 .player_01').fadeIn('slow');
      });
    });
  };

  var initUI = function() {
    sideMenuHandler('close');
    playerAnimation();
  };

  initUI();

  $('.main').onepage_scroll({
    sectionContainer: 'div[class^="section_"]',
    pagination: false
  });

  $(window).load(function() {
    $('body, html').scrollTop(0);
  });
});