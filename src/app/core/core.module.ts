import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  GlobalErrorHandler,
  ServerErrorInterceptor,
  ErrorService
} from './errors';
import { LoggingService } from './logging/logging.service';
import { AlertService } from './alerts/alert.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    LoggingService,
    AlertService,
    ErrorService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
