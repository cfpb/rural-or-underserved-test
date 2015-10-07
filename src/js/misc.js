var $ = require('jquery');
var render = require('./render');

// add inputs
$('#add-another').click(function(e) {
  e.preventDefault();
  inputCnt ++;

  // remove the link if we have 10 inputs
  if (inputCnt === 10) {
    $('#add-another').remove();
  }

  if ($('#address' + inputCnt).val() === '') {
    $('#address' + inputCnt).addClass('error');
  } else {
    $('#address' + inputCnt).removeClass('error');
  }

  // clone and add input
  $('#address1').clone(true)
    .appendTo('.input-container')
    .attr('id', 'address' + inputCnt)
    .val('')
    .focus();
});

// about click
$('#link-about').click(function(e) {
  e.preventDefault();
  // clear remove inputs, except the first one
  render.clearTextInputs();
  render.clearFileInput();
  render.showAbout();
});

// input blur
$('.input-address').blur(function(e) {
  if ($(this).val() === '') {
    $(this).addClass('error');
  } else {
    $(this).removeClass('error warning');
  }
});

// print
$('#print').click(function() {
    window.print();
});