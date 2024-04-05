import { enableProdMode, ErrorHandler, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Importing sentry specific modules
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { CartModule } from './app/cart/cart.module';
import { AuthentificationModule } from './app/authentification/authentification.module';
import { ProductsModule } from './app/products/products.module';
import { TemplatesModule } from './app/templates/templates.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { routes } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';

// Init of sentry so it can catch errors and send them to Modis' server
Sentry.init({
  dsn: "http://29e72dbf368845edaadf7250e6a9e6f5@sentry.prod.modiscloud.net:9000/19",
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", "localhost:4200", "127.0.0.1"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  // So far so good, we're not using it so = 0
  tracesSampleRate: 0,
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes),provideRouter(routes),
        importProvidersFrom(BrowserModule, TemplatesModule, ProductsModule, AuthentificationModule, CartModule),
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: true,
            }),
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => { },
            deps: [Sentry.TraceService],
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
