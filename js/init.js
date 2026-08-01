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

// Standard Konami sequence, with Enter used as the final Start key.
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
      document.body.classList.add('barrel-roll');
      setTimeout(function() {
        var rand = Math.random();
        if (rand < 0.1) {
          alert("A barrel roll has occurred. Please refer to the Wii Operations Manual for help troubleshooting.");
        } else if (rand < 0.2) {
          alert("You cannot install Wii WADs on Doom.");
        } else {
          alert("You really are that bored, aren't you?");
        }
        document.body.classList.remove('barrel-roll');
      }, 1000);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
