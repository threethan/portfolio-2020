// JavaScript Document
var defaultPage = 2;
var prevPage = defaultPage;
var countNextIframeLoad;

var iframesThatHaveLoaded = [];
//TODO ignore the initial loading of each iframe

const PAGE_NAMES = ['designer', 'developer', 'mentor'];

$(document).ready( function() {
	//Some redundant code here...
	 for (i=0; i<PAGE_NAMES.length; i++) {
 		$('#page'+i).css('transform','translateX('+ ((i-defaultPage)*100) +'vw');
	}
	switchPage(defaultPage);
	//updateParallax();
  $('#nav-menu-text').html(PAGE_NAMES[defaultPage]);
});

//Called whenever an iframe opens a new page
function iframeLoad(elem) {
	if (iframesThatHaveLoaded.includes(elem)) {
		$('#top-bar-normal').addClass('hidden');
		$('#top-bar-return').removeClass('hidden');

		index = iframesThatHaveLoaded.indexOf(elem);
		iframesThatHaveLoaded.splice(index, 1);
	} else {
		iframesThatHaveLoaded.push(elem);
	}
}

function goBack(redir=true) {
	if (redir) document.getElementById('iframe'+prevPage).src = $('#iframe'+prevPage).prop('src');
	$('#top-bar-normal').removeClass('hidden');
	$('#top-bar-return').addClass('hidden');
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
	lower = Math.min(prevPage, num);
	upper = Math.max(prevPage, num);

	for (i=lower; i<=upper; i++) {
		$('#page'+i).css('transition-duration','1s');
		$('#page'+i).css('transform','translateX('+ ((i-num)*100) +'vw)');
	}

	prevOpt=$('#nav-dd-option'+prevPage);
	thisOpt=$('#nav-dd-option'+num);
	$(prevOpt).css('order', '2');
	$(thisOpt).css('order', '1');


	thisOptText= $(thisOpt).text().trim();
	$('#nav-menu-text').html(thisOptText);

	$(':root').css('--accent-color', 'var(--page-accent'+num+')');

	countNextIframeLoad = 1;
	prevPage = num;
}