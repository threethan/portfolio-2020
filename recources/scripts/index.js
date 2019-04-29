// JavaScript Document
var defaultPage = 0;
var prevPage, prevPrevPage;

const PAGE_NAMES = ['designer', 'developer', 'mentor'];

if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
	alert("Internet Explorer is not supported by this website. Consider using a newer browser such as Mozilla Firefox. Trust me, you won't regret it.");
}

$(document).ready( function() {
	switchPage(defaultPage);
	//updateParallax();
  $('#nav-menu-text').html(PAGE_NAMES[defaultPage]);

  updateSbWidth();

  $('img.pop').click( function() {
    $('#popup-img-img').prop('src', $(this).prop('src') );
    $('#popup-img-back').removeClass('no-img');
  });
  $('#popup-img-back').click( function() {
    $('#popup-img-back').addClass('no-img');
  });
});

$(window).resize( function() {
  updateSbWidth();
});
function updateSbWidth() {
	outerWidthTemp = $('.no-scrollbar-parent').first().outerWidth();
	innerWidthTemp = $('#sb-test-inner').first().width();
	$(':root').css('--sb-width', innerWidthTemp - outerWidthTemp + 'px');

}

//[OLD] Called whenever an iframe opens a new page
/* function iframeLoad(elem) {
	try {
		e = document.getElementById('iframe'+prevPage)
		if (e) { //Ingore it running on a null element on initial load
			//Will fail if url is from another site
			x = e.contentWindow.location.href
			|| e.contentDocument.location.href;
		}
	}
	catch {
	 	$('#top-bar-normal').addClass('hidden');
		$('#top-bar-return').removeClass('hidden');
	}
}
function goBack(redir=true) {
	if (redir) document.getElementById('iframe'+prevPage).src = $('#iframe'+prevPage).data('src');
	$('#top-bar-normal').removeClass('hidden');
	$('#top-bar-return').addClass('hidden');
	ignoreIframeChanges = true;
} */

$(document).on('click', function() {
	hidePopups();
});


function showDd() {
	nddTemp = $('#nav-dd')
	$(nddTemp).removeClass('hidden');
	posTemp = $('#nav-menu-text').position();
	$(nddTemp).css("top" , posTemp.top );
	$(nddTemp).css("left", posTemp.left);
}

function hidePopups() {
	$('#nav-dd').addClass('hidden');
}

var isBefore;
function switchPage(num) {
	//Ignore if trying to switch to the page we're already on or switching to
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

	$('#content-wrapper').css('height', $('#page'+num).height());

	setTimeout(switchPageDeferred, 1);
}
var animTimeout;
function switchPageDeferred() {
	e = $('#page'+prevPrevPage);
	if (isBefore) $(e).css('transform', 'translate(-100vw)');
	else $(e).css('transform', 'translate(100vw)')
	clearTimeout(animTimeout);
	animTimeout = setTimeout(switchPageDone, 1000);
	$('#page'+prevPage).css('transform','');
}
function switchPageDone() {
	e = $('#page'+prevPrevPage);
	$(e).addClass('hidden');
	$(e).css('z-index','1');
	$(e).prop('src', '');
}
