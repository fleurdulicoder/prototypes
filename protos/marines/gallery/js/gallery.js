var ExploreGallery = ExploreGallery || function(config) {
  console.log('Inside Explore Gallery');
  var element = config.galleryId ? document.getElementById(config.galleryId) : null;
  if (!element) return;

  var previews = [], sets = [];
  var view = element.querySelector('.view'),
    views = view.querySelectorAll('.item'),
    slider = element.querySelector('.preview-section');

  console.log(view, views, slider);

  var  quantity = views.length,
    increment = 2,
    currentSet = 0,
    activeImage;

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

    var totalSets = Math.floor(quantity / 2);
    var count = -1, currentSetElement, currentPreview;
    console.log(totalSets, quantity, count);
    for (var i = 0; i < quantity; i++) {
      console.log('i = ', i);
      if (i % 2 == 0) {
        count++;
        if (count >= totalSets) break;
        currentSetElement = createSet(count);
        sets.push(currentSetElement);
      }
      currentPreview = createPreview(views[i], currentSetElement);
    }
    console.log(sets);
  }



  // function loadTrio(e) {
  //   console.log('Explore Gallery > Load Trio');
  //   e.preventDefault();
  //   var clicked = e.target;
  //   while(!clicked.classList.contains('preview')) {
  //     clicked = clicked.parentNode;
  //   }
  //   if (clicked.view.id !== activeImage.id) {
  //     clicked.view.classList.add('current');
  //     activeImage.classList.remove('current');
  //     activeImage = clicked.view;
  //     preloadNextSet();
  //   }
  // }

  // function observers() {
  //   // if (prev && next) {
  //   //   prev.addEventListener('click', function(e){}, false);
  //   //   next.addEventListener('click', function(e){}, false);
  //   //   prev.addEventListener('touch', function(e){}, false);
  //   //   next.addEventListener('touch', function(e){}, false);
  //   // }
  //   for (var x = 0; x < quantity; x++) {
  //     previews[x].querySelector('a').addEventListener('click', function(e){
  //       loadTrio(e);
  //     }, false);
  //   }
  // }


  //
  //
  // function getNextSet() {
  //   if ((currentSet + 1) < sets.length) {
  //     console.log(sets[currentSet+1]);
  //     return sets[++currentSet];
  //   } else {
  //     currentSet = 0;
  //     console.log(sets[0]);
  //     return sets[0];
  //   }
  // }

  // function loadNextSet(loadingSet) {
  //   TweenMax.set(loadingSet, {
  //     display: 'block',
  //     opacity: 1
  //   });
  // }
  //
  // function removeSet() {
  //   var activeSet = sets[currentSet];
  //   TweenMax.set(activeSet, {
  //     display: 'none',
  //     opacity: 0
  //   });
  // }
  //
  // function preloadNextSet() {
  //   console.log('Explore Gallery > Preload Next Set');
  //   removeSet();
  //   loadNextSet(getNextSet());
  // }
  //
  // function setDefaultView() {
  //   currentSet = 0;
  //   activeImage = previews[0].view;
  //   activeImage.classList.add('current');
  //   preloadNextSet();
  // }

  function setup() {
    console.log('Explore Gallery > Set Up');
    loadPreviews();
    // setDefaultView();
    // observers();
    // createCarousel();
  }

  setup();
};
