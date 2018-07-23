// Banner Slides
var slides = [{
    image: 'img/img1.jpg',
    title: 'Into The Blue',
    text: 'The Marines attended UET at the base pool to remain prepared in the event of aircraft crash into a body of water, requiring the persons aboard to make an espace.',
    video: 'http://youtube.com/',
    url: '#'
  }, {
    image: 'img/img2.jpg',
    title: 'U.S. Marine Corps Water Survival',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/watch?v=ZyPpwxtUK7o',
    url: '#'
  }, {
    image: 'img/img3.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img4.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img5.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img6.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img7.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img8.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img9.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img10.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img11.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img12.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }
];

// on-point announcer
var Announcer = function(id, btnLeftId, btnRightId, pagerId, btnCloseId) {
  var close = btnCloseId ? document.getElementById(btnCloseId) : null;
  var carousel = new Carousel(id, pagerId, btnLeftId, btnRightId);

  function hide() {
    document.body.className = document.body.className.replace(' with-on-spot', '');
  }

  function open() {
    window.setTimeout(function() {
      document.body.className += ' with-on-spot';
    }, 1000);
  }

  if (close) {
    close.addEventListener('click', hide, false);
    close.addEventListener('touch', hide, false);
  }

  open();
}

var Carousel = function(stripId, pagerId, leftControlId, rightControlId) {
  var strip, pager, leftControl, rightControl, current, quantity;
  strip = stripId ? document.getElementById(stripId) : null;
  pager = pagerId ? document.getElementById(pagerId) : null;
  leftControl = leftControlId ? document.getElementById(leftControlId) : null;
  rightControl = rightControlId ? document.getElementById(rightControlId) : null;
  if (!strip || !leftControl || !rightControl) return;

  function setup() {
    current = 0;
    quantity = strip.children.length
    strip.style.width = quantity * 100 + '%';
    pager.innerHTML = (current + 1) + ' of ' + quantity;
    for (var i = 0; i < quantity; i++) {
      strip.children[i].style.width = 100 / quantity + '%';
    }
  }

  function moveLeft() {
    if (current + 1 <= 0) {
      pager.innerHTML = (Math.abs(current + 1) + 1) + ' of ' + quantity;
      TweenLite.to(strip, 0.5, {
        x: (++current * 100) + '%',
        ease: 'cubic-bezier(.67,.54,.43,.78)'
      });
    }
  }

  function moveRight() {
    if (Math.abs(current - 1) < quantity) {
      pager.innerHTML = (Math.abs(current - 1) + 1) + ' of ' + quantity;
      TweenLite.to(strip, 0.5, {
        x: (--current * 100) + '%',
        ease: 'cubic-bezier(.67,.54,.43,.78)'
      });
    }
  }

  leftControl.addEventListener('click', moveLeft, false);
  rightControl.addEventListener('click', moveRight, false);
  leftControl.addEventListener('touch', moveLeft, false);
  rightControl.addEventListener('touch', moveRight, false);

  setup();

}

var Banner = function(bannerId, bannerSlides) {
  var element = document.getElementById(bannerId) || null;
  var slides = bannerSlides || [];
  if (!element || slides.length == 0) return;

  var nextSlide = element.querySelector('div.next-slide');
  var currentSlide = element.querySelector('div.current-slide');
  var counter = element.querySelector('div.counter');
  var circles = [];
  var current = -1;

  var slides = bannerSlides;

  function init() {
    makeCircles();
    load();
    preload();
    setInterval(fade, 5000);
  }

  function makeCircles() {
    for (var i = 0; i < slides.length; i++) {
      var circle = document.createElement('div');
      circle.className = 'circle';
      counter.appendChild(circle);
      circles.push(circle);
    }
  }

  function load() {
    if (++current >= slides.length) current = 0;
    circles[current].className = 'circle current';


    if (current == 0) circles[slides.length - 1].className = 'circle';
    else circles[current - 1].className = 'circle';

    currentSlide.style.backgroundImage = "url(" + slides[current].image + ")";
  }

  function preload() {
    var next = ((current + 1) >= slides.length) ? 0 : current + 1;
    nextSlide.style.backgroundImage = "url(" + slides[next].image + ")";
  }

  function fade() {
    currentSlide.className = 'current-slide fade-out';
    setTimeout(function() {
      load();
      preload();
      currentSlide.className = 'current-slide';
    }, 500);
  }
  init();
}

// further implementation for banner rotation
function pickRandomSlides() {

}
