// JavaScript Document
var defaultPage = 2;
var prevPage, prevPrevPage;

const PAGE_NAMES = ['designer', 'developer', 'mentor'];

$(document).ready( function() {
	switchPage(defaultPage);
	//updateParallax();
  $('#nav-menu-text').html(PAGE_NAMES[defaultPage]);
});

//Called whenever an iframe opens a new page
function iframeLoad(elem) {
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
}
function iframeLoaded() {
	$('#top-bar-normal').removeClass('hidden');
	$('#top-bar-return').addClass('hidden');
}

$(document).on('click', function() {
	hidePopups();
});


function showDd() {
	$('#nav-dd').removeClass('hidden');
}

function hidePopups() {
	$('#nav-dd').addClass('hidden');
}

function switchPage(num) {
	//Ignore if trying to switch to the page we're already on or switching to
	if (num == prevPage) return;

	lower = Math.min(prevPage, num);
	upper = Math.max(prevPage, num);

	e = $('#page'+prevPage);
	$(e).css('z-index','2');


	e = $('#page'+num);
	$(e).removeClass('hidden');
	$(e).css('transition-duration','0s');
	$(e).css('z-index','1');
	$(e).css('transform', '');

	e = $('#iframe'+num);
	$(e).prop('src', $(e).data('src'));

	prevOpt=$('#nav-dd-option'+prevPage);
	thisOpt=$('#nav-dd-option'+num);
	$(prevOpt).css('order', '2');
	$(thisOpt).css('order', '1');

	thisOptText= $(thisOpt).text().trim();
	$('#nav-menu-text').html(thisOptText);

	$(':root').css('--accent-color', 'var(--page-accent'+num+')');

	prevPrevPage = prevPage;

	prevPage = num;

	setTimeout(switchPageDeferred, 10);
	ignoreIframeChanges = true;
}
function switchPageDeferred() {
	e = $('#page'+prevPrevPage);

	$(e).css('transition-duration','1s');
	$(e).css('transform', 'translate(100vw)');
	setTimeout(switchPageDone, 1000);
}
function switchPageDone() {
	e = $('#page'+prevPrevPage);
	$(e).addClass('hidden');
	$(e).css('z-index','1');
	$(e).prop('src', '');
}