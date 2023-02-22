import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Paginator } from 'primeng/paginator';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounce } from 'lodash';
import { Subscription } from 'rxjs';
import { songsData } from 'src/app/shared/interface/interface';
import {
  PatternValidation,
  RequiredValidation,
} from 'src/app/shared/validations/validations';
import { getLocaleFirstDayOfWeek } from '@angular/common';
@Component({
  selector: 'app-songsmanagement',
  templateUrl: './songsmanagement.component.html',
  styleUrls: ['./songsmanagement.component.scss'],
})
export class SongsmanagementComponent {
  modalHeader: string = 'Upload Song';
  search: FormGroup;
  songs: songsData[] = [];
  bandid: string;
  deleteId: number;
  display: boolean = false;
  songsUploadModal: boolean = false;
  songsForm: FormGroup;
  formattedaddress: string;
  genreOptions: { id: number; name: string }[] = [];
  latitude: string;
  longitude: string;
  showAudiodata: boolean = false;
  band = JSON.parse(localStorage.getItem('band'));
  defaultthumbnail: string = 'http://50.19.24.41/assets/images/audio.png';
  uploadimageSrc: string = '';
  errorList: string = '';
  userId: string;
  fileAudio: any = '';
  thumbnail: any;
  action: string = 'upload';
  editId: number;
  editSongUrl: string;
  editThumbnailUrl: string;
  editlongitude: string;
  editlatitude: string;
  totalSongs: number;
  pageNumber: number = 1;
  perPage: number;
  searchText: string = '';
  uploadSongApi: Subscription;
  updateSongApi: Subscription;
  cityCheck: Boolean = false;
  songButton: boolean = false;
  constructor(
    private arist: ArtistService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.searchtable = debounce(this.searchtable, 1500);
    this.search = this.fb.group({ search: [''] });
    this.songsForm = this.fb.group({
      title: ['', [Validators.required]],
      thumbnail: [''],
      song: [''],
      genre: ['', Validators.required],
      cityName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.arist.errorLoader.subscribe((res) => {
      console.log(res, 'songsManagemet');
    });
    this.perPage = 10;
    this.spinner.show();
    let loginData = JSON.parse(localStorage.getItem('login'));
    this.userId = loginData.data.user.id;
    this.bandid = this.band.id;
    this.getData();
    this.arist.getGenre().subscribe((res) => {
      this.genreOptions = res['data'];
    });
  }
  getData() {
    this.arist
      .gettingData(
        this.searchText ? this.searchText : '',
        this.pageNumber ? this.pageNumber : 1,
        this.perPage ? this.perPage : 10,
        this.bandid
      )
      .subscribe((res) => {
        this.spinner.hide();
        this.songs = res['data'].data;
        this.totalSongs = +this.songs[0]?.totalCount;
      });
  }

  paginate(event) {
    this.spinner.show();
    this.pageNumber = event.page + 1;
    this.perPage = event.rows;
    this.getData();
  }
  // validations
  inputRequiredValidation(songsForm: FormGroup, type: string): boolean {
    return RequiredValidation(songsForm, type);
  }
  inputPatternValidation(songsForm: FormGroup, type: string): boolean {
    return PatternValidation(songsForm, type);
  }
  // city checking validation
  venueChecking(songsForm, type) {
    this.cityCheck =
      (songsForm.get(type)?.touched || songsForm.get(type)?.dirty) &&
      this.formattedaddress != this.songsForm.value.cityName;
    return this.cityCheck;
  }
  searchClear() {
    this.searchText = '';
    this.pageNumber = 1;
    this.spinner.show();
    this.search.patchValue({
      search: '',
    });
    this.getData();
  }
  searchtable(event) {
    this.spinner.show();
    this.searchText = event.target.value;
    this.pageNumber = 1;
    this.getData();
  }
  deleteSong(Id: number, bandid: number) {
    this.display = true;
    this.deleteId = Id;
  }
  deleteconfirm() {
    this.arist.deleteSong(this.deleteId).subscribe((res) => {
      this.toast.success(`${res['message']}`);
      this.spinner.show();
      this.getData();
    });
    this.display = false;
  }
  deleteCancel() {
    this.display = false;
  }
  songLive(id, live) {
    let object = {
      songId: id,
      live: live,
    };
    // console.log(this.songs);
    // console.log(id);

    this.arist.live(object).subscribe(
      (res) => {},
      (error) => {
        this.songs.forEach((e) => {
          if (e.id == id) {
            e.live = false;
          }
        });
      }
    );
  }

  uploadSong() {
    this.action = 'upload';
    this.modalHeader = 'Upload Song';
    this.songsUploadModal = true;
    this.clearUploadModal();
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
  uploadAudio(event) {
    this.fileAudio = event.target.files[0];
    this.songsForm.patchValue({
      title: this.fileAudio?.name.split('.')[0].slice(0, 30),
    });
    this.showAudiodata = true;
    event.target.value = '';
  }
  removeAudio() {
    this.showAudiodata = false;
    this.fileAudio = '';
    this.songsForm.patchValue({
      title: '',
      song: '',
    });
  }
  Address(address: Address) {
    this.formattedaddress = address.formatted_address;
    this.latitude = address.geometry.location.lat().toString();
    this.longitude = address.geometry.location.lng().toString();

    this.songsForm.patchValue({
      cityName: this.formattedaddress,
    });
  }

  genersSelect(r) {}
  songsModalClose() {
    if (this.action == 'update') {
      this.songsUploadModal = false;
      this.clearUploadModal();
      this.updateSongApi?.unsubscribe();
    }
    if (this.action == 'upload') {
      this.songsUploadModal = false;
      this.clearUploadModal();
      this.uploadSongApi?.unsubscribe();
    }
  }
  saveSong() {
    if (this.songsForm.valid && this.fileAudio && !this.cityCheck) {
      this.songButton = true;
      if (this.action == 'upload') {
        const Data = this.songsForm.value;
        const formData = new FormData();
        formData.append('title', Data.title);
        Data.genre?.forEach((item) => formData.append('genres', item.name));
        formData.append('cityName', this.formattedaddress.split(',')[0]);
        formData.append(
          'stateName',
          this.formattedaddress.split(',')[1].slice(1)
        );
        formData.append(
          'country',
          this.formattedaddress.split(',')[2].slice(1)
        );
        formData.append('latitude', this.latitude);
        formData.append('longitude', this.longitude);
        formData.append('albumId', '');
        formData.append('userId', this.userId);
        formData.append('bandId', this.bandid);
        formData.append('song', this.fileAudio);
        formData.append('thumbnail', this.thumbnail);

        this.uploadSongApi = this.arist
          .uploadSong(formData)
          .subscribe((res) => {
            this.songButton = false;
            this.toast.success(`${res['message']}`);
            this.clearUploadModal();
            this.songsUploadModal = false;
            this.spinner.show();
            this.getData();
            this.thumbnail = '';
          });
      }

      if (this.action == 'update') {
        const Data = this.songsForm.value;
        const formData = new FormData();
        formData.append('title', Data.title);
        Data.genre?.forEach((item) => formData.append('genres', item.name));
        formData.append('latitude', this.editlatitude);
        formData.append('longitude', this.editlongitude);
        formData.append('albumId', '');
        formData.append('userId', this.userId);
        formData.append('bandId', this.bandid);
        formData.append('cityName', Data.cityName.split(',')[0]);
        formData.append('stateName', Data.cityName.split(',')[1].slice(1));
        formData.append('country', Data.cityName.split(',')[2].slice(1));
        formData.append('song', this.fileAudio);
        formData.append(
          'thumbnail',
          this.thumbnail != '' ? this.thumbnail : this.editThumbnailUrl
        );

        this.updateSongApi = this.arist
          .updateSong(this.editId, formData)
          .subscribe((res) => {
            this.songButton = false;
            this.toast.success(`${res['message']}`);
            this.clearUploadModal();
            this.songsUploadModal = false;
            this.spinner.show();
            this.getData();
            this.thumbnail = '';
          });
      }
    }
  }
  removeImg() {
    this.uploadimageSrc = '';
    this.editThumbnailUrl = '';
  }
  clearUploadModal() {
    this.uploadimageSrc = '';
    this.showAudiodata = false;
    this.songsForm.reset();
  }
  editSong(songData) {
    this.thumbnail = '';
    this.action = 'update';
    this.modalHeader = 'Edit Song';
    this.songsUploadModal = true;
    var songgenres = songData.genres.map(({ id, genre_name }) => ({
      id: id,
      name: genre_name,
    }));
    this.songsForm.patchValue({
      title: songData.title,
      genre: songgenres,
      cityName:
        songData.cityName + ',' + ' ' + songData.stateName + ',' + ' ' + 'USA',
    });
    this.editId = songData.id;
    this.editSongUrl = songData.song;
    this.editThumbnailUrl = songData.thumbnail;
    this.editlatitude = songData.latitude;
    this.editlongitude = songData.longitude;
    this.fileAudio = this.editSongUrl;
    this.showAudiodata = true;
    this.uploadimageSrc = songData.thumbnail;
  }
}
