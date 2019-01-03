/* Gallery Coding */
var ExploreGallery = function(galleryId, bannerSlides, autoRotateFlag) {
  var doRotation = autoRotateFlag || true, rotation;
  var element = document.getElementById(galleryId) || null;
  var slides = bannerSlides || [];
  if (!element || slides.length == 0) return;

  // integrate previous / next that is outside of the slideshow
  // previuos / next images integration (view click);
  // current image, pervious image, next image

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

  var current = -1;
  function init() {
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
    // currentSlide.nav.nextLink.addEventListener('click', rotatePlus, false);
    // currentSlide.nav.nextLink.addEventListener('touch', rotatePlus, false);
    // currentSlide.nav.prevLink.addEventListener('click', rotateMinus, false);
    // currentSlide.nav.prevLink.addEventListener('touch', rotateMinus, false);
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
