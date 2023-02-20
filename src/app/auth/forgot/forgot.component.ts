import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth service/auth.service';
import {
  PatternValidation,
  RequiredValidation,
} from 'src/app/shared/validations/validations';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  errorList: string = '';
  forgotform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService
  ) {
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
    this.auth.forgot(data).subscribe((res) => {
      this.toast.success(res['message']);
      this.forgotform.reset();
    });
  }
  inputRequiredValidation(forgotform: FormGroup, type: string): boolean {
    return RequiredValidation(forgotform, type);
  }

  inputPatternValidation(forgotForm: FormGroup, type: string): boolean {
    return PatternValidation(forgotForm, type);
  }
}
