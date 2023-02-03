import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import API from 'dc-api-client';

API.settings.secure = false;
API.settings.base = `${location.hostname}:8081`;
API.settings.useKebab = true;

if (environment.production) {
  enableProdMode();

  API.settings.secure = true;
  API.settings.base = `api.nehost.ru`;
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
