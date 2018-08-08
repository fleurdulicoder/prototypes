import TweenMax from 'gsap/TweenMax';

class Carousel {
  constructor(stripId, pagerId, leftControlId, rightControlId) {
    this.strip = stripId ? document.getElementById(stripId) : null;
    this.pager = pagerId ? document.getElementById(pagerId) : null;
    this.leftControl = leftControlId ? document.getElementById(leftControlId) : null;
    this.rightControl = rightControlId ? document.getElementById(rightControlId) : null;
    if (!this.strip || !this.leftControl || !this.rightControl) return;

    this.leftControl.addEventListener('click', this.moveLeft, false);
    this.rightControl.addEventListener('click', this.moveRight, false);
    this.leftControl.addEventListener('touch', this.moveLeft, false);
    this.rightControl.addEventListener('touch', this.moveRight, false);

    this.init();
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
