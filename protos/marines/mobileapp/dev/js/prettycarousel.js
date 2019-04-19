/*
  NewsCarousel - requires TimeMax & TimelineMax Libraries
  to be loaded via SharedLibrary UseGSAP) or Node (via skin).
  @developer Ella Musina (emusina@omnitecinc.com)
*/
var NewsCarousel = NewsCarousel || function(config) {
  var container = config.container;
  var slides = container.children;
  var prev = config.prev;
  var next = config.next;
  var quantity = slides.length;
  var currentSlide, currentIndex, isAnimating = false;

  function observe() {
    if (prev && next) {
      prev.addEventListener('click', function(e){
        if (!isAnimating) slideInPrev();
      }, false);
      next.addEventListener('click', function(e){
        if (!isAnimating) slideInNext();
      }, false);
      prev.addEventListener('touch', function(e){
        if (!isAnimating) slideInPrev();
      }, false);
      next.addEventListener('touch', function(e){
        if (!isAnimating) slideInPrev();
      }, false);
    }
    jQuery(container).swipe({
      swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
        if (!isAnimating) slideInNext();
      },
      swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
        if (!isAnimating) slideInPrev();
      }
    });
  }

  function getCurrentSlide() {
    console.log('News Carousel > getCurrentSlide');
    for (var i = 0, len = slides.length; i < len; i++) {
      if (slides[i].classList.contains('current')) {
        currentIndex = i;
        currentSlide = slides[i];
        break;
      }
    }
  }

  function slideInNext() {
    console.log('News Carousel > slideInNext');
    isAnimating = true;
    getCurrentSlide();
    if ((currentIndex + 1) < quantity) {
      nextSlide = slides[++currentIndex];
    } else {
      currentIndex = 0;
      nextSlide = slides[currentIndex];
    }

    var timeline = new TimelineMax({
      paused: true,
      onComplete: function(){
        currentSlide.setAttribute('style', '');
        currentSlide.classList.remove('current');
        nextSlide.classList.add('current');
        currentSlide = nextSlide;
        isAnimating = false;
      }
    });

    timeline
      .set(nextSlide, {
        x: '100%',
        visibility: 'visible',
        opacity: 1
      })
      .to(currentSlide, 0.5, {
        x: '-100%',
        ease: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
      }, 0.1)
      .to(nextSlide, 0.5, {
        x: '0%',
        ease:'cubic-bezier(0.0, 0.0, 0.2, 1)'
      }, 0.1);

    timeline.play();
  }

  function slideInPrev() {
    console.log('News Carousel > slideInPrev');
    isAnimating = true;
    getCurrentSlide();
    if ((currentIndex - 1) >= 0) {
      prevSlide = slides[--currentIndex];
    } else {
      currentIndex = quantity - 1;
      prevSlide = slides[currentIndex];
    }

    var timeline = new TimelineMax({
      paused: true,
      onComplete: function(){
        currentSlide.setAttribute('style', '');
        currentSlide.classList.remove('current');
        prevSlide.classList.add('current');
        currentSlide = prevSlide;
        isAnimating = false;
      }
    });

    timeline
      .set(prevSlide, {
        x: '-100%',
        visibility: 'visible',
        opacity: 1
      })
      .to(prevSlide, 0.5, {
        x: '0%',
        ease: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
      }, 0.1)
      .to(currentSlide, 0.5, {
        x: '100%',
        ease: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
      }, 0.1);

    timeline.play();
  }

  function setup() {
    observe();
  }

  setup();
};
