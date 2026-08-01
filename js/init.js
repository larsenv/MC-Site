document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing components...');
  // Initialize Sidenav
  var sidenavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavElems);
  
  // Initialize Parallax
  var parallaxElems = document.querySelectorAll('.parallax');
  M.Parallax.init(parallaxElems, {
    responsiveThreshold: 0
  });
});

var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
var konamiIndex = 0;
var _addEvent = function(obj, type, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(type, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent('on' + type, fn);
  } else {
    var old = obj['on' + type];
    obj['on' + type] = function() {
      if (old) old.apply(this, arguments);
      fn.apply(this, arguments);
    };
  }
};
_addEvent(document, 'keydown', function(e) {
  e = e || window.event;
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      window.location.href = '/snake';
    }
  } else {
    konamiIndex = 0;
  }
});
