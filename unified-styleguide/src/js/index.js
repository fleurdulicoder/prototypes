import '../scss/index.scss';
import $ from 'jquery';
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "ScrollToPlugin" }] */
import TweenMax from 'gsap/TweenMax';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const collapseHeader = (header, stickyPos) => {
  if (!header || !stickyPos) return;
  if (window.pageYOffset > stickyPos) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
};

const pinSidebar = (sidemenu) => {
  if (!sidemenu) return;
  if (window.pageYOffset > 499) {
    sidemenu.classList.add('sticky');
  } else {
    sidemenu.classList.remove('sticky');
  }
};

const scrollToSection = (e) => {
  e.preventDefault();
  const element = e.target ? e.target : e.srcElement;
  TweenMax.to(window, 0.35, {
    scrollTo: {
      y: element.getAttribute('href'),
      offsetY: 73,
    },
  });
};

const slideMenu = (e) => {
  const element = e.target ? e.target : e.srcElement;
  const checkbox = $(element);
  if (checkbox.prop('checked')) {
    $(checkbox).siblings('ul').attr('style', 'display:none;').slideDown(300);
    $(checkbox).siblings('label').addClass('rotate');
  } else {
    $(checkbox).siblings('ul').attr('style', 'display:block;').slideUp(300);
    $(checkbox).siblings('label').removeClass('rotate');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('navbar');
  const stickyPos = document.getElementById('main').offsetTop - 120;
  const sidemenu = document.getElementById('side-menu');

  window.onscroll = () => {
    collapseHeader(header, stickyPos);
    pinSidebar(sidemenu);
  };

  const links = document.querySelectorAll('.nav a');
  for (let i = 0, len = links.length; i < len; i += 1) {
    links[i].addEventListener('click', scrollToSection, false);
  }

  if (sidemenu) {
    const checkboxes = document.querySelectorAll('#side-menu input[type="checkbox"]');
    if (checkboxes && checkboxes.length > 0) {
      for (let j = 0; j < checkboxes.length; j += 1) {
        if (checkboxes[j]) {
          checkboxes[j].addEventListener('change', slideMenu);
        }
      }
    }
  }
}, false);
