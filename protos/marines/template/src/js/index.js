// import Announcer from './announcement';
import '../scss/index.scss';
import $ from 'jquery';
import 'smartmenus';
import 'smartmenus-bootstrap-4';
import 'smartmenus-keyboard';

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
}, false);
