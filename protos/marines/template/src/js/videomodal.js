function VideoModal(id) {
  const element = id ? document.getElementById(id) : null;

  const bg = document.createElement('div');
  bg.className = 'video-background';
  document.body.appendChild(bg);

  const hide = () => {
    element.style.display = 'none';
    document.body.classList.remove('noscroll');
    document.removeEventListener('click', close);
    document.removeEventListener('touch', close);
    document.body.removeChild(bg);
  };

  const show = () => {
    element.style.display = 'block';
    document.body.classList.add('noscroll');
    window.setTimeout(() => {
      element.classList.add('show');
    }, 600);
  };

  const close = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target, e.currentTarget);
    if (!element.contains(e.target)) {
      element.classList.remove('show');
      window.setTimeout(() => hide(), 600);
    }
  };

  const init = () => {
    element.classList.add('fade');
    document.addEventListener('click', e => close(e), false);
    document.addEventListener('touch', e => close(e), false);
  };

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
    e.stopPropagation();
    let el = e.target || e.srcElement;
    if (el.nodeType === 3) el = el.parentNode;
    const attr = el.hasAttribute('data-load')
      ? el.getAttribute('data-load')
      : el.parentNode.getAttribute('data-load');
    const modal = attr ? new VideoModal(attr) : null;
    if (modal) modal.show();
  };

  videotriggers.forEach((trigger) => {
    trigger.addEventListener('click', load, false);
    trigger.addEventListener('touch', load, false);
  });
}

export default VideoFactory;
