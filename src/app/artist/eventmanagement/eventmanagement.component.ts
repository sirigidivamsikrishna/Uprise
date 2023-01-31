import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-eventmanagement',
  templateUrl: './eventmanagement.component.html',
  styleUrls: ['./eventmanagement.component.scss'],
})
export class EventmanagementComponent {
  search: FormGroup;
  searchText: string = '';
  crossIcon: Boolean = true;
  eventsData: any = [];
  displaydeleteModal: boolean = false;
  deleteId: number;
  bandId: string;
  totalevents: number;
  currentPage: number = 1;
  perpage: number = 10;
  uploadEventModelAction: boolean = false;
  modalHeader: string = 'Upload Event';
  eventsForm: FormGroup;
  uploadimageSrc: string;
  errorList: any = '';
  presentDate: Date;
  address: any;
  latitude: any;
  longitude: any;
  thumbnail: string;
  editEventId: number;
  dummyDate: any;
  searchTextCross: string = '';
  constructor(
    private arist: ArtistService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.search = this.fb.group({ search: [''] });
    this.eventsForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z]).+$')],
      ],
      thumbnail: [''],
      venue: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
    });
  }
  ngOnInit(): void {
    this.spinner.show();
    this.dummyDate = new Date().toISOString();
    this.presentDate = new Date();
    this.totalevents = this.eventsData.length;
    let bandData = JSON.parse(localStorage.getItem('band'));
    this.bandId = bandData.id;
    this.arist
      .getEvents(this.bandId, this.currentPage, this.perpage)
      .subscribe((res) => {
        this.eventsData = res['data'];
        this.totalevents = this.eventsData.length;
        this.spinner.hide();
      });
  }
  refresh() {
    this.arist
      .getEvents(this.bandId, this.currentPage, this.perpage)
      .subscribe((res) => {
        this.eventsData = res['data'];
        this.totalevents = this.eventsData.length;
        this.spinner.hide();
      });
  }
  createEvent() {
    this.modalHeader = 'Upload Event';
    this.uploadEventModelAction = true;
    this.clearModal();
  }
  openmodel() {}
  searchClear() {
    console.log('git');

    this.spinner.show();
    this.search.patchValue({
      search: '',
    });
    this.searchTextCross = '';
    this.refresh();
  }
  searchtable(event) {
    this.searchTextCross = event.target.value;
    setTimeout(() => {
      this.searchText = event.target.value;
      this.spinner.show();
      this.arist
        .getEvents(this.bandId, this.currentPage, this.perpage, this.searchText)
        .subscribe((res) => {
          this.eventsData = res['data'];
          this.spinner.hide();
          this.totalevents = this.eventsData.length;
        });
    }, 2000);
  }
  editevent(item) {
    this.clearModal();
    this.modalHeader = 'Edit Event';
    this.editEventId = item.id;
    const event = item;
    this.latitude = event.latitude;
    this.longitude = event.longitude;
    this.uploadEventModelAction = true;
    let initialAddress = event.location.split(',')[0];
    let fullAddress = event.location.split(',').slice(1).join(',');
    let startTime = new Date(item.startTime);
    let endTime = new Date(item.endTime);
    this.uploadimageSrc = event.thumbnail;
    this.thumbnail = event.thumbnail;
    this.address = initialAddress + ', ' + fullAddress;
    this.eventsForm.patchValue({
      title: event.eventName,
      venue: this.address,
      startDate: startTime,
      endDate: endTime,
      description: event.description === 'null' ? '' : event.description,
    });
  }
  deleteevent(id) {
    this.displaydeleteModal = true;
    this.deleteId = id;
  }
  deleteCancel() {
    this.displaydeleteModal = false;
  }
  deleteconfirm() {
    this.spinner.show();
    let object = {
      bandId: this.bandId,
    };

    this.arist.deleteEvent(this.deleteId, object).subscribe((res) => {
      this.toast.success(`${res['message']}`);
      this.refresh();
    });
    this.displaydeleteModal = false;
    // this.displaydeleteModal = false;
  }
  paginate(pageData) {
    this.currentPage = pageData.page + 1;
    this.perpage = pageData.rows;
    this.refresh();
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
  removeImg() {
    this.uploadimageSrc = '';
    this.thumbnail = '';
  }
  Address(event) {
    this.address = event.name + ',' + event.formatted_address;
    this.latitude = event.geometry.location.lat();
    this.longitude = event.geometry.location.lng();
  }
  // validations
  inputRequiredValidation(eventsForm: FormGroup, type: string): boolean {
    return (
      (eventsForm.get(type).touched || eventsForm.get(type).dirty) &&
      eventsForm.get(type)?.errors !== null &&
      eventsForm.get(type)?.errors.required
    );
  }
  inputPatternValidation(eventsForm: FormGroup, type: string): boolean {
    return (
      (eventsForm.get(type)?.touched || eventsForm.get(type)?.dirty) &&
      eventsForm.get(type)?.errors !== null &&
      eventsForm.get(type)?.errors.pattern
    );
  }
  eventModalClose() {
    this.uploadEventModelAction = false;
  }
  clearModal() {
    this.eventsForm.reset();
    this.address = '';
    this.latitude = '';
    this.longitude = '';
    this.uploadimageSrc = '';
  }
  saveEvent() {
    this.spinner.show();
    if (this.eventsForm.invalid) {
    } else {
      if (this.modalHeader === 'Upload Event') {
        const Data = this.eventsForm.value;
        const formData = new FormData();
        formData.append('eventName', Data.title);
        formData.append('description', Data.description);
        formData.append('location', this.address);
        formData.append('startTime', Data.startDate);
        formData.append('endTime', Data.endDate);
        formData.append('thumbnail', this.thumbnail);
        formData.append('latitude', this.latitude);
        formData.append('longitude', this.longitude);
        formData.append('bandId', this.bandId);
        this.arist.uploadEvent(formData).subscribe((res) => {
          this.toast.success(`${res['message']}`);
          this.refresh();
          this.uploadEventModelAction = false;
          this.clearModal();
          this.spinner.hide();
        });
      }

      if (this.modalHeader === 'Edit Event') {
        const Data = this.eventsForm.value;
        const formData = new FormData();
        formData.append('eventName', Data.title);
        formData.append('description', Data.description);
        formData.append('location', this.address);
        formData.append('startTime', Data.startDate);
        formData.append('endTime', Data.endDate);
        formData.append('thumbnail', this.thumbnail);
        formData.append('latitude', this.latitude);
        formData.append('longitude', this.longitude);
        formData.append('bandId', this.bandId);
        this.arist.updateEvent(this.editEventId, formData).subscribe((res) => {
          this.toast.success(`${res['message']}`);
          this.refresh();
          this.spinner.hide();
          this.uploadEventModelAction = false;
          this.clearModal();
        });
      }
    }
  }
}
