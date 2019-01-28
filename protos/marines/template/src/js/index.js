// import Announcer from './announcement';
import '../scss/index.scss';
import $ from 'jquery';
import { TweenMax } from 'gsap';
import 'smartmenus';
import 'smartmenus-bootstrap-4';
import 'smartmenus-keyboard';
import VideoFactory from './videomodal';

// prototype for mobile menu
const mobilenav = document.getElementById('mobileNav');
const buttonOpen = document.getElementById('openMobileNav');
const buttonClose = document.getElementById('closeMobileNav');

document.addEventListener('DOMContentLoaded', () => {
  // commenting out for now
  // const announcer = new Announcer(
  //   'on-point-message',
  //   'on-point-chevron-left',
  //   'on-poisnt-chevron-right',
  //   'on-point-pager',
  //   'on-point-close',
  // );
  // announcer.show();
  $('#navbar-nav').smartmenus({
    mainMenuSubOffsetX: -1,
    subMenusSubOffsetX: 10,
    subMenusSubOffsetY: 0,
    subIndicators: false,
  });

  VideoFactory();

  buttonOpen.addEventListener('click', () => {
    TweenMax.to(mobilenav, 0.8, {
      x: 0,
      ease: 'ease-in-out',
    });
  }, false);

  buttonClose.addEventListener('click', () => {
    TweenMax.to(mobilenav, 0.8, {
      x: '-100%',
      ease: 'ease-in-out',
    });
  }, false);
}, false);
