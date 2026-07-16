import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'asFormControl',
  standalone: true
})
export class AsFormControlPipe implements PipeTransform {
  transform(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
