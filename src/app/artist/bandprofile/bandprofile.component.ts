import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-bandprofile',
  templateUrl: './bandprofile.component.html',
  styleUrls: ['./bandprofile.component.scss'],
})
export class BandprofileComponent {
  imageurls: any[] = [];
  selectedBandMember: any;
  filteredBandMembers: any[] = [];
  editPosterAction: boolean = false;
  uploadimageSrc: string = '';
  thumbnail: any;
  bandId: string;
  bandDetails: any;
  bandLogo: string = '';
  bandDescription: string;
  joined: string;
  bandTitle: string;
  bandDescriptionEditing: string;
  editDescriptionModalAction: boolean = false;
  bandDescriptionCount: number;
  bandMembersList: any[];
  addBandMemberModelAction: boolean = false;
  bandGallery: any[];
  galleryUploadAction: boolean = false;
  uploadBinaryGalleryImage: any[] = [];
  galleryButtonsViewAction: boolean = false;
  checkBoxArray: number[] = [];
  galleryUploadedImages: any[] = [];
  galleryImagesButtonName: string = 'Select All';
  deleteImagesModalAction: Boolean = false;
  bandMembersForm: FormGroup;
  activeIndex: number = 0;
  bandgalleryGalleriaAction: boolean = false;
  responsiveOptions: { breakpoint: string; numVisible: number }[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
    },
  ];
  constructor(
    private arist: ArtistService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.bandMembersForm = this.fb.group({
      email: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.spinner.show();
    let bandData = JSON.parse(localStorage.getItem('band'));
    this.bandId = bandData.id;
    this.arist.bandDetails(this.bandId).subscribe((res) => {
      this.bandDetails = res['data'];
      this.bandLogo = this.bandDetails.band.logo;
      this.bandDescription = this.bandDetails.band.description;
      this.joined = this.bandDetails.band.createdAt;
      this.bandTitle = this.bandDetails.band.title;
    });
    this.arist.bandMembers(this.bandId).subscribe((res) => {
      this.bandMembersList = res['data'];
    });
    this.arist.bandGallery(this.bandId).subscribe((res) => {
      this.bandGallery = res['data'].bandGallery;
      this.spinner.hide();
    });
  }
  getGalleryImagesRefresh() {
    this.arist.bandGallery(this.bandId).subscribe((res) => {
      this.bandGallery = res['data'].bandGallery;
    });
  }
  getBandDetailsRefresh() {
    this.arist.bandDetails(this.bandId).subscribe((res) => {
      this.bandDetails = res['data'];
      this.bandLogo = this.bandDetails.band.logo;
      this.bandDescription = this.bandDetails.band.description;
      this.joined = this.bandDetails.band.createdAt;
      this.bandTitle = this.bandDetails.band.title;
    });
  }

  Imageupload(event) {
    this.thumbnail = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadimageSrc = reader.result as string;
      };
    }
  }
  bandProfileImageUpload() {
    this.uploadimageSrc = this.bandLogo;
    this.thumbnail = this.bandLogo;
    this.editPosterAction = true;
  }
  removeModalImage() {
    this.thumbnail = '';
    this.uploadimageSrc = '';
  }
  saveEvent() {
    const formData = new FormData();
    formData.append('title', this.bandTitle);
    formData.append('bandId', this.bandId);
    formData.append('description', this.bandDescription);
    formData.append('logo', this.thumbnail);

    this.arist.editBand(formData).subscribe((res) => {
      this.toast.success(res['message']);
      this.editPosterAction = false;
      this.getBandDetailsRefresh();
    });
  }
  bandModalClose() {
    this.uploadimageSrc = '';
    this.thumbnail = '';
    this.editPosterAction = false;
  }
  editDescriptionModal() {
    this.editDescriptionModalAction = true;
    if (this.bandDescription == 'null') {
      this.bandDescriptionEditing = '';
    } else {
      this.bandDescriptionEditing = this.bandDescription;
    }

    this.bandDescriptionCount = 250 - this.bandDescriptionEditing.length;
  }
  descriptionCount() {
    this.bandDescriptionCount = 250 - this.bandDescriptionEditing.length;
  }
  bandDescriptionModalClose() {
    this.editDescriptionModalAction = false;
  }
  bandDescriptionSave() {
    const formData = new FormData();
    formData.append('title', this.bandTitle);
    formData.append('bandId', this.bandId);
    formData.append('description', this.bandDescriptionEditing);
    formData.append('logo', this.bandLogo);
    this.arist.editBand(formData).subscribe((res) => {
      this.toast.success(res['message']);
      this.editDescriptionModalAction = false;
      this.getBandDetailsRefresh();
    });
  }
  addBandMember() {
    this.addBandMemberModelAction = true;
    this.bandMembersForm.reset();
  }
  addBandMemberInvite() {
    let object = {
      bandId: this.bandId,
      email: this.bandMembersForm.value.email.email,
    };
    this.arist.bandMemberInvite(object).subscribe((res) => {
      this.toast.success(res['message']);
      this.addBandMemberModelAction = false;
      this.bandMembersForm.reset();
    });
  }
  addBandMemberCancel() {
    this.bandMembersForm.reset();
    this.addBandMemberModelAction = false;
  }
  uploadImageModel() {
    this.galleryUploadAction = true;
    this.uploadBinaryGalleryImage = [];
  }
  checkBoxSelect(id: number, event) {
    if (event.target.checked == true) {
      this.checkBoxArray.push(id);
      if (this.checkBoxArray.length == this.bandGallery.length) {
        this.galleryImagesButtonName = 'Deselect All';
      }
      if (this.checkBoxArray.length > 0) {
        this.galleryButtonsViewAction = true;
      }
    } else {
      let index = this.checkBoxArray.indexOf(id);
      if (index > -1) {
        this.checkBoxArray.splice(index, 1);
        if (this.checkBoxArray.length < this.bandGallery.length) {
          this.galleryImagesButtonName = 'Select All';
        }
      }
      if (this.checkBoxArray.length == 0) {
        this.galleryButtonsViewAction = false;
      }
    }

    if (this.checkBoxArray.length > 0) {
      this.galleryButtonsViewAction = true;
    }
  }
  selectAllImages() {
    if (this.checkBoxArray.length == this.bandGallery.length) {
      let checkbox = document.querySelectorAll('.checkBox_Icon');
      checkbox.forEach((ele: any) => {
        ele.checked = false;
      });
      this.checkBoxArray = [];
      this.galleryImagesButtonName = 'SelectAll';
      this.galleryButtonsViewAction = false;
    } else {
      this.galleryImagesButtonName = 'DeselectAll';
      this.bandGallery.forEach((main) => {
        if (!this.checkBoxArray.includes(main.id))
          this.checkBoxArray.push(main.id);
      });
      let checkbox = document.querySelectorAll('.checkBox_Icon');
      checkbox.forEach((ele: any) => {
        ele.checked = true;
      });
    }
  }
  deleteGalleryImages() {
    this.deleteImagesModalAction = true;
  }
  GalleryImageupload(event) {
    let files = event.target.files;
    const reader = new FileReader();
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.galleryUploadedImages.push(e.target.result);
        this.uploadBinaryGalleryImage.push(file);
      };
    }
  }
  removeGalleryImage(id) {
    this.galleryUploadedImages.splice(id, 1);
    this.uploadBinaryGalleryImage.splice(id, 1);
  }
  cancelUploadImage() {
    this.galleryUploadAction = false;

    this.uploadBinaryGalleryImage = [];
    this.galleryUploadedImages = [];
  }
  uploadImageUpload() {
    const formData = new FormData();
    for (let index = 0; index < this.uploadBinaryGalleryImage.length; index++) {
      formData.append('uploadedImages', this.uploadBinaryGalleryImage[index]);
    }
    formData.append('bandId', this.bandId);
    this.arist.uploadGalleryImage(formData).subscribe((res) => {
      this.galleryUploadAction = false;
      this.uploadBinaryGalleryImage = [];
      this.getGalleryImagesRefresh();
      this.toast.success(res['message']);
      this.galleryUploadedImages = [];
    });
  }
  deleteImagesConfirm() {
    let object = {
      imagesId: this.checkBoxArray,
    };
    this.arist.deleteGalleryImages(this.bandId, object).subscribe((res) => {
      this.toast.success(res['message']);
      this.getGalleryImagesRefresh();
      this.checkBoxArray = [];
      this.deleteImagesModalAction = false;
      if (this.checkBoxArray.length == 0) {
        this.galleryButtonsViewAction = false;
      }
    });
  }
  deleteImagesCancel() {
    this.deleteImagesModalAction = false;
    this.checkBoxArray = [];
    let checkbox = document.querySelectorAll('.checkBox_Icon');
    checkbox.forEach((ele: any) => {
      ele.checked = false;
    });
    if (this.checkBoxArray.length == 0) {
      this.galleryButtonsViewAction = false;
    }
  }

  filterbandmembers(event) {
    let query = event.query;
    this.arist.getBandMembers(this.bandId, query).subscribe((res) => {
      this.filteredBandMembers = res['data'];
    });
  }
  get form() {
    return this.bandMembersForm.controls;
  }
  removeBandMember(bandId, id) {
    this.arist.deleteBandMember(bandId, id).subscribe((res) => {
      this.toast.success(res['message']);
    });
  }
  bandGalleryClicks(index) {
    this.activeIndex = index;
    this.bandgalleryGalleriaAction = true;
  }
}
