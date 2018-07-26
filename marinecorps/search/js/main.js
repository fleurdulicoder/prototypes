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

  init: function(version) {
    this.vars();
    this.animate(version);
  }

};

document.addEventListener('DOMContentLoaded', function() {
  SearchAnimation.init();
}, false);
