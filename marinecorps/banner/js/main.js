// Banner Slides
var slides = [{
    image: 'img/img1.jpg',
    title: 'Into The Blue',
    text: 'The Marines attended UET at the base pool to remain prepared in the event of aircraft crash into a body of water, requiring the persons aboard to make an espace.',
    video: 'http://youtube.com/',
    url: '#'
  }, {
    image: 'img/img2.jpg',
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/watch?v=ZyPpwxtUK7o',
    url: '#'
  }, {
    image: 'img/img3.jpg',
    title: 'Sit Amet',
    text: ' Fusce tincidunt sem vel ornare tempor. Etiam sagittis felis id leo lobortis, vulputate consequat odio mollis. Mauris vel augue varius.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img4.jpg',
    title: 'Consectetur',
    text: 'Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img5.jpg',
    title: 'Mauris porttitor',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. Integer accumsan diam sit amet nisi efficitur iaculis.',
    video: 'https://www.youtube.com/',
    url: '#'
  }, {
    image: 'img/img6.jpg',
    title: 'Sagittis Blandit',
    text: 'Integer accumsan diam sit amet nisi efficitur iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id porttitor dolor, sagittis blandit elit. ',
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
};

// any carousel
var Carousel = function(stripId, pagerId, leftControlId, rightControlId) {
  var strip, pager, leftControl, rightControl, current, quantity;
  strip = stripId ? document.getElementById(stripId) : null;
  pager = pagerId ? document.getElementById(pagerId) : null;
  leftControl = leftControlId ? document.getElementById(leftControlId) : null;
  rightControl = rightControlId ? document.getElementById(rightControlId) : null;
  if (!strip || !leftControl || !rightControl) return;

  function setup() {
    current = 0;
    quantity = strip.children.length;
    strip.style.width = quantity * 100 + '%';
    pager.innerHTML = (current + 1) + ' of ' + quantity;
    for (var i = 0; i < quantity; i++) {
      strip.children[i].style.width = 100 / quantity + '%';
    }
  }

  function moveLeft() {
    console.log('moving left');
    if (current + 1 <= 0) {
      pager.innerHTML = (Math.abs(current + 1) + 1) + ' of ' + quantity;
      TweenMax.to(strip, 0.5, {
        x: (++current * 100) + '%',
        ease: 'cubic-bezier(.67,.54,.43,.78)',
        onComplete: function(){ console.log('end');}
      });
    }
  }

  function moveRight() {
    console.log('moving right');
    if (Math.abs(current - 1) < quantity) {
      pager.innerHTML = (Math.abs(current - 1) + 1) + ' of ' + quantity;
      TweenMax.to(strip, 0.5, {
        x: (--current * 100) + '%',
        ease: 'cubic-bezier(.67,.54,.43,.78)',
        onComplete: function(){ console.log('end');}
      });
    }
  }

  leftControl.addEventListener('click', moveLeft, false);
  rightControl.addEventListener('click', moveRight, false);
  leftControl.addEventListener('touch', moveLeft, false);
  rightControl.addEventListener('touch', moveRight, false);

  setup();
};

var Banner = function(bannerId, bannerSlides, autoRotateFlag) {
  var doRotation = autoRotateFlag || true, rotation;
  var element = document.getElementById(bannerId) || null;
  var slides = bannerSlides || [];
  if (!element || slides.length == 0) return;

  // background slide
  var nextSlide = {
    element: element.querySelector('div.next-slide') || null,
    number: element.querySelector('div.next-slide>.content>.row>h5') || null,
    title: element.querySelector('div.next-slide>.content>.row>h1') || null,
    text: element.querySelector('div.next-slide>.content>.row>p') || null,
    url: element.querySelector('div.next-slide>.content>.row>aside a:nth-child(1)') || null,
    video: element.querySelector('div.next-slide>.content>.row>aside a:nth-child(2)') || null,
    nav: {
      nextLink: element.querySelector('div.next-slide>div.navigate>.next') || null,
      nextTitle: element.querySelector('div.next-slide>div.navigate>.next>.title') || null,
      prevLink: element.querySelector('div.next-slide>div.navigate>.prev') || null,
      prevTitle: element.querySelector('div.next-slide>div.navigate>.prev>.title') || null
    }
  };

  // frontal slide
  var currentSlide = {
    element: element.querySelector('div.current-slide') || null,
    number: element.querySelector('div.current-slide>.content>.row>h5') || null,
    title: element.querySelector('div.current-slide>.content>.row>h1') || null,
    text: element.querySelector('div.current-slide>.content>.row>p') || null,
    url: element.querySelector('div.current-slide>.content>.row>aside a:nth-child(1)') || null,
    video: element.querySelector('div.current-slide>.content>.row>aside a:nth-child(2)') || null,
    nav: {
      nextLink: element.querySelector('div.current-slide>div.navigate>.next') || null,
      nextTitle: element.querySelector('div.current-slide>div.navigate>.next>.title') || null,
      prevLink: element.querySelector('div.current-slide>div.navigate>.prev') || null,
      prevTitle: element.querySelector('div.current-slide>div.navigate>.prev>.title') || null
    }
  };

  var counter = element.querySelector('div.counter');
  var circles = [];
  var current = -1;

  // create circles navigation
  function makeCircles() {
    // load index from circle to load correct slide
    var loadFromCircle = function(e){
      var index = parseInt(e.target.getAttribute('data-load'));
      if (doRotation) {
        doRotation = false;
        clearTimeout(rotation);
      }
      current = index;
      fadeNext();
    };

    // build circles array, attach events
    for (var i = 0; i < slides.length; i++) {
      var circle = document.createElement('div');
      circle.className = 'circle';
      circle.setAttribute('data-load', i);
      counter.appendChild(circle);
      circles.push(circle);

      circle.addEventListener('click', loadFromCircle, false);
      circle.addEventListener('touch', loadFromCircle, false);
    }
  }

  function init() {
    makeCircles();
    load(++current);
    if (doRotation) rotation = setInterval(fade, 5000);

    // next slide loading
    var rotatePlus = function(){
      if (doRotation) {
        doRotation = false;
        clearTimeout(rotation);
      }
      current = reset(++current);
      fadeNext();
    };

    // previous slide loading
    var rotateMinus = function(){
      if (doRotation) {
        doRotation = false;
        clearTimeout(rotation);
      }
      current = reset(--current);
      fadeNext();
    };

    // attach click events to prev / next links
    currentSlide.nav.nextLink.addEventListener('click', rotatePlus, false);
    currentSlide.nav.nextLink.addEventListener('touch', rotatePlus, false);
    currentSlide.nav.prevLink.addEventListener('click', rotateMinus, false);
    currentSlide.nav.prevLink.addEventListener('touch', rotateMinus, false);
  }

  // set current nav circle
  function setCircle(index) {
    for (var i = 0, len = slides.length; i < len; i++) {
      circles[i].className = 'circle';
    }
    if (index >= slides.length) index = 0;
    circles[index].className = 'circle current';
  }

  // set slide background
  function setBackground(index, slide) {
    slide.element.style.backgroundImage = "url(" + slides[index].image + ")";
  }

  // load content into a slide
  function setContent(index, slide) {
    slide.number.innerHTML = (index < 10) ? "0"+ (index+1) : (index+1);
    slide.title.innerHTML = slides[index].title;
    slide.text.innerHTML = slides[index].text;
    slide.url.setAttribute('href', slides[index].url);
    slide.video.setAttribute('href', slides[index].video);
  }

  // set titles of previous and next links
  function setPrevNext(index, slide) {
    var prevIndex = (index - 1) < 0 ? slides.length - 1 : index - 1;
    var nextIndex = (index + 1) >= slides.length ? 0 : index + 1;
    slide.nav.prevTitle.innerHTML = slides[prevIndex].title;
    slide.nav.nextTitle.innerHTML = slides[nextIndex].title;
  }

  // current slide load
  function load(index) {
    setCircle(index);
    setBackground(index, currentSlide);
    setContent(index, currentSlide);
    setPrevNext(index, currentSlide);
    if (doRotation) preload(++index);
  }

  // reset index every time it hits the edges of the array
  function reset(index) {
    return (index < slides.length) ? ((index < 0) ? slides.length - 1 : index) : 0;
  }

  // load background slide for better transition between slides
  function preload(index) {
    var next = reset(index);
    setBackground(next, nextSlide);
    setContent(next, nextSlide);
    setPrevNext(index, nextSlide);
  }

  // automated animating & navigating between slides
  function fade() {
    currentSlide.element.className = 'current-slide fade-out';
    setTimeout(function() {
      current = reset(++current);
      load(current);
      currentSlide.element.className = 'current-slide';
    }, 500);
  }

  // manual animating & navigating between slides
  function fadeNext() {
    preload(current);
    currentSlide.element.className = 'current-slide fade-out';
    setTimeout(function(){
      load(current);
      currentSlide.element.className = 'current-slide';
    }, 500);
  }

  init();
};
