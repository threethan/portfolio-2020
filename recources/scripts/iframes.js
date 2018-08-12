$(document).ready( function () {
  updateSbWidth();
  try {
    parent.goBack(redir=false);
  } catch {
    console.log('Call to parent blocked by browser\'s xss policy. Happens on chrome if running from file.');
  }
});

$(window).resize( function() {
  updateSbWidth();
});

function updateSbWidth() {
  $('#sb-test').removeClass('hidden');
  $(':root').css('--sb-width', ($('#sb-test-inner').width() - $( window ).width())+'px' );
  $('#sb-test').addClass('hidden');
}