import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';


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
    }),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyCuVQGqY6_N72saxZ_AyoHzPbv1wBQZ6QI",
        authDomain: "mano-amiga-74984.firebaseapp.com",
        projectId: "mano-amiga-74984",
        storageBucket: "mano-amiga-74984.firebasestorage.app",
        messagingSenderId: "1080466286966",
        appId: "1:1080466286966:web:236da3574d38663970b257",
        measurementId: "G-DTP5H0M8XK"
      })
    ),
    provideAuth(() => getAuth())
  ]
};
