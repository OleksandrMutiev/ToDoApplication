import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CustomDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(timeInISOSString: Date): Date {
    return new Date(timeInISOSString);
  }
}
