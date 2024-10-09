import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Check if value is present
    if (!value) {
      return { required: true };
    }

    // Check length of at least 8 characters
    if (value.length < 8) {
      return { minLength: true };
    }

    // If all validations pass, return null
    return null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Check if value is present
    if (!value) {
      return { required: true };
    }

    // Check length of at least 8 characters
    if (value.length < 8) {
      return { minLength: true };
    }

    // Check if there is at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(value);
    if (!hasUppercase) {
      return { uppercaseRequired: true };
    }

    // Check if there is at least one symbol
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!hasSymbol) {
      return { symbolRequired: true };
    }

    // Check if there is at least one number
    const hasNumber = /\d/.test(value);
    if (!hasNumber) {
      return { numberRequired: true };
    }

    // If all validations pass, return null
    return null;
  };
}

