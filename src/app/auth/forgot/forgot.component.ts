import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth service/auth.service';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  errorList: any = '';
  forgotform: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.forgotform = this.fb.group({
      email: [
        '',
        [
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$'
          ),
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  submit() {
    let data = this.forgotform.value;
    this.auth.forgot(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.error);
      }
    );
    this.forgotform.reset();
  }
  inputRequiredValidation(forgotform: FormGroup, type: string): boolean {
    return (
      (forgotform.get(type).touched || forgotform.get(type).dirty) &&
      forgotform.get(type)?.errors !== null &&
      forgotform.get(type)?.errors.required
    );
  }

  inputPatternValidation(forgotForm: FormGroup, type: string): boolean {
    return (
      (forgotForm.get(type)?.touched || forgotForm.get(type)?.dirty) &&
      forgotForm.get(type)?.errors !== null &&
      forgotForm.get(type)?.errors.pattern
    );
  }
}
