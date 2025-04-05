import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BarController, Colors, DoughnutController, Legend } from 'chart.js';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync() , provideHttpClient(), provideHttpClient(withInterceptors([authInterceptor]))
]
};
