import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "eureka-1b361", appId: "1:232618909879:web:2f61cf94d5a9b903846d32", storageBucket: "eureka-1b361.firebasestorage.app", apiKey: "AIzaSyDCWGMiG3U4TKErf5r9fff7QNFI1IHHLB8", authDomain: "eureka-1b361.firebaseapp.com", messagingSenderId: "232618909879" })), provideFirestore(() => getFirestore())]
};
