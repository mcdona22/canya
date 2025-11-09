import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/config/app.config';
import { App } from './app/app-component/app';

bootstrapApplication(App, appConfig)
  .then(() => {
    console.log(`App bootstrap success`);
  })
  .catch((err) => console.error(err));
