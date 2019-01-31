var Slider = Slider || function(config) {
  var element = config.id ? document.getElementById(config.id) : null;
  if (!element) return;
  var view = element.querySelector('.view');
  var views = view.querySelectorAll('.item');
  var prev = element.querySelector('.prev');
  var next = element.querySelector('.next');
  var carousel = element.querySelector('.carousel');
  var wrapper = carousel.querySelector('.wrapper');
  var thumbs = carousel.querySelectorAll('.item');
  if (!views || !prev || !next || !carousel || !thumbs) return;

  var currentView = views[0], currentIndex = 0, currentThumb = thumbs[0];
  var autoRotate = config.autorotate || false;
  var stopRotate = config.stoprotate || false;

  var distance, jump, totalJumps, isAnimating = false;
  function setCarouselDistance() {
    jump = 0;
    distance = carousel.getBoundingClientRect().width;
    totalJumps = Math.ceil(thumbs.length * 72 / distance);
    wrapper.style.width = (totalJumps * distance) + 'px';
  }

  function slideIn(e) {
    console.log(e, e.target);
    var thumb = e.target;
    while(!thumb.classList.contains('item')) {
      thumb = thumb.parentNode;
    }
    if (thumb.index !== currentIndex) {
      if (thumb.index > currentIndex) {
        slideInFromRight(thumb);
      } else {
        slideInFromLeft(thumb);
      }
    }
  }

  function slideInFromLeft(thumb) {
    var timeline = new TimelineMax({
      paused: true,
      onStart: function(){
        thumbs[currentIndex].classList.remove('current');
        thumb.classList.add('current');
      },
      onComplete: function(){
        currentIndex = thumb.index;
        currentView = thumb.view;
        isAnimating = false;
      }
    });
    timeline
      .set(thumb.view, {
        x: '-100%',
        opacity: 1,
        visibility: 'visible'
      })
      .to(views[currentIndex], 0.5, {
        x: '100%',
        ease: 'cubic-bezier(0, 0, 0, 1.1)'
      }, 0.1)
      .to(thumb.view, 0.5, {
        x: '0%',
        ease: 'cubic-bezier(0, 0, 0, 1.1)'
      }, 0.1);
    timeline.play();
  }

  function slideInFromRight(thumb) {
    var timeline = new TimelineMax({
      paused: true,
      onStart: function(){
        thumbs[currentIndex].classList.remove('current');
        thumb.classList.add('current');
      },
      onComplete: function() {
        isAnimating = false;
        currentIndex = thumb.index;
        currentView = thumb.view;
      }
    });
    timeline
      .set(thumb.view, {
        x: '100%',
        opacity: 1,
        visibility: 'visible'
      })
      .to(views[currentIndex], 0.5, {
        x: '-100%',
        ease: 'cubic-bezier(0, 0, 0, 1.1)'
      }, 0.1)
      .to(thumb.view, 0.5, {
        x: '0%',
        ease: 'cubic-bezier(0, 0, 0, 1.1)'
      }, 0.1);
    timeline.play();
  }

  function moveLeft() {
    if (!isAnimating) {
      isAnimating = true;
      var prevIndex = currentIndex - 1;
      if (prevIndex <= 0) {
        prevIndex = thumbs.length - 1;
      }
      var thumb = thumbs[prevIndex];
      slideInFromLeft(thumb);
    }
  }

  function moveRight() {
    if (!isAnimating) {
      isAnimating = true;
      var nextIndex = currentIndex + 1;
      if (nextIndex >= thumbs.length) {
        nextIndex = 0;
      }
      var thumb = thumbs[nextIndex];
      slideInFromRight(thumb);
    }
  }

  var timer;
  function rotate() {
    timer = window.setInterval(function(){
      moveRight();
    }, 5000);
  }

  function pause() {
    window.clearInterval(timer);
  }

  function moveThumbsRight() {
    if (!isAnimating) {
      isAnimating = true;
      if (jump - 1 >= 0) {
        TweenMax.to(wrapper, 0.5, {
          x: -(--jump * distance) + 'px',
          ease: 'cubic-bezier(0, 0, 0, 1.1)',
          onComplete: function(){
            isAnimating = false;
          }
        });
      }
    }
  }

  function moveThumbsLeft() {
    if (!isAnimating) {
      isAnimating = true;
      if (jump + 1 < totalJumps) {
        TweenMax.to(wrapper, 0.5, {
          x: -(++jump * distance) + 'px',
          ease: 'cubic-bezier(0, 0, 0, 1.1)',
          onComplete: function(){
            isAnimating = false;
          }
        });
      }
    }
  }

  function observe() {
    for (var i = 0, len = views.length; i < len; i++) {
      thumbs[i].view = views[i];
      thumbs[i].index = i;
      thumbs[i].addEventListener('click', function(e) { slideIn(e); }, false);
      thumbs[i].addEventListener('touch', function(e) { slideIn(e); }, false);
    }

    prev.addEventListener('click', function(e) { moveThumbsRight(); }, false);
    prev.addEventListener('touch', function(e) { moveThumbsRight(); }, false);
    next.addEventListener('click', function(e) { moveThumbsLeft(); }, false);
    next.addEventListener('touch', function(e) { moveThumbsLeft(); }, false);

    if (stopRotate) {
      element.addEventListener('mouseover', function() { pause(); }, false);
      element.addEventListener('mouseout', function() { rotate(); }, false);
    }

    if (autoRotate) {
      window.addEventListener('resize', function() { // debouncer
        pause();
        if (timer) clearInterval(timer);
        timer = window.setTimeout(function() {
          setCarouselDistance();
          rotate();
        }, 12000);
      }, false);
      rotate();
    } else {
      window.addEventListener('resize', function() {
        window.setTimeout(function(){
          setCarouselDistance();
        }, 12000);
      });
    }
  }

  function setDefault() {
    thumbs[0].classList.add('current');
    views[0].classList.add('current');
  }

  function init() {
    setCarouselDistance();
    setDefault();
    observe();
  }

  init();

};
