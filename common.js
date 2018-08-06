// JavaScript Document
var PAGE_MAX = 2;
var prevPage = 0;

$(document).ready( function() {
	for (var i=0; i<=PAGE_MAX; i++) {
		$("#page"+i).css("transform","translateX("+ (i)*100 +"vw)");
	}
	updateParallax();
});

$(document).scroll(function() {
	updateParallax();
});
$(window).resize(function() {
	updateParallax();
});

function updateParallax() {
	$(".parallax").each(function() {
		vars = this.dataset.px.split(',');
		Ypos = parseInt(vars[1])/100;
		spdM = 1-parseFloat(vars[2]);

		offset = parseInt($(this).parent().css("top"));
		//offset = parseFloat(vars[3]);
		scroll = ($(window).scrollTop() / window.innerWidth) - offset;
		console.log(scroll);
		scroll *= 5;

		$(this).css("left", "calc("+parseFloat(vars[0])+"% - "+this.offsetWidth/2+"px)");
		$(this).css("top", "calc("+((scroll*spdM+Ypos))+"vw - "+this.offsetHeight/2+"px)");

	});
}

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

//Credit W3S
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}
