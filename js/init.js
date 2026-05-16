document.addEventListener('DOMContentLoaded', function() {
  var sidenavElems = document.querySelectorAll('.sidenav, .button-collapse');
  var sidenavInstances = M.Sidenav.init(sidenavElems);
  
  var parallaxElems = document.querySelectorAll('.parallax');
  var parallaxInstances = M.Parallax.init(parallaxElems);
});