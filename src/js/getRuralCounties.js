module.exports = function(year, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI('data/' + year + '.json'));
  xhr.onload = function() {
    console.log(xhr.readyState);
    if (xhr.status === 200 && xhr.readyState == 4) {
      var counties = JSON.parse(xhr.responseText);
      cb(counties);
    } else {
      cb(xhr.status);
    }
  };
  xhr.send();
};
