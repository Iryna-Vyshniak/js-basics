import '../styles/main.css';

import { initNavigation } from './modules/nav.js';
import { initBasicData } from './modules/basic.js';
import { initBasicDataTypes } from './modules/basics-data-types.js';
import { initSubmenu } from './modules/submenu.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSubmenu();

  const { page } = document.body.dataset;

  const pageModules = {
    home: initBasicData,
    'basics-data-types': initBasicDataTypes,
  };

  const initPage = pageModules[page];

  if (initPage) {
    initPage();
    return;
  }

  if (!page) {
    console.warn('[Router] Missing data-page attribute on <body>.');
    return;
  }

  console.info(`[Router] Page "${page}" loaded without a dedicated JS module.`);
});
