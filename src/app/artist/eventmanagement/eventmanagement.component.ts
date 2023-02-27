import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { __values } from 'tslib';
import { Observable } from 'rxjs/internal/Observable';
import { debounce } from 'lodash';
import { Subscription } from 'rxjs';
import { eventData } from 'src/app/shared/interface/interface';
import {
  PatternValidation,
  RequiredValidation,
} from 'src/app/shared/validations/validations';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-eventmanagement',
  templateUrl: './eventmanagement.component.html',
  styleUrls: ['./eventmanagement.component.scss'],
})
export class EventmanagementComponent {
  search: FormGroup;
  searchText: string = '';
  crossIcon: Boolean = true;
  eventsData: eventData[] = [];
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
  errorList: string = '';
  presentDate: Date;
  address: string;
  latitude: string;
  longitude: string;
  thumbnail: string;
  editEventId: number;
  todayPresentDate: string;
  searchTextCross: string = '';
  uploadEventApi: Subscription;
  updateEventApi: Subscription;
  venueCheck: boolean = false;
  eventDescriptionCount: number = 255;
  eventButton: boolean = false;
  isDisabled: boolean = true;
  constructor(
    private arist: ArtistService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.searchtable = debounce(this.searchtable, 1500);
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
    this.todayPresentDate = new Date().toISOString();
    this.presentDate = new Date();
    let bandData = JSON.parse(localStorage.getItem('band'));
    this.bandId = bandData.id;
    this.gettingEvents();
  }
  gettingEvents() {
    this.arist
      .getEvents(this.bandId, this.currentPage, this.perpage, this.searchText)
      .subscribe((res) => {
        this.eventsData = res['data'];
        this.totalevents = parseInt(this.eventsData[0].totalCount);
        this.spinner.hide();
      });
  }
  createEvent() {
    // this.eventsForm.get('description').disable();
    this.modalHeader = 'Upload Event';
    this.uploadEventModelAction = true;
    this.clearModal();
  }

  searchClear() {
    this.spinner.show();
    this.search.patchValue({
      search: '',
    });
    this.searchTextCross = '';
    this.searchText = '';
    this.gettingEvents();
  }
  searchtable(event) {
    this.searchTextCross = event.target.value;
    this.searchText = event.target.value;
    this.currentPage = 1;
    this.spinner.show();
    this.gettingEvents();
  }
  editevent(item: eventData) {
    this.clearModal();
    this.modalHeader = 'Edit Event';
    this.editEventId = item.id;
    const event = item;
    this.latitude = JSON.stringify(event.latitude);
    this.longitude = JSON.stringify(event.longitude);
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
    this.eventDescriptionCount = 255 - this.eventsForm.value.description.length;
  }
  deleteevent(id: number) {
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
      this.gettingEvents();
    });
    this.displaydeleteModal = false;
  }
  paginate(pageData: {
    page: number;
    first: number;
    rows: number;
    pageCount: number;
  }) {
    this.currentPage = pageData.page + 1;
    this.perpage = pageData.rows;
    this.gettingEvents();
    this.spinner.show();
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
    event.target.value = '';
  }
  removeImg() {
    this.uploadimageSrc = '';
    this.thumbnail = '';
  }

  Address(event: Address) {
    this.address = event.name + ',' + event.formatted_address;
    this.eventsForm.patchValue({
      venue: this.address,
    });
    this.latitude = JSON.stringify(event.geometry.location.lat());
    this.longitude = JSON.stringify(event.geometry.location.lng());
  }
  // validations
  inputRequiredValidation(eventsForm: FormGroup, type: string): boolean {
    return RequiredValidation(eventsForm, type);
  }
  inputPatternValidation(eventsForm: FormGroup, type: string): boolean {
    return PatternValidation(eventsForm, type);
  }

  // city checking validation
  venueChecking(eventsForm: FormGroup, type: string): boolean {
    this.venueCheck =
      (eventsForm.get(type)?.touched || eventsForm.get(type)?.dirty) &&
      this.address != this.eventsForm.value.venue;
    return this.venueCheck;
  }
  dateTimeValidationChecking(
    eventsForm: FormGroup,
    startDate: string,
    endDate: string
  ): boolean {
    let difference =
      eventsForm.get(endDate)?.value - eventsForm.get(startDate)?.value;
    if (
      (eventsForm.get(endDate)?.touched || eventsForm.get(endDate)?.dirty) &&
      eventsForm.get(endDate)?.value < eventsForm.get(startDate)?.value
    ) {
      return true;
    }
    if (
      (eventsForm.get(endDate)?.touched || eventsForm.get(endDate)?.dirty) &&
      difference <= 2700000
    ) {
      return true;
    }
  }
  eventModalClose() {
    if (this.modalHeader === 'Upload Event') {
      this.uploadEventModelAction = false;
      this.clearModal();
      this.uploadEventApi?.unsubscribe();
    }

    if (this.modalHeader === 'Edit Event') {
      this.uploadEventModelAction = false;
      this.clearModal();
      this.updateEventApi?.unsubscribe();
    }
  }
  clearModal() {
    this.eventsForm.reset();
    this.address = '';
    this.latitude = '';
    this.longitude = '';
    this.uploadimageSrc = '';
  }
  eventManagementDescriptionCount() {
    this.eventDescriptionCount = 255 - this.eventsForm.value.description.length;
  }

  saveEvent() {
    if (this.eventsForm.invalid) {
    } else {
      this.eventButton = true;
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
        this.uploadEventApi = this.arist
          .uploadEvent(formData)
          .subscribe((res) => {
            this.eventButton = false;
            this.toast.success(`${res['message']}`);
            this.spinner.show();
            this.gettingEvents();
            this.uploadEventModelAction = false;
            this.clearModal();
            this.thumbnail = '';
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
        this.updateEventApi = this.arist
          .updateEvent(this.editEventId, formData)
          .subscribe((res) => {
            this.eventButton = false;
            this.toast.success(`${res['message']}`);
            this.gettingEvents();
            this.spinner.show();
            this.uploadEventModelAction = false;
            this.clearModal();
            this.thumbnail = '';
          });
      }
    }
  }
}
