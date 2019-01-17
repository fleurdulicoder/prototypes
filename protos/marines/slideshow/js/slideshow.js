var Slideshow = function(obj) {
  var element = obj.id ? document.getElementById(obj.id) : null;
  if (!element) return;
  var view = element.querySelector('.view');
  var views = view.querySelectorAll('.item');
  var prev = element.querySelector('.prev');
  var next = element.querySelector('.next');
  var carousel = element.querySelector('.carousel');
  var thumbs = carousel.querySelectorAll('.item');
  if (!views || !prev || !next || !carousel || !thumbs) return;
  var currentView = views[0], currentIndex = 0, currentThumb = thumbs[0];

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

  for (var i = 0, len = views.length; i < len; i++) {
    thumbs[i].view = views[i];
    thumbs[i].index = i;
    thumbs[i].addEventListener('click', function(e) { slideIn(e); }, false);
    thumbs[i].addEventListener('touch', function(e) { slideIn(e); }, false);
  }

};
