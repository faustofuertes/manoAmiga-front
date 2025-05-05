import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    importProvidersFrom(HttpClientModule), 
    RouterModule,
    provideAuth0({
      domain: 'dev-q4rgvh0zqbt4ga7n.us.auth0.com',
      clientId: 'tLoSa4vUQ78DszYukPsRUvENYGlQuZPE',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};
