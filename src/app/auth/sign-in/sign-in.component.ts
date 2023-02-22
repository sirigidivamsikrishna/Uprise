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
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RequiredValidation } from 'src/app/shared/validations/validations';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  checked: Boolean = false;
  errorList: string = '';
  signinform: FormGroup;
  signinButton: boolean;
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

  ngOnInit() {
    this.auth.errorEmitter.subscribe((res) => {
      console.log(res, 'hgc');
      // this.signinButton = false;
    });
    if (!!localStorage.getItem('accessToken')) {
      this.router.navigate(['/artist']);
    }
    if (localStorage.getItem('object')) {
      let object = JSON.parse(localStorage.getItem('object'));
      this.signinform.patchValue({
        email: window.atob(object.accessToken),
        password: window.atob(object.refreshToken),
      });
      this.checked = true;
    }
  }

  loadingButtonFunction() {
    this.signinButton = false;
  }
  submit() {
    this.signinButton = true;
    const Data = this.signinform.value;
    this.auth.signin(Data)?.subscribe((res: any) => {
      this.signinButton = false;
      if (this.checked == true) {
        let object = {
          accessToken: window.btoa(Data.email),
          refreshToken: window.btoa(Data.password),
        };
        localStorage.setItem('object', JSON.stringify(object));
      } else {
        localStorage.removeItem('object');
      }
      let login = JSON.stringify(res);
      let band = JSON.stringify(res.data.user.bands[0]);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('login', login);
      localStorage.setItem('band', band);
      this.router.navigate(['/artist']);
      //  for opening in another page
      // let url = this.router.serializeUrl(
      //   this.router.createUrlTree(['/artist'])
      // );
      // window.open(url)
      // or
      //  window.open('/artist');

      this.toast.success(`${res['message']}`);
    });
  }
  // Required Validations
  inputRequiredValidation(signinform: FormGroup, type: string): boolean {
    return RequiredValidation(signinform, type);
  }
}
