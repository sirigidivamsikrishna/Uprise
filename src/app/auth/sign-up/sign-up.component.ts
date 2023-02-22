import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LocationService } from 'src/app/shared/services/location.service';
import { AuthService } from 'src/app/shared/services/auth service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {
  PasswordValidation,
  PatternValidation,
  RequiredValidation,
} from 'src/app/shared/validations/validations';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorList: string = '';
  text: string = '';
  results: string[];
  signupform: FormGroup;
  checked: boolean = false;
  avatarID: string;
  selectedAvatarId: string;
  avatarprofileImage: string;
  avatarSelectedImage: string;
  displayModal: boolean = false;
  profileImageclick: string;
  formattedaddress: string;
  latitude: string;
  longitude: string;
  addressState: string;
  avatarimages: { id: number; url: string }[];
  locationValidator: boolean = false;
  passwordValidator: boolean = false;
  constructor(
    private fb: FormBuilder,
    private location: LocationService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.signupform = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z]).+$')],
      ],
      email: [
        '',
        [
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-]{2,4}$'
          ),
          Validators.required,
        ],
      ],
      number: [''],
      bandname: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z]).+$')],
      ],
      location: ['', Validators.required],
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
    if (!!localStorage.getItem('accessToken')) {
      this.router.navigate(['/artist']);
    }
    this.auth.avatars().subscribe((res) => (this.avatarimages = res['data']));
  }

  locationChange(address: Address) {
    this.formattedaddress = address.formatted_address;
    this.signupform.patchValue({
      location: this.formattedaddress,
    });
    this.latitude = address.geometry.location.lat().toString();
    this.longitude = address.geometry.location.lng().toString();
    this.addressState = this.formattedaddress.split(',')[3];
    console.log(this.formattedaddress);
  }
  showAvatars() {
    this.displayModal = true;
  }
  avatarclick(avatar) {
    this.profileImageclick = avatar.url;
    this.avatarID = avatar.id;
  }
  avatarSelected() {
    this.avatarSelectedImage = this.profileImageclick;
    this.selectedAvatarId = this.avatarID;
    this.displayModal = false;
  }
  avatarCancel() {
    this.profileImageclick = this.avatarSelectedImage;
    this.displayModal = false;
    this.avatarID = this.selectedAvatarId;
  }
  removeprofilepic() {
    this.profileImageclick = null;
    this.avatarID = null;
  }

  submit() {
    const Data = this.signupform.value;
    const formData = new FormData();
    formData.append('email', Data.email);
    formData.append('userName', Data.username);
    formData.append('title', Data.bandname);
    formData.append('mobile', Data.number);
    formData.append('password', Data.password);
    formData.append(
      'street',
      this.formattedaddress.split(',')[0] +
        ',' +
        this.formattedaddress.split(',')[1]
    );
    formData.append('city', this.formattedaddress.split(',')[2]);
    formData.append('state', this.addressState.split(' ')[1]);
    formData.append('country', this.formattedaddress.split(',')[4]);
    formData.append('zipcode', this.addressState.split(' ')[2]);
    formData.append('latitude', this.latitude);
    formData.append('longitude', this.longitude);
    formData.append('avatarId', this.avatarSelectedImage);
    formData.append('role', 'artist');

    if (this.checked == true) {
      this.auth.signup(formData).subscribe((res) => {
        this.toast.success(`${res['message']}`);
        this.router.navigate(['/auth/registered']);
        this.signupform.reset();
      });
    }
  }
  // Required Error Messages
  inputRequiredValidation(signupform: FormGroup, type: string): boolean {
    return RequiredValidation(signupform, type);
  }
  // pattern Error Messages
  inputPatternValidation(signupForm: FormGroup, type: string): boolean {
    return PatternValidation(signupForm, type);
  }
  // location checking validation
  venueChecking(form, type) {
    this.locationValidator =
      (form.get(type)?.touched || form.get(type)?.dirty) &&
      this.formattedaddress != this.signupform.value.location;
    return this.locationValidator;
  }
  // Password checking Validation
  checkPasswordValidation(
    signupForm: FormGroup,
    password: string,
    confirmpassword: string
  ): boolean {
    this.passwordValidator = PasswordValidation(
      signupForm,
      password,
      confirmpassword
    );
    return this.passwordValidator;
  }
}
