import Carousel from './carousel';

class Announcer {
  constructor(id, btnLeftId, btnRightId, pagerId, btnCloseId) {
    this.root = document.body;
    this.close = document.getElementById(btnCloseId) || null;
    this.carousel = new Carousel(id, pagerId, btnLeftId, btnRightId);
    this.observe();
  }

  observe() {
    if (this.close) {
      this.close.addEventListener('click', e => this.hide(e), false);
      this.close.addEventListener('touch', e => this.hide(e), false);
    }
  }

  hide() {
    this.root.className = this.root.className.replace(' with-on-point', '');
  }

  show() {
    setTimeout(() => {
      this.root.className = `${this.root.className} with-on-point`;
    }, 1400);
  }
}

export default Announcer;
