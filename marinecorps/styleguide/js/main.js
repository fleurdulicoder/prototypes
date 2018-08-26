// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  stickIt();
};

var header = document.getElementById("navbar");
var sticky = document.getElementById("main").offsetTop - 120;

function stickIt() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
