$(document).ready( function () {
  updateSbWidth();
  parent.goBack(redir=false);
});

$(window).resize( function() {
  updateSbWidth();
});

function updateSbWidth() {
  $('#sb-test').removeClass('hidden');
  $(':root').css('--sb-width', ($('#sb-test-inner').width() - $( window ).width())+'px' );
  $('#sb-test').addClass('hidden');
}