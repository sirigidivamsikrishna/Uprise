import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  PasswordValidation,
  PatternValidation,
  RequiredValidation,
} from 'src/app/shared/validations/validations';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {
  errorList: string = '';
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
    return RequiredValidation(changeform, type);
  }

  inputPatternValidation(changeform: FormGroup, type: string): boolean {
    return PatternValidation(changeform, type);
  }
  checkPasswordValidation(
    changeform: FormGroup,
    password: string,
    confirmpassword: string
  ): boolean {
    return PasswordValidation(changeform, password, confirmpassword);
  }
}
