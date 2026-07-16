import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  standalone: true,
  // pure: true by default
  // pure pipe only re-runs when input reference changes
  // pure: false would re-run on every change detection
})
export class CreditLabelPipe implements PipeTransform {

  transform(value: number | null): string {
    // Handle edge cases
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    // 1 → '1 Credit', 2+ → '2 Credits'
    return value === 1 ? '1 Credit' : `${value} Credits`;
  }
}
