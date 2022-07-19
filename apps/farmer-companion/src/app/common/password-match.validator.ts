import { AbstractControl } from '@angular/forms';

/**
 * Validator that requires controls to have the same value.
 * Looks for a pair of controls in the given FormGroup.
 * Control names must be "password" and "confirmPassword".
 * @param control control to validate
 * @returns Returns passwordMismatch error if validation fails
 */
export function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const password = control.get('password');
  if (!password) {
    throw new Error('passwordMatchValidator: password control is undefined');
  }
  const passwordConfirm = control.get('passwordConfirm');
  if (!passwordConfirm) {
    throw new Error(
      'passwordMatchValidator: passwordConfirm control is undefined'
    );
  }

  if (password.value !== passwordConfirm.value) {
    return { passwordMismatch: true };
  }
  return null;
}
