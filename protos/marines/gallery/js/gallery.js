var ExploreGallery = ExploreGallery || function(config) {
  console.log('Inside Explore Gallery');
  var element = config.galleryId ? document.getElementById(config.galleryId) : null;
  if (!element) return;

  var view = element.querySelector('.view'),
    slider = element.querySelector('.preview-section'),
    previews = element.querySelectorAll('.preview');
    prev = element.querySelector('.pager-section .previous'),
    next = element.querySelector('.pager-section .next');
  // if (!slider || !previews || !view || !prev || !next) return;

  var sets = [], currentSet = 0, activeImage, increment = config.inview || 1, quantity = previews.length;

  function loadTrio(e) {
    console.log('Explore Gallery > Load Trio');
    e.preventDefault();
    var clicked = e.target;
    while(!clicked.classList.contains('preview')) {
      clicked = clicked.parentNode;
    }
    clicked.view.classList.add('current');
    activeImage.classList.remove('current');
    activeImage = clicked.view;
  }

  function observers() {
    if (prev && next) {
      prev.addEventListener('click', function(e){}, false);
      next.addEventListener('click', function(e){}, false);
      prev.addEventListener('touch', function(e){}, false);
      next.addEventListener('touch', function(e){}, false);
    }
    for (var x = 0; x < quantity; x++) { // querySelector('a')
      previews[x].querySelector('a').addEventListener('click', function(e){
        loadTrio(e);
      }, false);
    }
  }

  function breakIntoSets(num) {
    console.log('Explore Gallery > Break Into Sets At ', num);
    for (var i = 0; i < quantity; i += num) {
      var tmp = [];
      for (var j = 0; j < config.inview; j++) {
        tmp.push(previews[i + j]);
      }
      sets.push(tmp);
    }
  }

  var views = [];
  function preload() {
    console.log('Explore Gallery > Preload');
    var addMainImageTo = function(node) {
      var image = document.createElement('img');
      image.setAttribute('src', node.getAttribute('data-imgsrc'));
      image.setAttribute('alt', node.getAttribute('data-title'));
      view.appendChild(image);
      node.view = image;
    };

    for (var x = 0; x < quantity; x++) {
      var node = previews[x];
      addMainImageTo(node);
    }
  }

  function getNextSet() {
    if ((currentSet + 1) < sets.length) {
      currentSet++;
      return sets[currentSet + 1];
    } else {
      currentSet = 0;
      return sets[0];
    }
  }

  function loadNextSet(loadingSet) {
    TweenMax.set(loadingSet, {
      display: 'block',
      opacity: 1
    });
  }

  function removeSet() {
    var activeSet = sets[currentSet];
    TweenMax.set(activeSet, {
      display: 'none',
      opacity: 0
    });
  }

  function preloadNextSet() {
    removeSet();
    loadNextSet(getNextSet());
  }

  function setDefaultView() {
    currentSet = 0;
    activeImage = previews[0].view;
    activeImage.classList.add('current');
    preloadNextSet();
  }

  function setup() {
    console.log('Explore Gallery > Set Up');
    breakIntoSets(increment);
    preload();
    setDefaultView();
    observers();
  }

  setup();
};
