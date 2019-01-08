var ExploreGallery = ExploreGallery || function(config) {
  console.log('Inside Explore Gallery');
  var element = config.galleryId ? document.getElementById(config.galleryId) : null;
  if (!element) return;

  var previews = [], sets = [];
  var view = element.querySelector('.view'),
    views = view.querySelectorAll('.item'),
    slider = element.querySelector('.preview-section'),
    caption = element.querySelector('.caption-section'),
    captionTitle = caption.querySelector('.title'),
    captionByline = caption.querySelector('.byline'),
    captionDownloadLink = caption.querySelector('.download-link'),
    captionDetailsLink = caption.querySelector('.details-link');

  var  quantity = views.length,
    increment = 2,
    activeSet = 0,
    activeImageSlide;

  function loadPreviews() {
    console.log('Explore Gallery > Load Previews');
    var createPreview = function(item, parent) {
      console.log('Explore Gallery > Create Preview');
      var tmp = document.createElement('div');
      tmp.className = 'preview';
      tmp.view = item;
      tmp.innerHTML =
      '<img alt="" src="'+item.getAttribute('data-imgsrc')+'" /> \
      <a class="overlay" href="#"> \
        <span class="title"><span>View</span></span> \
      </a> \
      ';
      if (parent) parent.appendChild(tmp);
      return tmp;
    };

    var createSet = function(index) {
      console.log('Explore Gallery > Create Set');
      var tmp = document.createElement('div');
      tmp.className = 'preview-set';
      tmp.setAttribute('data-id', index);
      slider.appendChild(tmp);
      return tmp;
    };

    var total = Math.floor(quantity / increment) * increment;
    var count = -1, activeSetElement, activePreview;
    for (var i = 0; i < total; i++) {
      if (i % 2 == 0) {
        count++;
        activeSetElement = createSet(count);
        sets.push(activeSetElement);
      }
      activePreview = createPreview(views[i], activeSetElement);
      previews.push(activePreview);
    }
  }

  function loadCaption() {
    if (activeImageSlide) {
      captionTitle.innerHTML = activeImageSlide.getAttribute('data-title');
      captionByline.innerHTML = activeImageSlide.getAttribute('data-byline');
      captionDownloadLink.setAttribute('href', activeImageSlide.getAttribute('data-imgsrc'));
      captionDownloadLink.setAttribute('download', activeImageSlide.getAttribute('data-imgsrc'));
      captionDetailsLink.setAttribute('href', activeImageSlide.getAttribute('data-link'));
    }
  }

  function setDefaultView() {
    activeSet = 0;
    activeImageSlide = views[0];
    activeImageSlide.classList.add('current');
    loadCaption();
    preloadNextSet();
  }

  function getNextSet() {
    if ((activeSet + 1) < sets.length) {
      return sets[++activeSet];
    } else {
      activeSet = 0;
      return sets[activeSet];
    }
  }

  // redo
  function loadNextSet(loadingSet) {
    TweenMax.set(loadingSet, {
      display: 'block',
      opacity: 1
    });
  }

  // redo
  function removeSet() {
    TweenMax.set(sets[activeSet], {
      display: 'none',
      opacity: 0
    });
  }

  function preloadNextSet() {
    console.log('Explore Gallery > Preload Next Set');
    removeSet();
    loadNextSet(getNextSet());
  }

  function loadTrio(e) {
    console.log('Explore Gallery > Load Trio');
    e.preventDefault();
    var clicked = e.target;
    while(!clicked.classList.contains('preview')) {
      clicked = clicked.parentNode;
    }
    console.log(clicked);
    //if (clicked.view.id !== activeImageSlide.id) {
      clicked.view.classList.add('current');
      activeImageSlide.classList.remove('current');
      activeImageSlide = clicked.view;
      preloadNextSet();
    //}
  }

  function observers() {
    // if (prev && next) {
    //   prev.addEventListener('click', function(e){}, false);
    //   next.addEventListener('click', function(e){}, false);
    //   prev.addEventListener('touch', function(e){}, false);
    //   next.addEventListener('touch', function(e){}, false);
    // }
    for (var x = 0, len = previews.length; x < len; x++) {
      previews[x].addEventListener('click', function(e) {
        loadTrio(e);
      }, false);
    }
  }

  function setup() {
    console.log('Explore Gallery > Set Up');
    loadPreviews();
    setDefaultView();
    observers();
  }

  setup();
};
