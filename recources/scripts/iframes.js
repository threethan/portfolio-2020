$(document).ready( function () {
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

function updateSbWidth() {
  $('#sb-test').removeClass('hidden');
  $(':root').css('--sb-width', ($('#sb-test-inner').width() - $( window ).width())+'px' );
  $('#sb-test').addClass('hidden');
}