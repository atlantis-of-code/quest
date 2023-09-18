import { AocAppConfig } from '@atlantis-of-code/aoc-client/core/configs';

export const environment = {
  production: true
};

export const Config: AocAppConfig = {
  APP_ID: 'quest',
  PROGRAM_NAME: 'Quest for atlantis',
  SERVER_URL: '',
  BASE_HREF: '/',
  MULTI_TENANCY: false,
  TAB_DEFAULT_MENU_ITEMS: ['/dashboard'], // Tabs to open at start
  DISABLE_COMPONENT_CACHE_FOR_ROUTES: [], // Tabs (or routes) that won't be cached/reused // TODO: these should be by default!
  DO_NOT_SHOW_AOC_FAVICON_IN_DEVMODE: false, // Optional, default is undefined which will be falsy
  LOGGER: {
    level: 'ERROR'
  },
  PDFJS_URL: '/pdfjs-3.0.279-legacy-dist/web/viewer.html'
};
