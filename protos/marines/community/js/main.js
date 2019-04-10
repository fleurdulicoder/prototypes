function FooterScene(controller) {
  const footer = document.querySelector('.page-wrapper > footer');
  const element = document.querySelector('.page-wrapper > footer > .container');
  if (footer && element) {
    const tween = TweenMax.to(element, 0.8, {
      opacity: 1,
      y: 0,
      ease: 'Power4.easeOut',
    });
    const scene = new ScrollMagic.Scene({
      triggerElement: footer,
      reverse: false,
      duration: 20
    })
      .setTween(tween)
      .addTo(controller);
    return scene;
  }
  return null;
}

function Page() {
  console.log('create controller');
  const controller = new ScrollMagic.Controller();
  var footerScene = new ScrollMagic.Scene({
      triggerElement: document.getElementById('marines-footer'),
      reverse: false,
      triggerHook: 0,
    })
    .setClassToggle('#marines-footer', 'fade-in')
    .addIndicators()
    .addTo(controller);

    footerScene.on("end", function (event) {
      console.log("Hit end point of scene.");
    });
  //FooterScene(controller);
}
