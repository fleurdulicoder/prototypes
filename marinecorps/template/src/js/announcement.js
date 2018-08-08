import Carousel from './carousel';

class Announcer {
  constructor(id, btnLeftId, btnRightId, pagerId, btnCloseId) {
    this.root = document.body;
    this.close = document.getElementById(btnCloseId);
    this.carousel = new Carousel(id, pagerId, btnLeftId, btnRightId);

    this.close.addEventListener('click', this.hide, false);
    this.close.addEventListener('touch', this.hide, false);
  }

  hide() {
    this.root.className = this.root.className.replace(' with-on-point', '');
  }

  open() {
    setTimeout(() => {
      this.root.className += ' with-on-point';
    }, 1400);
  }
}

export default Announcer;
