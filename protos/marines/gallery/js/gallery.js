  var ExploreGallery = ExploreGallery || function(config) {
    var element = config.galleryId ? document.getElementById(config.galleryId) : null;
    var slider = element.querySelector('.preview-section');
    var previews = element.querySelectorAll('.preview');
    var prev = config.previousId ? document.getElementById(config.previousId) : null;
    var next = config.nextId ? document.getElementById(config.nextId) : null;

    var sets = [],
      currentSet = 1,
      increment = config.inview || 1;

    function breakIntoSets(num) {
      for (var i = 0, len = previews.length; i < len; i += num) {
        var tmp = [];
        for (var j = 0; j < config.inview; j++) {
          tmp.push(previews[i + j]);
        }
        sets.push(tmp);
      }
    }

    function setup() {
      breakIntoSets(increment);
    }
  };
