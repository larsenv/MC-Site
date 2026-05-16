document.addEventListener('DOMContentLoaded', function() {
  // Initialize Sidenav
  var sidenavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavElems);
  
  // Initialize Parallax
  var parallaxElems = document.querySelectorAll('.parallax');
  M.Parallax.init(parallaxElems);
});
