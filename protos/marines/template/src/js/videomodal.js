function VideoModal(id) {
  console.log('creating video modal > ', id);
  const element = id ? document.getElementById(id) : null;

  const init = () => {
    element.classList.add('fade');
  };

  const show = () => {
    console.log('adding body > noscroll, modal > block, show');
    element.style.display = 'block';
    document.body.classList.add('noscroll');
    element.classList.add('show');
  };

  const close = () => {
    console.log('close > no show, display none, scroll');
    element.classList.remove('show');
    window.setTimeout(() => {
      element.style.display = 'none';
      document.body.classList.remove('noscroll');
    }, 2000);
  };

  element.addEventListener('click', close, false);
  element.addEventListener('touch', close, false);

  if (element) {
    init();
  }

  return {
    show,
  };
}

function VideoFactory() {
  const videotriggers = document.body.querySelectorAll('.video-overlay');

  const load = (e) => {
    e.preventDefault();
    const el = e.target || e.srcElement;
    const attr = el.hasAttribute('data-load')
      ? el.getAttribute('data-load')
      : el.parentNode.getAttribute('data-load');
    const modal = attr ? new VideoModal(attr) : null;
    if (modal) modal.show();
  };

  videotriggers.forEach((obj) => {
    obj.addEventListener('click', load, false);
    obj.addEventListener('touch', load, false);
  });
}

export default VideoFactory;
