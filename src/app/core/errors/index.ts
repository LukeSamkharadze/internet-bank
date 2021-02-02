import { ErrorService } from './error.service';
import { GlobalErrorHandler } from './global-error-handler';
import { ServerErrorInterceptor } from './server-error.interceptor';

/**
 * basic example for bulk export
 * @pros: short and simple
 * @cons: dont see clearly what is exported, cannot be separately exported
 *
 * `used with spread operator:`
 * ```ts
 * @NgModule({
 *   imports: [
 *     ...components
 *   ],
 *    providers: [
 *     ...services
 *   ]
 * })
 * ```
 */
export const services = [
    ErrorService,
    GlobalErrorHandler,
    ServerErrorInterceptor
];

/**
 * export all content from separate files
 */
export * from './error.service';
export * from './global-error-handler';
export * from './server-error.interceptor';
