window.onscroll = function() {
  collapseHeader();
  pinSidebar();
};

var header = document.getElementById("navbar");
var stickyHeaderPos = document.getElementById("main").offsetTop - 120;

function collapseHeader() {
  if (window.pageYOffset > stickyHeaderPos) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

var sidemenu = document.getElementById("sidemenu");
var stickySidemenuPos = sidemenu.offsetTop;

function pinSidebar() {
  if (window.pageYOffset > 499) {
    sidemenu.classList.add("sticky");
  } else {
    sidemenu.classList.remove("sticky");
  }
}
