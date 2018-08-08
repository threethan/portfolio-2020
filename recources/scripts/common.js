// JavaScript Document
var PAGE_MAX = 2;
var prevPage = 0;

$(document).ready( function() {
	for (var i=0; i<=PAGE_MAX; i++) {
		$("#page"+i).css("transform","translateX("+ (i)*100 +"vw)");
	}
});

$(document).on('click', hidePopups);

function showDd() {
	$("#nav-dd").removeClass("hidden");
}

function hidePopups() {
	$("#nav-dd").addClass("hidden");
}

function switchPage(num) {
	lower = Math.min(prevPage, num);
	upper = Math.max(prevPage, num);

	for (var i=lower; i<=upper; i++) {
		$("#page"+i).css("transition-duration","1s");
		$("#page"+i).css("transform","translateX("+ (i-num)*100 +"vw)");
	}
	prevOpt=$("#nav-dd-option"+prevPage);
	thisOpt=$("#nav-dd-option"+num);
	$(prevOpt).css("order", "2");
	$(thisOpt).css("order", "1");


	thisOptText= $(thisOpt).text().trim();
	$("#nav-menu-text").html(thisOptText);

	prevPage=num;

}
