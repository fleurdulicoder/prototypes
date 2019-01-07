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

  var currentSet = 0, activeImage, increment = config.inview || 1, quantity = previews.length;

  function loadTrio(e) {
    console.log('Explore Gallery > Load Trio');
    e.preventDefault();
    var clicked = e.target;
    while(!clicked.classList.contains('preview')) {
      clicked = clicked.parentNode;
    }
    if (clicked.view.id !== activeImage.id) {
      clicked.view.classList.add('current');
      activeImage.classList.remove('current');
      activeImage = clicked.view;
      preloadNextSet();
    }
  }

  var slideTemplate = function(obj) {
    var html =
    '<img src="'+obj.src+'" alt="'+obj.title+'" /> \
     <div class="caption-section light"> \
      <div class="container"> \
        <div class="row"> \
          <div class="col-12"> \
            <h4 class="title light">'+obj.title+'</h4> \
            <p class="author">'+obj.byline+'</p> \
            <aside> \
              <a href="'+obj.src+'" class="download-link" download="'+obj.src+'">Download</a> \
              <a href="'+obj.link+'" class="details-link" title="Details">Details</a> \
            </aside> \
          </div> \
        </div> \
      </div> \
    </div>';
    return html;
  };

  function observers() {
    if (prev && next) {
      prev.addEventListener('click', function(e){}, false);
      next.addEventListener('click', function(e){}, false);
      prev.addEventListener('touch', function(e){}, false);
      next.addEventListener('touch', function(e){}, false);
    }
    for (var x = 0; x < quantity; x++) {
      previews[x].querySelector('a').addEventListener('click', function(e){
        loadTrio(e);
      }, false);
    }
  }

  var sets = [];
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
      // var image = document.createElement('img');
      // image.setAttribute('id', 'explore-image-'+node.getAttribute('data-id'));
      // image.setAttribute('src', node.getAttribute('data-imgsrc'));
      // image.setAttribute('alt', node.getAttribute('data-title'));
      // view.appendChild(image);
      // node.view = image;
      var slide = document.createElement('div');
      slide.id = 'explore-view-slide-'+node.getAttribute('data-id');
      slide.className = "item";
      slide.innerHTML = slideTemplate({
        src: node.getAttribute('data-imgsrc'),
        title: node.getAttribute('data-title'),
        byline: node.getAttribute('data-byline'),
        link: node.getAttribute('data-link')
      });
      view.appendChild(slide);
      node.view = slide;
    };

    for (var x = 0; x < quantity; x++) {
      var node = previews[x];
      addMainImageTo(node);
    }
  }

  function getNextSet() {
    if ((currentSet + 1) < sets.length) {
      console.log(sets[currentSet+1]);
      return sets[++currentSet];
    } else {
      currentSet = 0;
      console.log(sets[0]);
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
    console.log('Explore Gallery > Preload Next Set');
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
