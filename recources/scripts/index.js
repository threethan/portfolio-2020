var defaultPage = 0;
var prevPage, prevPrevPage;

const PAGE_NAMES = ['designer', 'developer', 'mentor'];

// Check for legacy versions of Internet Explorer
if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
	alert("Internet Explorer is not supported by this website. Consider using a newer browser such as Mozilla Firefox. Trust me, you won't regret it.");
}

// Setup
$(document).ready( function() {
	switchPage(defaultPage); //Display the default page
  $('#nav-menu-text').html(PAGE_NAMES[defaultPage]); //Update the dropdown indicator with the current page name

	// Interactable image setup
  $('img.pop').click( function() {
    $('#popup-img-img').prop('src', $(this).prop('src') );
    $('#popup-img-back').removeClass('no-img');
  });
  $('#popup-img-back').click( function() {
    $('#popup-img-back').addClass('no-img');
  });
});

// Opens the page selection dropdown
function showDd() {
	nddTemp = $('#nav-dd')
	$(nddTemp).removeClass('hidden');
	posTemp = $('#nav-menu-text').position();
	$(nddTemp).css("top" , posTemp.top );
	$(nddTemp).css("left", posTemp.left);
}

// Hides all pop-up menus. (Currently only the page selection dropdown)
function hidePopups() {
	$('#nav-dd').addClass('hidden');
}
$(document).on('click', function() { hidePopups(); }); //Calls hidePopups when any element is clicked

// Updates the height of the content wrapper, called on page change or window size change. (Defines the vertical scroll limit)
function updateContentHeight() {
		$('#content-wrapper').css('height', $('#page'+prevPage).height());
}
$(window).resize( function() { updateContentHeight(); }); //Calls updateContentHeight when window is resized

// Switches the currently displayed page. (Called by clicking the page select dropdown)
var isBefore;
function switchPage(num) {
	// Ignore if trying to switch to the page we're already on or switching to
	if (num == prevPage) return;

	lower = Math.min(prevPage, num);
	upper = Math.max(prevPage, num);

	isBefore = prevPage < num;

	e = $('#page'+prevPage);
	$(e).css('z-index','2');
	$(e).css('background', 'var(--page-background'+prevPage);

	e = $('#page'+num);
	$(e).css('background', '');
	$(e).removeClass('hidden');
	$(e).css('z-index','1');
	if (isBefore) $(e).css('transform', 'translate(100vw)');
	else $(e).css('transform', 'translate(-100vw)');
	$(e).css('background', '');

	e = $('#iframe'+num);
	$(e).prop('src', $(e).data('src'));

	prevOpt=$('#nav-dd-option'+prevPage);
	thisOpt=$('#nav-dd-option'+num);
	$(prevOpt).css('order', '2');
	$(thisOpt).css('order', '1');

	thisOptText= $(thisOpt).text().trim();
	$('#nav-menu-text').html(thisOptText);

	$(':root').css('--accent-color', 'var(--page-accent'+num+')');
	$(':root').css('--background', 'var(--page-background'+num+')');

	prevPrevPage = prevPage;
	prevPage = num;

	updateContentHeight();
	setTimeout(switchPageDeferred, 1);
}
// Called 1ms after switchPage, after changes are applied to the DOM
var animTimeout;
function switchPageDeferred() {
	e = $('#page'+prevPrevPage);
	if (isBefore) $(e).css('transform', 'translate(-100vw)');
	else $(e).css('transform', 'translate(100vw)')
	clearTimeout(animTimeout);
	animTimeout = setTimeout(switchPageDone, 1000);
	$('#page'+prevPage).css('transform','');
}
// Called upon completion of the page swith animation
function switchPageDone() {
	e = $('#page'+prevPrevPage);
	$(e).addClass('hidden');
	$(e).css('z-index','1');
	$(e).prop('src', '');
}
