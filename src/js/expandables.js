$('.question').click (function(event) {
  $(this).addClass('hide');
  $(this).siblings('.question')
    .removeClass('hide');
  $(this).siblings('.answer').toggleClass('hide');
  event.preventDefault();
});
