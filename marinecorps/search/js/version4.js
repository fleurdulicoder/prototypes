
SearchAnimation = SearchAnimation || {};
SearchAnimation.animate = function() {
  var timeline = new TimelineMax({ paused: true });

  timeline.set(this.icons, {
    transformOrigin: 'bottom center'
  });

  timeline
    .to(this.icons, 0.2, {
      opacity: 0,
      transform: 'scale(0.5)',
      ease: 'cubic-bezier(0,0,0,1.1)'
    })
    .fromTo(this.input, 0.4,{
      opacity: 0,
      y: -5,
      ease: 'cubic-bezier(0,0,0,1.1)'
    }, {
      opacity: 1,
      y: 0,
      ease: 'cubic-bezier(0,0,0,1.1)'
    })
  ;

  var morph = new TimelineMax({ paused: true });
  morph
    .to('#magnifier', 0.4, {morphSVG: {shape: "#cross", shapeIndex:5}})
  ;

  this.search.addEventListener('click', function(){
    if (SearchAnimation.state == 0) {
      timeline.play();
      morph.play();
      SearchAnimation.state = 1;
    } else {
      timeline.reverse();
      morph.reverse();
      SearchAnimation.state = 0;
    }
  }, false);
};
