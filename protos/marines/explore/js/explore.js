/*
    ExploreCarousel - requires TimeMax & TimelineMax Libraries
    to be loaded via SharedLibrary UseGSAP) or Node (via skin).
    @developer Ella Musina (emusina@omnitecinc.com)
  */
  var ExploreCarousel = ExploreCarousel || function(config) {
    var container = config.container;
    var slides = container.children;
    var prev = config.prev;
    var next = config.next;
    var quantity = slides.length;
    var currentSlide, currentIndex, isAnimating = false;

    function observe() {
      if (prev && next) {
        prev.addEventListener('click', function(e){
          if (!isAnimating) slideInPrev();
        }, false);
        next.addEventListener('click', function(e){
          if (!isAnimating) slideInNext();
        }, false);
        prev.addEventListener('touch', function(e){
          if (!isAnimating) slideInPrev();
        }, false);
        next.addEventListener('touch', function(e){
          if (!isAnimating) slideInPrev();
        }, false);
      }
      jQuery(container).swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
          if (!isAnimating) slideInNext();
        },
        swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
          if (!isAnimating) slideInPrev();
        }
      });
    }

    function getCurrentSlide() {
      console.log('Explore Carousel > getCurrentSlide');
      for (var i = 0, len = slides.length; i < len; i++) {
        if (slides[i].classList.contains('current')) {
          currentIndex = i;
          currentSlide = slides[i];
          break;
        }
      }
    }

    function slideInNext() {
      console.log('Explore Carousel > slideInNext');
      isAnimating = true;
      getCurrentSlide();
      if ((currentIndex + 1) < quantity) {
        nextSlide = slides[++currentIndex];
      } else {
        currentIndex = 0;
        nextSlide = slides[currentIndex];
      }

      var timeline = new TimelineMax({
        paused: true,
        onComplete: function(){
          currentSlide.setAttribute('style', '');
          currentSlide.classList.remove('current');
          nextSlide.classList.add('current');
          currentSlide = nextSlide;
          isAnimating = false;
        }
      });

      timeline
        .set(nextSlide, {
          x: '100%',
          visibility: 'visible',
          opacity: 1
        })
        .to(currentSlide, 0.5, {
          x: '-100%',
          ease: 'cubic-bezier(0, 0, 0, 1.1)'
        }, 0.1)
        .to(nextSlide, 0.5, {
          x: '0%',
          ease:'cubic-bezier(0, 0, 0, 1.1)'
        }, 0.1);

      timeline.play();
    }

    function slideInPrev() {
      console.log('Explore Carousel > slideInPrev');
      isAnimating = true;
      getCurrentSlide();
      if ((currentIndex - 1) >= 0) {
        prevSlide = slides[--currentIndex];
      } else {
        currentIndex = quantity - 1;
        prevSlide = slides[currentIndex];
      }

      var timeline = new TimelineMax({
        paused: true,
        onComplete: function(){
          currentSlide.setAttribute('style', '');
          currentSlide.classList.remove('current');
          prevSlide.classList.add('current');
          currentSlide = prevSlide;
          isAnimating = false;
        }
      });

      timeline
        .set(prevSlide, {
          x: '-100%',
          visibility: 'visible',
          opacity: 1
        })
        .to(prevSlide, 0.5, {
          x: '0%',
          ease: 'cubic-bezier(0, 0, 0, 1.1)'
        }, 0.1)
        .to(currentSlide, 0.5, {
          x: '100%',
          ease: 'cubic-bezier(0, 0, 0, 1.1)'
        }, 0.1);

      timeline.play();
    }

    function setup() {
      observe();
    }

    setup();
  };

  /*
    ExploreGallery - Animated Pictures Gallery
  */
  var ExploreGallery = ExploreGallery || function(config) {
    var element = config.galleryId ? document.getElementById(config.galleryId) : null;
    if (!element) return;

    var sets = [];
    var view = element.querySelector('.view'),
      views = view.querySelectorAll('.item'),
      slider = element.querySelector('.preview-section'),
      pager = element.querySelector('.pager-section'),
      caption = element.querySelector('.caption-section'),
      captionTitle = caption.querySelector('.title'),
      captionByline = caption.querySelector('.byline'),
      captionDownloadLink = caption.querySelector('.download-link'),
      captionDetailsLink = caption.querySelector('.details-link'),
      previewObjects, isAnimating = false;
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
          src: views[i].getAttribute('data-src') || '',
          title: views[i].getAttribute('data-title') || 'Default Title',
          byline: views[i].getAttribute('data-byline') || 'Photo ByLine',
          link: views[i].getAttribute('data-link') || '#',
          view: views[i]
        };
        images.push(item);
      }
      return images;
    }

    var sets = [];
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

    function reloadPreview(galleryItem, parent) {
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

    function loadTrio(e) {
      e.preventDefault();
      var clicked = e.target;
      while(!clicked.classList.contains('preview')) {
        clicked = clicked.parentNode;
      }
      if (activeImageSlide.id !== clicked.view.id) {
        console.log(activeImageSlide.id,clicked.view.id);
        clicked.view.classList.add('current');
        activeImageSlide.classList.remove('current');
        activeImageSlide = clicked.view;
        reloadPreviewsInSets();
        loadCaption();
      }
      isAnimating = false;
    }

    function observe() {
      for (var x = 0, len = sets.length; x < len; x++) {
        sets[x].addEventListener('click', function(e) {
          if (!isAnimating) {
            isAnimating = true;
            loadTrio(e);
          }
        }, false);
      }
    }

    function reloadPreviewsInSets() {
      reloadGallery();
      createSetsWithPreviews(reloadPreview, function(){});
    }

    function reloadGallery() {
      gallery.push(gallery.shift());
      gallery.push(gallery.shift());
    }

    function loadFirstSet() {
      sets[0].classList.add('current');
    }

    function loadFirstImage() {
      activeSet = 0;
      activeImageSlide = views[0];
      activeImageSlide.classList.add('current');
    }

    var carouselDesktop, carouselMobile;
    function loadCarousels() {
      carouselDesktop = new ExploreCarousel({
        container: slider,
        prev: element.querySelector('.pager-section .pager-desktop .previous'),
        next: element.querySelector('.pager-section .pager-desktop .next'),
      });
      carouselMobile = new ExploreCarousel({
        container: view,
        prev: element.querySelector('.pager-section .pager-mobile .previous'),
        next: element.querySelector('.pager-section .pager-mobile .next')
      });
    }

    function loadDefaultView() {
      loadFirstSet();
      loadFirstImage();
      loadCaption();
      reloadPreviewsInSets();
    }

    function setup() {
      createSetsWithPreviews(createPreview, createSet);
      loadDefaultView();
      observe();
      if (sets.length <= 1) {
        pager.style.display = "none";
      } else {
        loadCarousels();
      }
    }

    setup();
  };
