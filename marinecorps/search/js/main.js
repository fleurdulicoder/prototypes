var SearchAnimation = {
  state: 0,
  icons: [],
  input: null,
  search: null,

  vars: function() {
    this.icons = [
      document.getElementById("facebook-icon") || null,
      document.getElementById("twitter-icon") || null,
      document.getElementById("youtube-icon") || null,
      document.getElementById("instagram-icon") || null,
      document.getElementById("flickr-icon") || null,
      document.getElementById("rss-icon") || null
    ];

    this.input = document.getElementById('input-wrap') || null;
    this.search = document.getElementById('show-search') || null;
  },

  animate: function(version) {
    var timeline = new TimelineMax({ paused: true });

    switch(version) {
      case 'A':
      break;

      default:
        timeline
          .to(this.icons, 0.4, {
             opacity: 0,
             transform: 'rotate(90deg) scale(0.0001)'
          })
          .fromTo(this.input, 0.4,{
            opacity: 0,
            transform: 'scaleX(0.001)'
          }, {
            opacity: 1,
            transform: 'scaleX(1)'
          }, "-=0.15")
        ;
    }


    this.search.addEventListener('click', function(){
      if (SearchAnimation.state == 0) {
        timeline.play();
        SearchAnimation.state = 1;
      } else {
        timeline.reverse();
        SearchAnimation.state = 0;
      }
    }, false);
  },

  init: function(version) {
    this.vars();
    this.animate(version);
  }

};

document.addEventListener('DOMContentLoaded', function() {
  SearchAnimation.init();
}, false);
