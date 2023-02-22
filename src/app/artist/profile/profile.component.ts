import { Component } from '@angular/core';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RequiredValidation } from 'src/app/shared/validations/validations';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  editProfile: boolean = false;
  profileHeader: string = 'Profile';
  userData: any = {};
  ProfilePic: string = '';
  profileForm: FormGroup;
  errorList: string = '';
  saveButton: boolean = false;
  constructor(
    private arist: ArtistService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private spin: NgxSpinnerService
  ) {
    this.profileForm = this.fb.group({
      userName: ['', Validators.required],
      email: [''],
      mobilenumber: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
    });
  }
  ngOnInit(): void {
    this.spin.show();
    this.gettingUserData();
    this.disableForm();
  }

  gettingUserData() {
    this.arist.userData().subscribe((res) => {
      this.spin.hide();
      this.userData = res['data'];
      this.ProfilePic = res['data'].avatar;
      this.profileForm.patchValue({
        email: res['data'].email,
        userName: res['data'].userName,
        mobilenumber: res['data'].mobile,
        facebook: res['data'].facebook,
        instagram: res['data'].instagram,
        twitter: res['data'].twitter,
      });
    });
  }

  disableForm() {
    this.profileForm.get('userName').disable();
    this.profileForm.get('email').disable();
    this.profileForm.get('mobilenumber').disable();
    this.profileForm.get('facebook').disable();
    this.profileForm.get('instagram').disable();
    this.profileForm.get('twitter').disable();
  }
  // Required Validations
  inputRequiredValidation(form: FormGroup, type: string): boolean {
    return RequiredValidation(form, type);
  }
  editProfileDetails() {
    this.editProfile = true;
    this.profileHeader = 'Edit profile';
    this.profileForm.get('userName').enable();
    this.profileForm.get('mobilenumber').enable();
    this.profileForm.get('facebook').enable();
    this.profileForm.get('instagram').enable();
    this.profileForm.get('twitter').enable();
  }
  uploadProfilePic() {}
  cancelProfileDetails() {
    this.disableForm();
    this.editProfile = false;
    this.profileHeader = 'Profile';
  }
  saveProfileDetails() {
    this.spin.show();
    this.saveButton = true;
    const Data = this.profileForm.value;
    const formData = new FormData();
    formData.append('email', this.userData.email);
    formData.append('userName', Data.userName);
    formData.append('mobile', Data.mobilenumber);
    formData.append('userId', this.userData.id);
    formData.append('instagram', Data.instagram);
    formData.append('twitter', Data.twitter);
    formData.append('facebook', Data.facebook);
    formData.append('avatarId', '5');
    this.arist.updateProfile(formData).subscribe((res) => {
      this.toast.success(`${res['message']}`);
      this.gettingUserData();
      this.editProfile = false;
      this.profileHeader = 'Profile';
      this.saveButton = false;
      this.disableForm();
    });
  }
}
