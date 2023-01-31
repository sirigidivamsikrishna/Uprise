import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArtistService } from 'src/app/shared/services/artist service/artist.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Paginator } from 'primeng/paginator';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-songsmanagement',
  templateUrl: './songsmanagement.component.html',
  styleUrls: ['./songsmanagement.component.scss'],
})
export class SongsmanagementComponent {
  modalHeader: string = 'Upload Song';
  value3: any;
  data: any;
  search: FormGroup;
  songs: any[] = [];
  bandid;
  deleteId: number;
  display: boolean = false;
  songsUploadModal: boolean = false;
  songsForm: FormGroup;
  formattedaddress: any;
  genreOptions: any;
  selectedGenre: any;
  latitude: any;
  longitude: any;
  showAudiodata: boolean = false;
  band = JSON.parse(localStorage.getItem('band'));
  defaultthumbnail: string = 'http://50.19.24.41/assets/images/audio.png';
  imgFile: any;
  ImgfileName: any;
  uploadimageSrc: string = '';
  songEditModal: boolean = false;
  duration: any;
  errorList: any = '';
  userId: any;
  fileAudio: any = '';
  thumbnail: any;
  action: string = 'upload';
  editId: number;
  editSongUrl: string;
  editThumbnailUrl: string;
  editlongitude: any;
  editlatitude: any;
  totalSongs: number;
  pageNumber: number;
  perPage: number;
  searchText: string = '';
  constructor(
    private arist: ArtistService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.search = this.fb.group({ search: [''] });
    this.songsForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.pattern('^(?=.*[a-zA-Z]).+$')],
      ],
      thumbnail: [''],
      song: [''],
      genre: ['', Validators.required],
      cityName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.pageNumber = 1;
    this.perPage = 10;
    let loginData = JSON.parse(localStorage.getItem('login'));
    this.userId = loginData.data.user.id;
    this.bandid = this.band.id;
    this.arist.songsData(this.bandid).subscribe((res) => {
      this.songs = res['data'].data;
      this.totalSongs = res['data'].data.length;
      this.spinner.hide();
    });

    this.arist.getGenre().subscribe((res) => (this.genreOptions = res['data']));
  }

  paginate(event) {
    this.pageNumber = event.page + 1;
    this.perPage = event.rows;
    this.arist
      .paginate(this.pageNumber, this.perPage, this.bandid)
      .subscribe((res) => {
        this.songs = res['data'].data;
        this.totalSongs = res['data'].data.length;
      });
  }
  // validations
  inputRequiredValidation(songsForm: FormGroup, type: string): boolean {
    return (
      (songsForm.get(type).touched || songsForm.get(type).dirty) &&
      songsForm.get(type)?.errors !== null &&
      songsForm.get(type)?.errors.required
    );
  }
  inputPatternValidation(songsForm: FormGroup, type: string): boolean {
    return (
      (songsForm.get(type)?.touched || songsForm.get(type)?.dirty) &&
      songsForm.get(type)?.errors !== null &&
      songsForm.get(type)?.errors.pattern
    );
  }
  searchClear() {
    this.searchText = '';
    this.spinner.show();

    this.refresh();
    this.search.patchValue({
      search: '',
    });
  }
  searchtable(event) {
    this.searchText = event.target.value;
    this.arist
      .search(this.searchText, this.pageNumber, this.perPage, this.bandid)
      .subscribe((res) => {
        this.songs = res['data'].data;
        this.totalSongs = res['data'].data.length;
      });
  }
  deleteSong(Id: number, bandid: number) {
    this.display = true;
    this.deleteId = Id;
  }

  refresh() {
    this.arist.songsData(this.bandid).subscribe((res) => {
      this.totalSongs = res['data'].data.length;
      this.songs = res['data'].data;
      this.spinner.hide();
    });
  }
  deleteconfirm() {
    this.arist.deleteData(this.deleteId).subscribe((res) => {
      this.toast.success(`${res['message']}`);
      console.log(res, 'response');
      this.spinner.show();
      this.refresh();
    });
    this.display = false;
  }
  deleteCancel() {
    this.display = false;
  }
  songLive(id, live) {
    console.log(id, 'id', live, 'live');
    let object = {
      songId: id,
      live: live,
    };
    this.arist.live(object).subscribe((res) => console.log(res));
  }

  uploadSong() {
    this.action = 'upload';
    this.modalHeader = 'Upload Song';
    this.songsUploadModal = true;
    this.clearUploadModal();
  }
  Imageupload(event) {
    this.thumbnail = event.target.files[0];
    // console.log(event.target.files, 'kkk');

    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadimageSrc = reader.result as string;
      };
    }
  }
  uploadAudio(event) {
    this.fileAudio = event.target.files[0];
    this.songsForm.patchValue({
      title: this.fileAudio?.name.split('.')[0].slice(0, 30),
    });
    var fileName = this.fileAudio.name;
    var fileSize = this.fileAudio.size;
    var fileType = this.fileAudio.type;

    this.showAudiodata = true;
    // new Audio(URL.createObjectURL(fileAudio)).onloadedmetadata = (e: any) => {
    //   this.duration = e.currentTarget.duration;
    // };
    // console.log('king', this.duration);
    // console.log('audio', fileAudio);
    // console.log('size', fileSize);
    // console.log('type', fileType);
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
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    console.log(this.formattedaddress.split(',')[0], 'format');
    console.log(this.formattedaddress.split(',')[1], 'format');
    console.log(this.formattedaddress.split(',')[2], 'format');
    const Data = this.songsForm.value;
    // console.log(Data.genre, 'lo');
  }
  genersSelect(r) {
    // console.log(r);
  }
  songsModalClose() {
    this.songsUploadModal = false;
    this.clearUploadModal();
  }

  saveSong() {
    if (this.action == 'upload') {
      // console.log(this.songsForm.value, 'hello');
      const Data = this.songsForm.value;
      const formData = new FormData();
      formData.append('title', Data.title);
      Data.genre?.forEach((item) => formData.append('genres', item.name));
      // formData.append('genres', Data.genre);
      formData.append('cityName', this.formattedaddress.split(',')[0]);
      formData.append(
        'stateName',
        this.formattedaddress.split(',')[1].slice(1)
      );
      formData.append('country', this.formattedaddress.split(',')[2].slice(1));
      formData.append('latitude', this.latitude);
      formData.append('longitude', this.longitude);
      formData.append('albumId', '');
      formData.append('userId', this.userId);
      formData.append('bandId', this.bandid);
      formData.append('song', this.fileAudio);
      formData.append('thumbnail', this.thumbnail);
      this.arist.uploadSong(formData).subscribe((res) => {
        this.toast.success(`${res['message']}`);
        this.clearUploadModal();
        this.songsUploadModal = false;
        this.spinner.show();
        this.refresh();
      });
    }

    if (this.action == 'update') {
      console.log(this.songsForm.value, 'hello');
      console.log(this.formattedaddress, 'adress');
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
      this.arist.updateSong(this.editId, formData).subscribe((res) => {
        this.toast.success(`${res['message']}`);
        this.clearUploadModal();
        this.songsUploadModal = false;
        this.spinner.show();
        this.refresh();
      });
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
    console.log(songData, 'dda');

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

    // console.log(this.editSongUrl, 'song');
    // console.log(this.editThumbnailUrl, 'thumbnail');

    this.showAudiodata = true;
    this.uploadimageSrc = songData.thumbnail;
  }
}
