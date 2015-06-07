$(function() {
	$(document).on('click', '.btn_backTop', function(event) {
		event.preventDefault();
    $('.main').moveTo(1);
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
    $('.main').moveDown();
  });

  $(document).on('click', '.menubox ul li', function(event) {
    event.preventDefault();
    var index = $('.menubox ul li').index($(this)) + 2;
    $('.main').moveTo(index);
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
    var $palyerImg = $('.section_01 div[class^="player_"] img')
    var img_amount  = $palyerImg.length;
    var count = 0;

    $palyerImg.parent().hide();

    $palyerImg.load(function() {
      count++;
      if ( count == img_amount ) {
        $('.section_01 .player_03').fadeIn('slow', function() {
          $('.section_01 .player_02').fadeIn('slow', function() {
            $('.section_01 .player_01').fadeIn('slow');
          });
        });
      }
    });
  };

  var menuArrowHandler = function(index) {
    $('.menubox ul li .triangle').removeClass('show');
    if ( index >= 2 ) {
      $('.menubox ul li').eq(index-2).find('.triangle').addClass('show');
    }    
  };

  var initUI = function() {
    sideMenuHandler('close');
    playerAnimation();
  };

  initUI();

  $('.main').onepage_scroll({
    sectionContainer: 'div[class^="section_"]',
    pagination: false,
    afterMove: function(index) {
      if ( index == 1 ) {
        $('.btn_backTop').hide();
      } else {
        $('.btn_backTop').show();
      }
      menuArrowHandler(index);
    }
  });

  $(window).load(function() {
    $('body, html').scrollTop(0);
  });
});