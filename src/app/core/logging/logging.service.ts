import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  logError(message: string, stack: string) {
    // Send errors to server here
    console.log('LoggingService: ' + message);
  }
}
