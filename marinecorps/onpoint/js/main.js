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
