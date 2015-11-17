module.exports = function(year, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI('data/' + year + '.json'));
  xhr.onload = function() {
    if (xhr.status === 200 && xhr.readyState == 4) {
      cb(JSON.parse(xhr.responseText));
    } else {
      cb(xhr.status);
    }
  };
  xhr.send();
};
