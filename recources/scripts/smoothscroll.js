var scrollTarget = 0;

$(window).on('mousewheel DOMMouseScroll', function(e) {
  var amt = 0;

  if(e.type === 'mousewheel') { //This will be false on mobile or if already scrolling smoothly
    sTop = $('.no-scrollbar-child').prop('scrollTop');

    if (scrollTarget > sTop) scrollTarget = sTop;
    amt = e.originalEvent.wheelDelta*-0.3;
    scrollTarget += amt;
    if (scrollTarget < 0) scrollTarget=0;

    $('.no-scrollbar-child').prop('scrollTop', sTop-(sTop-scrollTarget)*0.1); //Avoid stutter
    $('.no-scrollbar-child').stop().animate({
      scrollTop: scrollTarget
    },500, 'easeOutQuart');
    e.preventDefault();
  }
});
