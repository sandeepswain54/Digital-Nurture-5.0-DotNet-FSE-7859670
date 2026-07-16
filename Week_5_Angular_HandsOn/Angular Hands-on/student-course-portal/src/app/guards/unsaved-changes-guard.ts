import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

export const unsavedChangesGuard:
  CanDeactivateFn<ReactiveEnrollmentForm> =
  (component) => {

  // Check if form is dirty (user made changes)
  if (component.enrollForm &&
      component.enrollForm.dirty) {
    return window.confirm(
      'You have unsaved changes. Leave anyway?'
    );
  }
  return true;
};
