// JavaScript Document
var defaultPage = 0;
var prevPage, prevPrevPage;

const PAGE_NAMES = ['designer', 'developer', 'mentor'];

$(document).ready( function() {
	switchPage(defaultPage);
	//updateParallax();
  $('#nav-menu-text').html(PAGE_NAMES[defaultPage]);

  updateSbWidth();
  try {
    parent.goBack(redir=false);
  } catch {
    console.log('Call to parent blocked by browser\'s xss policy. Happens on chrome if running from file.');
  }
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
function updateSbWidth() {}

//Called whenever an iframe opens a new page
// function iframeLoad(elem) {
// 	try {
// 		e = document.getElementById('iframe'+prevPage)
// 		if (e) { //Ingore it running on a null element on initial load
// 			//Will fail if url is from another site
// 			x = e.contentWindow.location.href
// 			|| e.contentDocument.location.href;
// 		}
// 	}
// 	catch {
// 	 	$('#top-bar-normal').addClass('hidden');
// 		$('#top-bar-return').removeClass('hidden');
// 	}
// }
// function goBack(redir=true) {
// 	if (redir) document.getElementById('iframe'+prevPage).src = $('#iframe'+prevPage).data('src');
// 	$('#top-bar-normal').removeClass('hidden');
// 	$('#top-bar-return').addClass('hidden');
// 	ignoreIframeChanges = true;
// }

$(document).on('click', function() {
	hidePopups();
});


function showDd() {
	$('#nav-dd').removeClass('hidden');
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