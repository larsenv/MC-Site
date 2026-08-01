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

// Up Down Up Down Left Right Left Right B A Start(Enter)
const konamiCode = [38, 40, 38, 40, 37, 39, 37, 39, 66, 65, 13];
let konamiIndex = 0;
document.addEventListener('keydown', function(e) {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      document.body.classList.add('barrel-roll');
      setTimeout(function() {
        const rand = Math.random();
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
