SearchAnimation.animate = function() {
  var timeline = new TimelineMax({ paused: true });

  timeline
    .to(this.icons.slice(0,3), 0.4, {
      opacity: 0,
      left: -48,
      ease: 'cubic-bezier(0,0,0,1.1)'
    })
    .to(this.icons.slice(3), 0.4, {
      opacity: 0,
      left: 288,
      ease: 'cubic-bezier(0,0,0,1.1)'
    }, '-=0.4')
    .fromTo(this.input, 0.4,{
      opacity: 0,
      transform: 'scaleX(0.001)',
      ease: 'cubic-bezier(0,0,0,1.1)'
    }, {
      opacity: 1,
      transform: 'scaleX(1)',
      ease: 'cubic-bezier(0,0,0,1.1)'
    }, "-=0.4")
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
}
