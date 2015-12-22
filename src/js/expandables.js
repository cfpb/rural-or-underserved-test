$('.question').click (function(event) {
  //console.log(event);
  //$(this).addClass('hide');
  //$(this).siblings('.question')
    //.removeClass('hide');
  $(this).siblings('.answer').toggleClass('hide');
  if($(this).children('.cf-icon').hasClass('cf-icon-plus-round')) {
    $(this).children('.cf-icon').removeClass('cf-icon-plus-round');
    $(this).children('.cf-icon').addClass('cf-icon-minus-round');
  } else if ($(this).children('.cf-icon').hasClass('cf-icon-minus-round')) {
    $(this).children('.cf-icon').removeClass('cf-icon-minus-round');
    $(this).children('.cf-icon').addClass('cf-icon-plus-round');
  }
  //$(this).children('.cf-icon').removeClass('cf-icon-plus-round');
  event.preventDefault();
});
