var prevFirstScroll = -1;
var plCurTimout = 0;
var plCurTicker = 0;
// const PARALLAX_TIMEOUT = {
// 	min: 16, maxOffset: 1600, tickDelay: 200, step: 10
// }
const PARALLAX_TIMEOUT = {
	min: 16, maxOffset: 16, tickDelay: 200, step: 10
}

curScale = 1;
TARGET_WIDTH = 1000; //Page will be scaled to roughly this many pixels wide if screen can accomodate
reScale();

$(document).ready( function() {

	$('*').bind('dragstart', function() {
		return false;
	});
	updateParallaxMeta();
	updateSbWidth();
	arrowResize();
});

$(window).resize( function() {
	reScale();
	arrowResize();
});

function reScale() {
	newWidth = TARGET_WIDTH
	if (newWidth > window.innerWidth) newWidth = window.innerWidth;
	curScale = String(newWidth/window.innerWidth)
	$(':root').css('--design-scale-amount', curScale);
}

function updateSbWidth() {
  $('#sb-test').removeClass('hidden');
  $(':root').css('--sb-width', ($('#sb-test-inner').width() - $( window ).width())+'px' );
  $('#sb-test').addClass('hidden');
}

function updateParallaxMeta() {
	var thisFirstScroll = $('.parallax').first().offset().top;
	//Update parallax if scroll has actually changed
	if (prevFirstScroll != thisFirstScroll) {
		updateParallax();
		prevFirstScroll = thisFirstScroll;
		plCurTimout = 0;
		plCurTicker = 0;
	}
	//Update arrow if its the correct tick, increment counter if not
	if (arrowTickCount >= ARROW_TICKS) {
		arrowTickCount = 0;
		updateArrow();
	} else arrowTickCount++;
	setTimeout(updateParallaxMeta, plCurTimout + PARALLAX_TIMEOUT.min);
	if (plCurTicker < PARALLAX_TIMEOUT.tickDelay) plCurTicker++;
	else plCurTimout += PARALLAX_TIMEOUT.step;
	if (plCurTimout > PARALLAX_TIMEOUT.maxOffset) plCurTimout = PARALLAX_TIMEOUT.maxOffset;
}

var arrowTickCount = 99;
const ARROW_TICKS = 0;
/*ARROW_TICKS: The amount of parallax ticks between updating the arrow.
0 = update every tick */
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

}

const ARROW_BOTTOM_OFFSET = 25;
/* ARROW_BOTTOM_OFFSET: The distance from the top of the footer of
the lowest position the arrow tip will snap to */
var bottomBaked, topOffset, pageBottom, headerHeight;
function arrowResize() {
	bottomBaked = $('#footer').height()*curScale + ARROW_BOTTOM_OFFSET/curScale;
	/* This variable is just used to reduce the number of calculations every frame */
	topOffset = $(document).height()/8;
	/* topOffset: The distance from the top of the highest position on the page the arrow is allowed to go.
		Also used as the maximum distance BELOW the the 'minTip' location the arrow is allowed to go. */
	pageBottom = $('#bottom-locator').position().top - topOffset - $(window).height()/2;
	/* pageBottom: Not necessarily the bottom,
	it's used for calculating the arrow's position when it isn't snapped to anything */
	headerHeight = $('#header').height()*curScale;
	/* headerHeight: The current height of the header, used only for optimization.
	Scaled with the current page scale, so this whole function should be called AFTER rescale */
}

function updateArrow() {
	minTip = $('#header').offset().top + headerHeight + 50; //Where the arrow will snap (should be bottom of the header)
	scrollAmount = -prevFirstScroll; //May go slightly lower that zero

	scrollFraction = scrollAmount/pageBottom;
	/* scrollFractionA fractional (float) representation of how far the user has scrolled the page.
	Typically stays between 0 and 1, but slightly goes under 0 at the top and over 1 at the bottom. */

	//Set inital value, topOffset is being ignored by subtracting before & re-adding after
	arrowTip = (scrollFraction * ($(document).height() - topOffset) + topOffset);

	//Snap the tip to the footer
	if (arrowTip > $(document).height() - bottomBaked) {
		tempCap = $('#footer').offset().top - ARROW_BOTTOM_OFFSET;
	 	if (arrowTip > tempCap) arrowTip = tempCap;
	}

	//Snap to the top, with some fancy s*** to allow limited movement when snapping to the header
	if (minTip < 0) minTip = 0;
	scrollAmountTemp = scrollAmount;
	if (scrollAmountTemp < 0) {}
	else {
		if (scrollAmountTemp > topOffset) scrollAmountTemp = topOffset;
		minTip += scrollAmountTemp * 0.3;
	}
	if (arrowTip < minTip) arrowTip = minTip

	arrowHeight = arrowTip - headerHeight/2 + scrollAmount; //the length of the arrow

  $(':root').css('--sa-height', arrowHeight +'px');
	$(':root').css('--sa-top', arrowTip-arrowHeight +'px');
}
