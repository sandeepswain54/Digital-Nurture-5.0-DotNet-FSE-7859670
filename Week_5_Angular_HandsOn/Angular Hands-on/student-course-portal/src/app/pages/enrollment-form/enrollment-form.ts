import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css'
})
export class EnrollmentForm {

  // Form submitted state
  submitted = false;

  // Form model
  formData = {
    studentName: '',
    studentEmail: '',
    courseId: null,
    preferredSemester: '',
    agreeToTerms: false
  };

  // Handle form submission
  onSubmit(form: NgForm) {
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);

    if (form.valid) {
      this.submitted = true;
      console.log('Form submitted successfully!');
    }
  }

  // Reset form
  onReset(form: NgForm) {
    form.resetForm();
    this.submitted = false;
  }
}
