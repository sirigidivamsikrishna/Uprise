import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  username: string;
  useravatar: string;
  defaultavatar: string = 'http://50.19.24.41/assets/images/profilepic2.png';
  changePasswordModal: boolean = false;
  changePasswordForm: FormGroup;
  errorList: any = '';
  constructor(
    private route: Router,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private artist: ArtistService
  ) {
    this.changePasswordForm = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(8)]],
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
  ngOnInit(): void {
    let loginData = JSON.parse(localStorage.getItem('login'));
    // console.log(loginData.data.user.userName, 'king');
    this.username = loginData.data.user.userName;
    this.useravatar = loginData.data.user.avatar;
    // console.log(this.useravatar);
  }
  logout() {
    localStorage.clear();
    let timer = setTimeout(() => {
      this.route.navigateByUrl('/auth/login');
    }, 2000);

    this.toaster.success('You have been logged Out');
  }
  changePassword() {
    this.changePasswordModal = true;
  }
  inputRequiredValidation(
    changePasswordForm: FormGroup,
    type: string
  ): boolean {
    return (
      (changePasswordForm.get(type).touched ||
        changePasswordForm.get(type).dirty) &&
      changePasswordForm.get(type)?.errors !== null &&
      changePasswordForm.get(type)?.errors.required
    );
  }
  // pattern Error Messages
  inputPatternValidation(changePasswordForm: FormGroup, type: string): boolean {
    return (
      (changePasswordForm.get(type)?.touched ||
        changePasswordForm.get(type)?.dirty) &&
      changePasswordForm.get(type)?.errors !== null &&
      changePasswordForm.get(type)?.errors.pattern
    );
  }
  // Password checking Validation
  checkPasswordValidation(
    changePasswordForm: FormGroup,
    password: string,
    confirmpassword: string
  ): boolean {
    return (
      (changePasswordForm.get(confirmpassword).touched ||
        changePasswordForm.get(confirmpassword).dirty) &&
      changePasswordForm.get(password)?.value !==
        changePasswordForm.get(confirmpassword)?.value
    );
  }
  // new Password Validation
  changePasswordValidation(
    changePasswordForm: FormGroup,
    password: string,
    oldpassword: string
  ): boolean {
    return (
      (changePasswordForm.get(password).touched ||
        changePasswordForm.get(password).dirty) &&
      changePasswordForm.get(password)?.value ==
        changePasswordForm.get(oldpassword)?.value
    );
  }
  close() {
    this.changePasswordForm.reset();
    this.changePasswordModal = false;
  }
  save() {
    if (this.changePasswordForm.invalid) {
    } else {
      let object = {
        currentPassword: this.changePasswordForm.value.oldpassword,
        password: this.changePasswordForm.value.password,
      };
      this.artist.changePassword(object).subscribe((res) => {
        this.toaster.success(res['message']);
        this.changePasswordForm.reset();
        this.changePasswordModal = false;
      });
    }
  }
}
