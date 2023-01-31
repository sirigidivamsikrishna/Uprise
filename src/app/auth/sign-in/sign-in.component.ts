import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  checked: Boolean = false;
  errorList: any = '';
  signinform: FormGroup;
  userData: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.signinform = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z]).+$')],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    if (!!localStorage.getItem('accessToken')) {
      this.router.navigate(['/artist']);
    }
  }
  submit() {
    const Data = this.signinform.value;
    this.auth.signin(Data).subscribe((res: any) => {
      // this.userData = res.data.user;
      if (this.checked == true) {
        let string = JSON.stringify(Data);

        // CryptoJS.AES.encrypt('Message', 'My Secret Passphrase');
        localStorage.setItem('loginCreden', string);
      }
      this.toast.success(`${res['message']}`);
      let login = JSON.stringify(res);
      let band = JSON.stringify(res.data.user.bands[0]);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('login', login);
      localStorage.setItem('band', band);
      let timer = setTimeout(() => {
        this.router.navigate(['/artist']);
      }, 2000);
    });
    // this.checked = false;
  }
  inputRequiredValidation(signinform: FormGroup, type: string): boolean {
    return (
      (signinform.get(type).touched || signinform.get(type).dirty) &&
      signinform.get(type)?.errors !== null &&
      signinform.get(type)?.errors.required
    );
  }
}
