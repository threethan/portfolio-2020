// Finds the width of the current browser's scroll bar and updates CSS to hide it
function updateSb() {
	outerWidthTemp = $('.no-scrollbar-parent').first().outerWidth();
	innerWidthTemp = $('#sb-test-inner').first().width();
	$(':root').css('--sb-width', innerWidthTemp - outerWidthTemp + 'px');
}

// Calls updateSb when needed
$(document).ready( function() { updateSb(); }); //On page load
$(window).resize(  function() { updateSb(); }); //On resize
