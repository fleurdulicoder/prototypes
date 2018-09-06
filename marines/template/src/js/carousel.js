import TweenMax from 'gsap/TweenMax';

class Carousel {
  constructor(stripId, leftControlId, rightControlId, pagerId) {
    this.strip = stripId ? document.getElementById(stripId) : null;
    this.leftControl = leftControlId ? document.getElementById(leftControlId) : null;
    this.rightControl = rightControlId ? document.getElementById(rightControlId) : null;
    this.pager = pagerId ? document.getElementById(pagerId) : null;
    if (!this.strip || !this.leftControl || !this.rightControl || !this.pager) return;

    this.init();
    this.observe();
  }

  init() {
    this.current = 0;
    this.quantity = this.strip.children.length;
    this.strip.style.width = `${this.quantity * 100}%`;
    this.pager.innerHTML = `${this.current + 1} of ${this.quantity}`;
    for (let i = 0; i < this.quantity; i += 1) {
      this.strip.children[i].style.width = `${100 / this.quantity}%`;
    }
  }

  observe() {
    this.leftControl.addEventListener('click', e => this.moveLeft(e), false);
    this.rightControl.addEventListener('click', e => this.moveRight(e), false);
    this.leftControl.addEventListener('touch', e => this.moveLeft(e), false);
    this.rightControl.addEventListener('touch', e => this.moveRight(e), false);
  }

  moveLeft() {
    if (this.current + 1 <= 0) {
      this.pager.innerHTML = `${Math.abs(this.current + 1) + 1} of ${this.quantity}`;
      this.current += 1;
      TweenMax.to(this.strip, 0.5, {
        x: `${this.current * 100}%`,
        ease: 'cubic-bezier(.67,.54,.43,.78)',
      });
    }
  }

  moveRight() {
    if (Math.abs(this.current - 1) < this.quantity) {
      this.pager.innerHTML = `${Math.abs(this.current - 1) + 1} of ${this.quantity}`;
      this.current -= 1;
      TweenMax.to(this.strip, 0.5, {
        x: `${this.current * 100}%`,
        ease: 'cubic-bezier(.67,.54,.43,.78)',
      });
    }
  }
}

export default Carousel;
