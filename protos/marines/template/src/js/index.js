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
    TweenMax.to(mobilenav, 0.6, {
      x: '0%',
      ease: 'cubic-bezier(.67,.54,.43,.78)',
    });
  }, false);

  buttonClose.addEventListener('click', () => {
    TweenMax.to(mobilenav, 0.6, {
      x: '-100%',
      ease: 'cubic-bezier(.67,.54,.43,.78)',
    });
  }, false);
}, false);
