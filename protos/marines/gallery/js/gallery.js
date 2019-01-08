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
    console.log('ExploreGallery > Create Gallery Objects');
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

  // views array and sets array are in stone, previews array is changeable
  var sets = []; // forever
  function createSet() {
    console.log('Explore Gallery > Create Set');
    var tmp = document.createElement('div');
    tmp.className = 'preview-set';
    slider.appendChild(tmp);
    sets.push(tmp);
    return tmp;
  }

  // var previews = [];
  function createPreview(galleryItem, parent) {
    console.log('Explore Gallery > Create Preview');
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
      if (!parent.previews)
        parent.previews = [];
      parent.previews.push(tmp); // ref
    }
    return tmp;
  }

  function reloadPreview(galleryItem, parent) {
    console.log('Explore Gallery > Reload Preview');
    var reloadingPreview;
    if (parent.previews.length == 0) {
      reloadingPreview = parent.querySelector('.preview:nth-child(1)');
    } else {
      reloadingPreview = parent.querySelector('.preview:nth-child(2)');
    }
    var image = reloadingPreview.querySelector('img');
    image.setAttribute('alt', galleryItem.title);
    image.setAttribute('src', galleryItem.src);
  }

  function createSetsWithPreviews(createSetCallback, reloadPreviewCallback) {
    console.log('Create Sets with Previews >');
    var total = Math.floor(quantity / increment) * increment;
    var newSets = [], newPreviews = [];
    var count = -1, activeSetElement, activePreview;
    for (var i = 0; i < total; i++) {
      if (i % 2 == 0) {
        count++;
        activeSetElement = sets.indexOf(count) > -1
          ? sets[count]
          : createSetCallback()
        ;
        if (activeSetElement.previews)
          activeSetElement.previews = [];
      }
      reloadPreviewCallback(gallery[i], activeSetElement); // previews.push()
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

  function loadNextSet(loadingSet) {
    TweenMax.set(loadingSet, {
      display: 'block',
      opacity: 1
    });
  }

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
    clicked.view.classList.add('current');
    activeImageSlide.classList.remove('current');
    activeImageSlide = clicked.view;
    reloadPreviewsInSets();
    //preloadNextSet();
    // resetPreviews();
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

  // @// DEBUG:
  function reloadPreviewsInSets() {
    console.log('Explore Gallery > Reload Previews');
    reloadGallery();
    createSetsWithPreviews(function(){
      activeSet++;
    }, function(){

    });
    console.log(sets);
  }

  function reloadGallery() {
    gallery.push(gallery.shift());
    gallery.push(gallery.shift());
  }

  function setup() {
    console.log('Explore Gallery > Set Up');
    createSetsWithPreviews(createSet, createPreview);
    setDefaultView();
    //observers();
    reloadPreviewsInSets();
    // sortPreviews();
  }

  setup();
};
