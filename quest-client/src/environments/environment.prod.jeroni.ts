import { AocAppConfig } from '@atlantis-of-code/aoc-client/core/configs';

export const environment = {
  production: true
};

const Config = new AocAppConfig();
Config.APP_ID = 'quest';
Config.PROGRAM_NAME = 'Quest';
Config.SERVER_URL = '';
Config.BASE_HREF = '/';
Config.MULTI_TENANCY = false;
Config.TAB_DEFAULT_MENU_ITEMS = ['/dashboard']; // Tabs that will be opening at start
Config.DISABLE_COMPONENT_CACHE_FOR_ROUTES = []; // Tabs (or routes) that won't be cached/reused
Config.LOGGER = { // Optional
  level: 'INFO',
  sourceMaps: true, // Optional
};
Config.PDFJS_URL = '/pdfjs-3.0.279-legacy-dist/web/viewer.html';

export { Config };
