import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  errorList: any = '';
  changeform: FormGroup;
  constructor(private fb: FormBuilder) {
    this.changeform = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      cpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  submit() {}
  inputRequiredValidation(changeform: FormGroup, type: string): boolean {
    return (
      (changeform.get(type).touched || changeform.get(type).dirty) &&
      changeform.get(type)?.errors !== null &&
      changeform.get(type)?.errors.required
    );
  }

  inputPatternValidation(changeform: FormGroup, type: string): boolean {
    return (
      (changeform.get(type)?.touched || changeform.get(type)?.dirty) &&
      changeform.get(type)?.errors !== null &&
      changeform.get(type)?.errors.pattern
    );
  }
  checkPasswordValidation(
    changeform: FormGroup,
    password: string,
    confirmpassword: string
  ): boolean {
    return (
      (changeform.get(confirmpassword).touched ||
        changeform.get(confirmpassword).dirty) &&
      changeform.get(password)?.value !== changeform.get(confirmpassword)?.value
    );
  }
}
