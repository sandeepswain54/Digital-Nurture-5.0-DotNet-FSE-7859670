import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EnrollmentService } from '../../services/enrollment';

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

  // Set when the entered email was already used to enroll
  duplicateEmailError = false;

  // Form model
  formData = {
    studentName: '',
    studentEmail: '',
    courseId: null,
    preferredSemester: '',
    agreeToTerms: false
  };

  constructor(private enrollmentService: EnrollmentService) {}

  // Handle form submission
  onSubmit(form: NgForm) {
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);

    if (!form.valid) {
      return;
    }

    // Block enrollment if this email already enrolled before
    if (this.enrollmentService.isEmailTaken(this.formData.studentEmail)) {
      this.duplicateEmailError = true;
      return;
    }

    this.duplicateEmailError = false;
    this.enrollmentService.registerEmail(this.formData.studentEmail);
    this.submitted = true;
    console.log('Form submitted successfully!');
  }

  // Clear the duplicate-email error once the user edits the field
  onEmailChange() {
    this.duplicateEmailError = false;
  }

  // Reset form
  onReset(form: NgForm) {
    form.resetForm();
    this.submitted = false;
    this.duplicateEmailError = false;
  }
}
