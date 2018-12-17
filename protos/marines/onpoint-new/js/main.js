// on-point announcer
var Announcer = function(config) {
  if (!config && !config.id && !config.btnCloseId)  return;
  var element = document.getElementById(config.id);
  var close = document.getElementById(config.btnCloseId);
  if (!element && !close) return;

  function hide() {
    document.body.className = document.body.className.replace(' with-on-spot', '');
    if (carousel && config.autoRotate) {
      carousel.pause();
      element.removeEventListener('mouseover', carousel.pause, false);
      element.removeEventListener('mouseout', carousel.rotate, false);
    }
  }

  function open() {
    window.setTimeout(function() {
      document.body.className += ' with-on-spot';
    }, 1400);
  }

  if (close) {
    close.addEventListener('click', hide, false);
    close.addEventListener('touch', hide, false);
  }

  var carousel = new Carousel(config);
  if (carousel && config.autoRotate) {
    element.addEventListener('mouseover', carousel.pause, false);
    element.addEventListener('mouseout', carousel.rotate, false);
    carousel.rotate();
  }

  open();
};

var Carousel = function(config) {
  var strip, pager, leftControl, rightControl, current, quantity, autoRotate, timer;
  strip = config.carouselId ? document.getElementById(config.carouselId) : null;
  pager = config.pagerId ? document.getElementById(config.pagerId) : null;
  leftControl = config.btnLeft ? document.getElementById(config.btnLeft) : null;
  rightControl = config.btnRight ? document.getElementById(config.btnRight) : null;
  autoRotate = config.doRotate || false;
  rotateDuration = config.rotateDuration || 5000; // milliseconds
  transitionDuration = config.transitionDuration || 1000; // milliseconds
  if (!strip || !leftControl || !rightControl || !pager) return;

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
      ++current;
    } else if (current + 1 == 1) {
      current = -quantity + 1;
      TweenMax.set(strip, {x:  (-quantity * 100)+ '%'});
    }
    TweenMax.to(strip, transitionDuration/1000, {
      x: (current * 100) + '%',
      ease: 'cubic-bezier(.67,.54,.43,.78)',
      onComplete: function(){
        pager.innerHTML = (Math.abs(current) + 1) + ' of ' + quantity;
      }
    });
  }

  function moveRight() {
    if (Math.abs(current - 1) < quantity) {
      current--;
    } else if (Math.abs(current - 1) == quantity) {
      current = 0;
      TweenMax.set(strip, {x: 100 + '%'});
    }
    TweenMax.to(strip, transitionDuration/1000, {
      x: (current * 100) + '%',
      ease: 'cubic-bezier(.67,.54,.43,.78)',
      onComplete: function(){
        pager.innerHTML = (Math.abs(current) + 1) + ' of ' + quantity;
      }
    });
  }

  function rotate() {
    console.log('rotate please');
    var totalTime = transitionDuration + rotateDuration;
    timer = window.setInterval(function(){
      moveRight();
    }, totalTime);
  }

  function pause() {
    window.clearInterval(timer);
  }

  leftControl.addEventListener('click', moveLeft, false);
  rightControl.addEventListener('click', moveRight, false);
  leftControl.addEventListener('touch', moveLeft, false);
  rightControl.addEventListener('touch', moveRight, false);

  setup();

  return {
    pause: pause,
    rotate: rotate
  };
};
