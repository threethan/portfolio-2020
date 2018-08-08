var prevFirstScroll = -1;
var plCurTimout = 0;
var plCurTicker = 0;
const PARALLAX_TIMEOUT = {
	min: 16, maxOffset: 1600, tickDelay: 200, step: 10
}

$(document).ready( function() {
	updateParallaxMeta();
  updateSbWidth();
});

function updateSbWidth() {
  $('#sb-test').removeClass('hidden');
  $(':root').css('--sb-width', ($('#sb-test-inner').width() - $('#sb-test').width())+'px' );
  $('#sb-test').addClass('hidden');
}

function updateParallaxMeta() {
	var thisFirstScroll = $('.parallax').first().offset().top;
	if (prevFirstScroll != thisFirstScroll) {
		updateParallax();
		prevFirstScroll = thisFirstScroll;
		plCurTimout = 0;
		plCurTicker = 0;
	}
	setTimeout(updateParallaxMeta, plCurTimout + PARALLAX_TIMEOUT.min);
	if (plCurTicker < PARALLAX_TIMEOUT.tickDelay) plCurTicker++;
	else plCurTimout += PARALLAX_TIMEOUT.step;
	if (plCurTimout > PARALLAX_TIMEOUT.maxOffset) plCurTimout = PARALLAX_TIMEOUT.maxOffset;
}
function updateParallax() {
	$('.parallax').each( function() {
		elem = this;
		screenSpacePos = $(elem).offset().top + $(elem).height()/2;
		displayPos = screenSpacePos-window.innerHeight/2;
		displayPos /= window.innerWidth;
		displayPos *= parseFloat($(elem).data('px'));
		displayPos *= 10;
		$(elem).css('top', $(elem).data('top') + displayPos +'vw');
	});
  updateArrow();
}

var arrowStart, arrowFinish;

function updateArrow() {
  arrowStart = $('#header').height();
  arrowFinish = $(window).height() - 500;
  newPos = arrowStart + 130;
  newPos += (arrowFinish-arrowStart)*((-prevFirstScroll)/12000);

  $('#sa-line').css('height', newPos+'px');
  $('#sa-arrow').css('top', newPos+'px');
}
