/*
    Slider - Slideshow of photos managed by carousel of thumbnails below
    @developer - Ella Musina (emusina@omnitecinc.com)
*/
  var Slider = Slider || function(config) {
    var element = config.id ? document.getElementById(config.id) : null;
    if (!element) return;
    var view = element.querySelector('.view');
    var views = view.querySelectorAll('.item');
    var prev = element.querySelector('.previous');
    var next = element.querySelector('.next');
    var carousel = element.querySelector('.carousel');
    var wrapper = carousel.querySelector('.wrapper');
    var thumbs = carousel.querySelectorAll('.item');
    var isAnimating = false;
    if (!views || !prev || !next || !carousel || !thumbs) return;

    var currentView = views[0], currentIndex = 0, currentThumb = thumbs[0];
    var autoRotate = config.autorotate || false;
    var stopRotate = config.stoprotate || false;
    var rotateDuration = config.rotateduration || 5000;
    var animateInView = config.animateinview || false;

    var distance, jump, totalJumps;
    function setCarouselDistance() {
      jump = 0;
      distance = carousel.getBoundingClientRect().width;
      totalJumps = Math.ceil(thumbs.length * 72 / distance);
      TweenMax.set(wrapper, {
        x: 0,
        width: (totalJumps * distance) + 'px'
      });
    }

    function setImageRatioViewSize() {
      var width = view.getBoundingClientRect().width; // 3x2
      var height = width * 2 / 3;
      TweenMax.set(view, {
        height: height + 'px'
      });
    }

    function slideIn(e) {
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
      thumb.classList.add('current');
      var timeline = new TimelineMax({
        paused: true,
        onStart: function(){
          thumbs[currentIndex].classList.remove('current');
        },
        onComplete: function(){
          currentIndex = thumb.index;
          currentView = thumb.view;
          isAnimating = false;
        }
      });
      timeline
        .addLabel('init')
        .set(thumb.view, {
          x: '-100%',
          opacity: 1,
          visibility: 'visible'
        }, 'init')
        .addLabel('move')
        .to(views[currentIndex], 0.5, {
          x: '100%',
          ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }, 0.1, 'move')
        .to(thumb.view, 0.5, {
          x: '0%',
          ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }, 0.1, 'move');
      timeline.play();
    }

    function slideInFromRight(thumb) {
      thumb.classList.add('current');
      var timeline = new TimelineMax({
        paused: true,
        onStart: function(){
          thumbs[currentIndex].classList.remove('current');
        },
        onComplete: function() {
          currentIndex = thumb.index;
          currentView = thumb.view;
          isAnimating = false;
        }
      });
      timeline
        .addLabel('init')
        .set(thumb.view, {
          x: '100%',
          opacity: 1,
          visibility: 'visible'
        }, 'init')
        .addLabel('move')
        .to(views[currentIndex], 0.5, {
          x: '-100%',
          ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }, 0.1, 'move')
        .to(thumb.view, 0.5, {
          x: '0%',
          ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }, 0.1, 'move');
      timeline.play();
    }

    function moveLeft() {
      var prevIndex = currentIndex - 1;
      if (prevIndex <= 0) {
        prevIndex = thumbs.length - 1;
      }
      var thumb = thumbs[prevIndex];
      slideInFromLeft(thumb);
    }

    function moveRight() {
      var nextIndex = currentIndex + 1;
      if (nextIndex >= thumbs.length) {
        nextIndex = 0;
      }
      var thumb = thumbs[nextIndex];
      slideInFromRight(thumb);
    }

    var timer;
    function rotate() {
      timer = window.setInterval(function(){
        moveRight();
      }, rotateDuration);
    }

    function pause() {
      window.clearInterval(timer);
    }

    function moveThumbsRight() {
      if (jump - 1 >= 0) {
        jump--;
      } else {
        jump = totalJumps - 1;
        TweenMax.set(wrapper, {
          x: -totalJumps * distance+ 'px'
        });
      }
      TweenMax.to(wrapper, 0.5, {
        x: -(jump * distance) + 'px',
        ease: 'cubic-bezier(0, 0, 0, 1.1)'
      });
    }

    function moveThumbsLeft() {
      if (jump + 1 < totalJumps) {
        jump++;
      } else {
        jump = 0;
        TweenMax.set(wrapper, {
          x: distance + 'px'
        });
      }
      TweenMax.to(wrapper, 0.5, {
        x: -(jump * distance) + 'px',
        ease: 'cubic-bezier(0, 0, 0, 1.1)'
      });
    }

    function observe() {
      for (var i = 0, len = views.length; i < len; i++) {
        thumbs[i].view = views[i];
        thumbs[i].index = i;
        thumbs[i].addEventListener('click', function(e) {
          if (!isAnimating) {
            isAnimating = true;
            slideIn(e);
          }
        }, false);
        thumbs[i].addEventListener('touch', function(e) {
          if (!isAnimating) {
            isAnimating = true;
            slideIn(e);
          }
        }, false);
      }

      prev.addEventListener('click', function(e) { moveThumbsRight(e); }, false);
      prev.addEventListener('touch', function(e) { moveThumbsRight(e); }, false);
      next.addEventListener('click', function(e) { moveThumbsLeft(e); }, false);
      next.addEventListener('touch', function(e) { moveThumbsLeft(e); }, false);

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
            setImageRatioViewSize();
            rotate();
          }, 12000);
        }, false);
        rotate();
      } else {
        window.addEventListener('resize', function() {
          window.setTimeout(function(){
            setCarouselDistance();
            setImageRatioViewSize();
          }, 200);
        });
      }

      if (animateInView) { //jquery.inview plugin
        $(element).on('inview', function(event, isInView) {
          if (isInView) {
            TweenMax.to(element, 0.25, {
              opacity: 1,
              y: 0,
              ease: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
              onComplete: function() {
                $(element).off('inview');
              }
            });
          }
        });

        $(carousel).on('inview', function(event, isInView){
          if (isInView) {
            TweenMax.staggerTo(thumbs, 0.25, {
              opacity: 1,
              ease: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
              onComplete: function() {
                $(carousel).off('inview');
              }
            }, 0.12);
          }
        });
      }
    }

    function loadDefaults() {
      currentThumb.classList.add('current');
      if (animateInView) { // material lib animation standards
        TweenMax.set(element, {
            opacity: 0,
            y: 30
        });
        TweenMax.set(thumbs, {
          opacity: 0
        });
      }
      TweenMax.set(views[0], {
        visibility: 'visible',
        opacity: 1
      });
    }

    function init() {
      setCarouselDistance();
      setImageRatioViewSize();
      loadDefaults();
      observe();
    }

    init();
  };
