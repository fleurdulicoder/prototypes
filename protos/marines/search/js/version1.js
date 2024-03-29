SearchAnimation = SearchAnimation || {};
SearchAnimation.animate = function() {
  var timeline = new TimelineMax({ paused: true });

  timeline
    .to(this.icons, 0.3, {
      opacity: 0,
      transform: 'rotate(90deg) scale(0.0001)',
      ease: 'cubic-bezier(0,0,0,1.1)'
    })
    .fromTo(this.input, 0.4,{
      opacity: 0,
      transform: 'scaleX(0.001)',
      ease: 'cubic-bezier(0,0,0,1.1)'
    }, {
      opacity: 1,
      transform: 'scaleX(1)',
      ease: 'cubic-bezier(0,0,0,1.1)'
    }, "-=0.15")
  ;

  this.search.addEventListener('click', function(){
    if (SearchAnimation.state == 0) {
      timeline.play();
      SearchAnimation.state = 1;
    } else {
      timeline.reverse();
      SearchAnimation.state = 0;
    }
  }, false);
};
