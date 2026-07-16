import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder,
         FormGroup, FormArray, FormControl,
         Validators, AbstractControl,
         ValidationErrors } from '@angular/forms';
import { AsFormControlPipe } from '../../pipes/as-form-control-pipe';

// Custom synchronous validator
// Returns error if courseId starts with 'XX'
export function noCourseCode(
  control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.toString().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom async validator
// Simulates checking if email is already taken
export function simulateEmailCheck(
  control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (control.value &&
          control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
            AsFormControlPipe],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm
  implements OnInit {

  enrollForm!: FormGroup;
  submitted = false;

  // Using FormBuilder is better than new FormGroup()
  // because it is less verbose and more readable
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Build reactive form with FormBuilder
    this.enrollForm = this.fb.group({

      // studentName with sync validators
      studentName: ['',
        [Validators.required,
         Validators.minLength(3)]],

      // studentEmail with sync + async validators
      // async validator fires after sync validators pass
      studentEmail: ['',
        [Validators.required, Validators.email],
        [simulateEmailCheck]],

      // courseId with custom validator
      courseId: [null,
        [Validators.required, noCourseCode]],

      // preferredSemester
      preferredSemester: ['Odd',
        Validators.required],

      // agreeToTerms - requiredTrue checks checkbox
      // Validators.required only checks non-empty
      // Validators.requiredTrue checks checkbox is checked
      agreeToTerms: [false,
        Validators.requiredTrue],

      // FormArray for additional courses
      additionalCourses: this.fb.array([])
    });
  }

  // Typed getter for additionalCourses FormArray
  // Using getter is better than casting in template
  // because it keeps type safety in TypeScript
  get additionalCourses(): FormArray {
    return this.enrollForm.get(
      'additionalCourses') as FormArray;
  }

  // Add new course control to FormArray
  addCourse() {
    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );
  }

  // Remove course control from FormArray
  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  // Submit handler
  onSubmit() {
    console.log('Form Value:',
      this.enrollForm.value);

    // enrollForm.value excludes disabled controls
    // enrollForm.getRawValue() includes ALL controls
    console.log('Raw Value:',
      this.enrollForm.getRawValue());

    console.log('Form Valid:',
      this.enrollForm.valid);

    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  // Reset form
  onReset() {
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    // Clear additional courses
    while (this.additionalCourses.length) {
      this.additionalCourses.removeAt(0);
    }
    this.submitted = false;
  }
}
