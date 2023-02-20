// Required Validation
export function RequiredValidation(form, type: string): boolean {
  return (
    (form.get(type).touched || form.get(type).dirty) &&
    form.get(type)?.errors !== null &&
    form.get(type)?.errors.required
  );
}

// Pattern validation

export function PatternValidation(form, type: string): boolean {
  return (
    (form.get(type)?.touched || form.get(type)?.dirty) &&
    form.get(type)?.errors !== null &&
    form.get(type)?.errors.pattern
  );
}

export function PasswordValidation(
  form,
  password: string,
  confirmpassword: string
): boolean {
  return (
    (form.get(confirmpassword).touched || form.get(confirmpassword).dirty) &&
    form.get(password)?.value !== form.get(confirmpassword)?.value
  );
}
