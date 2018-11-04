$(document).ready(function(){

  function landingParallax() {
    var scrollTop = $(window).scrollTop();
    var photoBottom = scrollTop - scrollTop/3
    $("#landing-photo-container").css('bottom', photoBottom+'px');
  }

  // https://stackoverflow.com/questions/38360676/get-the-element-which-is-the-most-visible-on-the-screen
  function getMostVisible( $elements ) {
      var $element = $(),
          viewportHeight = $( window ).height(),
          max = 0;
      $elements.each( function() {
          var visiblePx = getVisibleHeightPx( $( this ), viewportHeight );
          if ( visiblePx > max ) {
              max = visiblePx;
              $element = $( this );
          }
      } );
      return $element;
  }

  // https://stackoverflow.com/questions/38360676/get-the-element-which-is-the-most-visible-on-the-screen
  function getVisibleHeightPx( $element, viewportHeight ) {
      var rect = $element.get( 0 ).getBoundingClientRect(),
          height = rect.bottom - rect.top,
          visible = {
              top: rect.top >= 0 && rect.top < viewportHeight,
              bottom: rect.bottom > 0 && rect.bottom < viewportHeight
          },
          visiblePx = 0;
      if ( visible.top && visible.bottom ) {
          // Whole element is visible
          visiblePx = height;
      } else if ( visible.top ) {
          visiblePx = viewportHeight - rect.top;
      } else if ( visible.bottom ) {
          visiblePx = rect.bottom;
      } else if ( height > viewportHeight && rect.top < 0 ) {
          var absTop = Math.abs( rect.top );
          if ( absTop < height ) {
              // Part of the element is visible
              visiblePx = height - absTop;
          }
      }
      return visiblePx;
  }

  function updateNavTracker( $mostVisibleSection ) {
    if ($mostVisibleSection.is($('#landing-container'))) {
      if ($('#nav-tracker').css('top') != '40px') {
        $('#nav-tracker').css('top', '40px');
      }
    }
    else if ($mostVisibleSection.is($('#education-container'))) {
      if ($('#nav-tracker').css('top') != '125px') {
        $('#nav-tracker').css('top', '125px');
      }
    }
    else if ($mostVisibleSection.is($('#projects-container'))) {
      if ($('#nav-tracker').css('top') != '210px') {
        $('#nav-tracker').css('top', '210px');
      }
    }
    else if ($mostVisibleSection.is($('#contact-container'))) {
      if ($('#nav-tracker').css('top') != '295px') {
        $('#nav-tracker').css('top', '295px');
      }
    }
  }

  /*** Start projects scrolling functionality ***/
  function scrollProjectsListUp() {
    var bottomVal = $('#projects-list-container-inner').css('bottom');
    bottomVal = parseInt(bottomVal.slice(0, bottomVal.indexOf('px')));
    if (bottomVal < 0) {
      var topVal = $('#projects-list-container-inner').css('top');
      var newTopVal = parseInt(topVal.slice(0, topVal.indexOf('px'))) - 2;
      var newTopValStr = newTopVal + 'px';
      $('#projects-list-container-inner').css('top', newTopValStr);
      checkScrollArrowsNeeded();
    }
  }

  function scrollProjectsListDown() {
    var topVal = $('#projects-list-container-inner').css('top');
    topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
    if (topVal < 0) {
      topVal = $('#projects-list-container-inner').css('top');
      var newTopVal = parseInt(topVal.slice(0, topVal.indexOf('px'))) + 2;
      var newTopValStr = newTopVal + 'px';
      $('#projects-list-container-inner').css('top', newTopValStr);
    }
    checkScrollArrowsNeeded();
  }

  function checkScrollArrowsNeeded() {
    var topVal = $('#projects-list-container-inner').css('top');
    topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
    if (topVal < 0) {
      $('#projects-list-scroll-down').show();
    }
    else {
      $('#projects-list-scroll-down').hide();
    }
    var bottomVal = $('#projects-list-container-inner').css('bottom');
    bottomVal = parseInt(bottomVal.slice(0, bottomVal.indexOf('px')));
    if (bottomVal < 0) {
      $('#projects-list-scroll-up').show();
    }
    else {
      $('#projects-list-scroll-up').hide();
    }
  }

  /*** End projects scrolling functionality ***/


  /*** Projects functionality ***/

  function isVideo(fileStr) {
    ext = fileStr.slice(fileStr.indexOf('.')+1);
    return (ext.trim() === "mp4");
  }


  $(window).scroll(function(){
    landingParallax();
    updateNavTracker(getMostVisible($('.section-container')));
  });

  $('#nav-home-icon').click(function (e) {
      $('html, body').animate({
          scrollTop: $('#landing-container').offset().top
      }, 'slow');
  });

  $('#nav-education-icon').click(function (e) {
      $('html, body').animate({
          scrollTop: $('#education-container').offset().top
      }, 'slow');
  });

  $('#nav-projects-icon').click(function (e) {
      $('html, body').animate({
          scrollTop: $('#projects-container').offset().top
      }, 'slow');
  });

  $('#nav-contact-icon').click(function (e) {
      $('html, body').animate({
          scrollTop: $('#contact-container').offset().top
      }, 'slow');
  });


  /*** Start projects scrolling functionality ***/
  var repeater;
  $('#projects-list-scroll-up').hover(
    function() {
      var bottomVal = $('#projects-list-container-inner').css('bottom');
      bottomVal = parseInt(bottomVal.slice(0, bottomVal.indexOf('px')));
      if (bottomVal < 0) {
        repeater = setInterval(function() {scrollProjectsListUp()}, 10)
      }
    }, function() {
      clearInterval(repeater);
    }
  );
  $('#projects-list-scroll-down').hover(
    function() {
      var topVal = $('#projects-list-container-inner').css('top');
      topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
      if (topVal < 0) {
        repeater = setInterval(function() {scrollProjectsListDown()}, 10)
      }
    }, function() {
      clearInterval(repeater);
    }
  );

  $('#projects-list-scroll-up').click(function() {
    var bottomVal = $('#projects-list-container-inner').css('bottom');
    bottomVal = parseInt(bottomVal.slice(0, bottomVal.indexOf('px')));
    checkForOverScroll = false;
    if (bottomVal < 0) {
      if (bottomVal < -300) {
        var bottomValStr = "-=300";
      }
      else {
        checkForOverScroll = true;
        var topVal = $('#projects-list-container-inner').css('top');
        topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
        topValStr = (topVal + bottomVal) + "";
        var bottomValStr = topValStr;
      }
      $('#projects-list-container-inner').stop(true,true).animate({
        top: bottomValStr,
      }, 200, function() {
        if (checkForOverScroll) {
          bottomVal = $('#projects-list-container-inner').css('bottom');
          bottomVal = parseInt(bottomVal.slice(0, bottomVal.indexOf('px')));
          if (bottomVal > 0) {
            var topVal = $('#projects-list-container-inner').css('top');
            topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
            topValStr = (topVal + bottomVal) + "px";
            $('#projects-list-container-inner').css('top', topValStr);
          }
        }
        checkScrollArrowsNeeded();
      });
    }
  });

  $('#projects-list-scroll-down').click(function() {
    var topVal = $('#projects-list-container-inner').css('top');
    topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
    checkForOverScroll = false;
    if (topVal < 0) {
      if (topVal < -300) {
        var topValStr = "+=300";
      }
      else {
        checkForOverScroll = true;
        var topValStr = "0";
      }
      $('#projects-list-container-inner').stop(true,true).animate({
        top: topValStr,
      }, 200, function() {
        if (checkForOverScroll) {
          topVal = $('#projects-list-container-inner').css('top');
          topVal = parseInt(topVal.slice(0, topVal.indexOf('px')));
          if (topVal > 0) {
            $('#projects-list-container-inner').css('top', '0px');
          }
        }
        checkScrollArrowsNeeded();
      });
    }
  });

  $('.projects-list-item').click(function() {
    var newTop = $(this).position().top + $(this).height()/2;
    var fileName = $(this).data('file');
    $('html, body').animate({
        scrollTop: $('#projects-container').offset().top
    }, 'slow');
    $('#projects-list-focused-arrow').stop(true,true).animate({
      top: newTop,
    }, 200);
    $("#projects-details-container-swappable").stop(true, true).fadeOut("slow", function() {
        // $('#projects-details-container-inner').html('<object type="text/html" data="projects/give-grow.html"></object>');
        // $('#projects-details-container-inner').load("projects/give-grow.html #projects-details-container-swappable");
        $('#projects-details-container-inner').load("projects/" + fileName + " #projects-details-container-swappable", function() {
          $('#projects-details-phone-screen[data-img-list]').each(function(){
            if (isVideo($(this).data('imgList')[0])) {
              $("#projects-details-phone-video").attr('src', "images/project-screens/" + $(this).data('imgList')[0]);
              $("#projects-details-phone-video").show();
            }
            else {
              $(this).css('background-image', "url('images/project-screens/" + $(this).data('imgList')[0] + "')");
              $("#projects-details-phone-video").hide();
            }
          });
          $('#projects-details-phone-screen-horizontal[data-img-list]').each(function(){
            if (isVideo($(this).data('imgList')[0])) {
              $("#projects-details-phone-video-horizontal").attr('src', "images/project-screens/" + $(this).data('imgList')[0]);
              $("#projects-details-phone-video-horizontal").show();
            }
            else {
              $(this).css('background-image', "url('images/project-screens/" + $(this).data('imgList')[0] + "')");
              $("#projects-details-phone-video-horizontal").hide();
            }
          });
          $('#projects-details-laptop-screen[data-img-list]').each(function(){
            if (isVideo($(this).data('imgList')[0])) {
              $("#projects-details-laptop-video").attr('src', "images/project-screens/" + $(this).data('imgList')[0]);
              $("#projects-details-laptop-video").show();
            }
            else {
              $(this).css('background-image', "url('images/project-screens/" + $(this).data('imgList')[0] + "')");
              $("#projects-details-laptop-video").hide();
            }
          });

        });
        $("#projects-details-container-swappable").fadeIn("slow");
      });
  });

  // setInterval(function() {scrollProjectsListUp()}, 100)
  // $('#projects-container').html('<object type="text/html" data="test.html"></object>');

  /*** End projects scrolling functionality ***/

  /*** Run on ready ***/

  $('.projects-list-item-image[data-img-path]').each(function(){
    $(this).css('background-image', "url('images/project-preview/" + $(this).data('imgPath') + "')");
  });

  $('#projects-details-phone-screen[data-img-list]').each(function(){
    if (isVideo($(this).data('imgList')[0])) {
      $("#projects-details-phone-video").attr('src', "images/project-screens/" + $(this).data('imgList')[0]);
      $("#projects-details-phone-video").show();
    }
    else {
      $(this).css('background-image', "url('images/project-screens/" + $(this).data('imgList')[0] + "')");
      $("#projects-details-phone-video").hide();
    }
  });

  $('#projects-details-phone-screen-horizontal[data-img-list]').each(function(){
    if (isVideo($(this).data('imgList')[0])) {
      $("#projects-details-phone-video-horizontal").attr('src', "images/project-screens/" + $(this).data('imgList')[0]);
      $("#projects-details-phone-video-horizontal").show();
    }
    else {
      $(this).css('background-image', "url('images/project-screens/" + $(this).data('imgList')[0] + "')");
      $("#projects-details-phone-video-horizontal").hide();
    }
  });

  $('#projects-details-laptop-screen[data-img-list]').each(function(){
    if (isVideo($(this).data('imgList')[0])) {
      $("#projects-details-laptop-video").attr('src', "images/project-screens/" + $(this).data('imgList')[0]);
      $("#projects-details-laptop-video").show();
    }
    else {
      $(this).css('background-image', "url('images/project-screens/" + $(this).data('imgList')[0] + "')");
      $("#projects-details-laptop-video").hide();
    }
  });

});
