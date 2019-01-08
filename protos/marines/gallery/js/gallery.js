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
    captionDetailsLink = caption.querySelector('.details-link'),
    previewObjects;
  if (!view && !views) return;

  var quantity, increment, activeSet, activeImageSlide, gallery;
  quantity = views.length;
  increment = 2;
  activeSet = 0;
  gallery = createGallery();

  function createGallery() {
    var images = []
    for (var i = 0; i < quantity; i++) {
      var item = {
        src: views[i].getAttribute('data-src') || 'img/img1.jpg',
        title: views[i].getAttribute('data-title') || 'Default Title',
        byline: views[i].getAttribute('data-byline') || 'Photo By ByLine',
        link: views[i].getAttribute('data-link') || 'www.google.com',
        view: views[i]
      };
      images.push(item);
    }
    return images;
  }

  var sets = []; // forever
  function createSet() {
    var tmp = document.createElement('div');
    tmp.className = 'preview-set';
    slider.appendChild(tmp);
    sets.push(tmp);
    return tmp;
  }

  function createPreview(galleryItem, parent) {
    var tmp = document.createElement('div');
    tmp.className = 'preview';
    tmp.view = galleryItem.view;
    tmp.innerHTML =
    '<img alt="'+galleryItem.title+'" src="'+galleryItem.src+'" /> \
    <a class="overlay" href="#"> \
      <span class="title"><span>View</span></span> \
    </a> \
    ';
    if (parent) {
      parent.appendChild(tmp);
      if (!parent.hasOwnProperty('previews')) {
        parent.previews = [];
      }
      parent.previews.push(tmp);
    }
    return tmp;
  }

  function DEBUGcreateSetsWithPreviews(reloadPreviewCallback, createSetCallback) {
    var total = Math.floor(quantity / increment) * increment;
    var count = -1, activeSetElement;
    for (var i = 0; i < total; i++) {
      if (i % 2 == 0) {
        count++;
        activeSetElement = sets[count];
        activeSetElement.previews = [];
      }
      reloadPreview(gallery[i], activeSetElement);
    }
  }

  function reloadPreview(galleryItem, parent) {
    console.log('Explore Gallery > Reload Preview', galleryItem, parent);
    var reloadingPreview;
    if (parent) {
      var nthChild = parent.previews.length === 0 ? 1 : 2;
      reloadingPreview = parent.querySelector('.preview:nth-child('+nthChild+')');
      var image = reloadingPreview.querySelector('img');
      image.setAttribute('alt', galleryItem.title);
      image.setAttribute('src', galleryItem.src);
      reloadingPreview.view = galleryItem.view;
      parent.previews.push(reloadingPreview);
    }
  }

  function createSetsWithPreviews(reloadPreviewCallback, createSetCallback) {
    var total = Math.floor(quantity / increment) * increment;
    var count = -1, activeSetElement;
    for (var i = 0; i < total; i++) {
      if (i % 2 == 0) {
        count++;
        activeSetElement = sets[count] || createSetCallback(); // watch out
        if (activeSetElement && activeSetElement.hasOwnProperty('previews')) {
          activeSetElement.previews = [];
        }
      }
      reloadPreviewCallback(gallery[i], activeSetElement);
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

  function getNextSet() {
    if ((activeSet + 1) < sets.length) {
      return sets[++activeSet];
    } else {
      activeSet = 0;
      return sets[activeSet];
    }
  }

  // remake
  // function loadNextSet(loadingSet) {
  //   TweenMax.set(loadingSet, {
  //     display: 'block',
  //     opacity: 1
  //   });
  // }
  //
  // function removeSet() {
  //   TweenMax.set(sets[activeSet], {
  //     display: 'none',
  //     opacity: 0
  //   });
  // }

  // function preloadNextSet() {
  //   console.log('Explore Gallery > Preload Next Set');
  //   removeSet();
  //   loadNextSet(getNextSet());
  // }

  function loadTrio(e) {
    // console.log('Explore Gallery > Load Trio');
    e.preventDefault();
    var clicked = e.target;
    while(!clicked.classList.contains('preview')) {
      clicked = clicked.parentNode;
    }
    clicked.view.classList.add('current');
    activeImageSlide.classList.remove('current');
    activeImageSlide = clicked.view;
    reloadPreviewsInSets();
  }

  function observers() {
    // if (prev && next) {
    //   prev.addEventListener('click', function(e){}, false);
    //   next.addEventListener('click', function(e){}, false);
    //   prev.addEventListener('touch', function(e){}, false);
    //   next.addEventListener('touch', function(e){}, false);
    // }
    for (var x = 0, len = sets.length; x < len; x++) {
      sets[x].addEventListener('click', function(e) {
        loadTrio(e);
      }, false);
    }
  }

  function reloadPreviewsInSets() {
    console.log('Explore Gallery > Reload Previews');
    reloadGallery();
    createSetsWithPreviews(reloadPreview, function(){});
  }

  function reloadGallery() {
    gallery.push(gallery.shift());
    gallery.push(gallery.shift());
  }

  function loadFirstSet() {
    TweenMax.set(sets[0], {
      display: 'block',
      opacity: 1
    });
  }

  function setDefaultView() {
    activeSet = 0;
    activeImageSlide = views[0];
    activeImageSlide.classList.add('current');
    loadFirstSet();
    loadCaption();
    reloadPreviewsInSets();
    // preloadNextSet();
  }

  function setup() {
    console.log('Explore Gallery > Set Up');
    createSetsWithPreviews(createPreview, createSet);
    setDefaultView();
    observers();
  }

  setup();
};
