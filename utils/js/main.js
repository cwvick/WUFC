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
    var $palyerImg = $('.section_01 div[class^="player_"] img');
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

  var setFlashlight = function() {
    var lightsVariation = 3;
    var lightsAmount = 220;
    var content = '';
    var minTop = 432, maxTop = 643, minLeft = 5, maxLeft = $(window).width(), minTop2 = 320, maxTop2 = 460, minLeft2 = 260;

    for (i = 0; i < lightsAmount; i++) {
      var lightNum = Math.floor(Math.random()*lightsVariation) + 1;
      var lightTop = Math.random() * (maxTop - minTop) + minTop;
      var lightLeft = Math.random() * (maxLeft - minLeft) + minLeft;

      if ( i % 2 && ( i > 20 || i < 200 ) ) {
        lightTop = Math.random() * (maxTop2 - minTop2) + minTop2;
        lightLeft = Math.random() * (maxLeft - minLeft2) + minLeft2;
      }
      content += '<div class="flashlight flashlight_0' + lightNum + '" style="top: ' + lightTop + 'px; left: ' + lightLeft + 'px;"></div>';
    }

    $('.section_01 .bg').append(content);
    lightsAnimation(lightsAmount, 0);
  };

  var lightsAnimation = function(amount, lightNum) {
    if ( lightNum < amount ) {
      $('.section_01 .bg .flashlight').eq(lightNum).fadeIn('fast', function() {
        lightsAnimation(amount, lightNum+1);
        
        setTimeout(function() {
          $('.section_01 .bg .flashlight').eq(lightNum).hide();
        }, 1000);
      });
    } else {
      lightsAnimation(amount, 0);
    }
  };

  var setPageScroll = function() {
    $('.main').onepage_scroll({
      sectionContainer: 'div[class^="section_"]',
      pagination: false,
      afterMove: function(index) {
        if ( index == 1 ) {
          $('.btn_backTop').hide();
        } else {
          $('.btn_backTop').show();
          sideMenuHandler('open');
        }
        menuArrowHandler(index);
      }
    });
  };

  var initUI = function() {
    sideMenuHandler('close');
    if ( $(window).width() < 800) {
      // 
    } else {
      console.log( $(window).width());
      playerAnimation();
      setFlashlight();
      setPageScroll();
    }
  };

  initUI();

  $(window).load(function() {
    $('body, html').scrollTop(0);

    if ( $(window).width() >= 800 && !$('.section_01 .player_01').is(':visible') && !$('.section_01 .player_02').is(':visible') && !$('.section_01 .player_03').is(':visible') ) {
      $('.section_01 .player_03').fadeIn('slow', function() {
        $('.section_01 .player_02').fadeIn('slow', function() {
          $('.section_01 .player_01').fadeIn('slow');
        });
      });
    }
  });

  $(window).resize(function() {
    var winWidth = $(window).width();

    if ( (winWidth < 800 && $('.onepage-wrapper').length > 0) || winWidth >= 800 && $('.onepage-wrapper').length == 0 ) {
      location.reload();
    }
  });
});