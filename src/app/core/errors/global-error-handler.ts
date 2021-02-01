import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { AlertService } from '../alerts/alert.service';
import { LoggingService } from '../logging/logging.service';
import { ErrorService } from './error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(@Inject(Injector) private injector: Injector) {
  }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const alerter = this.injector.get(AlertService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      alerter.showError(message);
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      alerter.showError(message);
    }

    // Always log errors
    logger.logError(message, stackTrace);

    console.error(error);
  }
}
