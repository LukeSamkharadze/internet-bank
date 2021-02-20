import { SafePipe } from './safe.pipe';
import { DateAgoPipe } from './date-ago.pipe';

export { SafePipe };
export { DateAgoPipe };

export const SharedPipes = [SafePipe, DateAgoPipe];
