import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
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
  errorList: string = '';
  patternvalidation: boolean = false;
  correctPassword: boolean = false;
  newPassword: boolean = false;
  changePasswordApi: Subscription;
  buttonloader: boolean = false;
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
    this.artist.userData().subscribe((res) => {
      this.useravatar = res['data'].avatar;
      this.username = res['data'].userName;
    });
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('login');
    localStorage.removeItem('band');
    this.route.navigateByUrl('/auth/login');
    this.toaster.success('You have been logged Out');
  }
  myProfileRoute() {
    this.route.navigateByUrl('/artist/profile');
  }
  changePassword() {
    this.changePasswordModal = true;
  }
  inputRequiredValidation(
    changePasswordForm: FormGroup,
    type: string
  ): boolean {
    this.correctPassword =
      (changePasswordForm.get(type).touched ||
        changePasswordForm.get(type).dirty) &&
      changePasswordForm.get(type)?.errors !== null &&
      changePasswordForm.get(type)?.errors.required;
    return this.correctPassword;
  }
  // pattern Error Messages
  inputPatternValidation(changePasswordForm: FormGroup, type: string): boolean {
    this.patternvalidation =
      (changePasswordForm.get(type)?.touched ||
        changePasswordForm.get(type)?.dirty) &&
      changePasswordForm.get(type)?.errors !== null &&
      changePasswordForm.get(type)?.errors.pattern;
    return this.patternvalidation;
  }
  // Password checking Validation
  checkPasswordValidation(
    changePasswordForm: FormGroup,
    password: string,
    confirmpassword: string
  ): boolean {
    this.newPassword =
      (changePasswordForm.get(confirmpassword).touched ||
        changePasswordForm.get(confirmpassword).dirty) &&
      changePasswordForm.get(password)?.value !==
        changePasswordForm.get(confirmpassword)?.value;
    return this.newPassword;
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
    this.changePasswordApi?.unsubscribe();
    this.changePasswordForm.reset();
    this.changePasswordModal = false;
  }
  save() {
    this.buttonloader = true;
    if (this.changePasswordForm.invalid) {
    } else {
      let object = {
        currentPassword: this.changePasswordForm.value.oldpassword,
        password: this.changePasswordForm.value.password,
      };
      this.changePasswordApi = this.artist
        .changePassword(object)
        .subscribe((res) => {
          this.buttonloader = false;
          this.toaster.success(res['message']);
          this.changePasswordForm.reset();
          this.changePasswordModal = false;
        });
    }
  }
}
