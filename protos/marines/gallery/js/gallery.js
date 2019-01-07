var ExploreGallery = ExploreGallery || function(config) {
  console.log('Inside Explore Gallery');
  var element = config.galleryId ? document.getElementById(config.galleryId) : null;
  if (!element) return;

  var view = element.querySelector('.view'),
    slider = element.querySelector('.preview-section'),
    previews = element.querySelectorAll('.preview');
    prev = element.querySelector('.pager-section .previous'),
    next = element.querySelector('.pager-section .next');

  console.log(view, slider, previews, prev, next);
  // if (!slider || !previews || !view || !prev || !next) return;

  var sets, currentSet, activeImage, increment, quantity;
  sets = [];
  increment = config.inview || 1;
  quantity = previews.length;

  console.log(increment, quantity);

  // function preloadSet() {
  //
  // }
  //
  // function loadSet(num) {
  //   currentSet = sets[num];
  //   loadMainImage(num);
  // }

  // function loadTrio(e) {
  //   var clickedOn = e.target;
  //   clickedOn.view.classList.add('current');
  //   activeImage.classList.remove('current');
  // }

  function observers() {
    if (prev && next) {
      prev.addEventListener('click', function(e){}, false);
      next.addEventListener('click', function(e){}, false);
      prev.addEventListener('touch', function(e){}, false);
      next.addEventListener('touch', function(e){}, false);
    }
    for (var x = 0; x < len; x++) {
      previews[x].addEventListener('click', function(e){ loadTrio(e); }, false);
      // previews[x].addEventListener('touch', function(){}, false);
    }
  }

  function getNextSet() {
    var len = sets.length;
    if ((currentSet + 1) < len) {
      currentSet++;
      return sets[currentSet + 1];
    } else {
      currentSet = 0;
      return sets[0];
    }
  }

  function loadNextSet() {
    var nextSet = getNextSet();
  }

  function breakIntoSetsAt(num) {
    console.log('Explore Gallery > Break Into Sets At ', num);
    for (var i = 0; i < quantity; i += num) {
      var tmp = [];
      for (var j = 0; j < config.inview; j++) {
        tmp.push(previews[i + j]);
      }
      sets.push(tmp);
    }
    console.log(sets);
  }

  function switchSet(current, next) {
    console.log('Explore Gallery > Switch Set');
    TweenMax.set(sets[current], {
      opacity: 0
    });
    TweenMax.set(next[next], {
      opacity: 1
    });
  }

  function loadSet(num, img) {
    console.log('Explore Gallery > Load Set');
    if (!activeImage) activeImage.classList.remove('current');
    switchSet(currentSet, num);
    activeImage = !img ? activeImage = sets[num][0].view : img;
    activeImage.classList.add('current');
    currentSet = num;
  }

  var views = [];
  function preload() {
    console.log('Explore Gallery > Preload');
    var addMainImageTo = function(node) {
      var image = document.createElement('img');
      image.setAttribute('src', node.getAttribute('data-imgsrc'));
      image.setAttribute('alt', node.getAttribute('data-title'));
      image.setAttribute('id', node.getAttribute('data-id'));
      view.appendChild(image);
      node.view = image;
    };

    for (var x = 0; x < quantity; x++) {
      var node = previews[x];
      addMainImageTo(node);
      console.log(node);
    }

    previews[0].view.classList.add('current');
  }

  function setup() {
    console.log('Explore Gallery > Set Up');
    breakIntoSetsAt(increment);
    preload();
  }

  console.log('before setup');
  setup();
};
