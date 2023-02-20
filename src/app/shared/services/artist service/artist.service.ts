import { HttpParams, HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  buttonLoading: boolean;
  baseURL: string = environment.BASE_URL;
  errorLoader = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}

  userData() {
    return this.http.get(this.baseURL + 'user/me');
  }

  // Songs Management
  songsData(bandid: number) {
    let params = new HttpParams();
    params = params.set('bandId', bandid);
    return this.http.get(this.baseURL + 'song/songs-list', {
      params: params,
    });
  }
  deleteSong(bandId: number) {
    let url = this.baseURL + 'song/' + bandId;
    return this.http.delete(url);
  }
  getGenre() {
    return this.http.get(this.baseURL + 'auth/genres');
  }
  uploadSong(songData) {
    let url = this.baseURL + 'song/upload';
    return this.http.post(url, songData);
  }
  updateSong(songId: number, updateData) {
    let url = this.baseURL + 'song/edit/' + songId;
    return this.http.put(url, updateData);
  }
  live(liveObject) {
    let url = this.baseURL + 'song/live';
    return this.http.put(url, liveObject);
  }
  gettingData(
    searchInput: string,
    pageNumber: number,
    perPage: number,
    bandId: string
  ) {
    let url = this.baseURL + 'song/songs-list';
    let params = new HttpParams();
    params = params
      .set('bandId', bandId)
      .set('search', searchInput)
      .set('currentPage', pageNumber)
      .set('perPage', perPage);
    return this.http.get(url, {
      params: params,
    });
  }

  // Events management
  getEvents(bandId, currentPage, perPage, search: string) {
    let url = this.baseURL + 'eventmanagement/events-list';
    let params = new HttpParams();
    params = params
      .set('bandId', bandId)
      .set('search', search ? search : '')
      .set('currentPage', currentPage)
      .set('perPage', perPage);
    return this.http.get(url, {
      params: params,
    });
  }
  deleteEvent(eventId, bandId) {
    let url = ' http://50.19.24.41/api/eventmanagement/event/' + eventId;
    return this.http.delete(url, { body: bandId });
  }
  changePassword(updatedPassword) {
    let url = this.baseURL + 'user/change-password';
    return this.http.put(url, updatedPassword);
  }
  uploadEvent(eventData) {
    let url = this.baseURL + 'eventmanagement/create-event';
    return this.http.post(url, eventData);
  }
  updateEvent(Id, eventData) {
    let url = this.baseURL + 'eventmanagement/update-event/' + Id;
    return this.http.put(url, eventData);
  }
  // Band Details

  bandDetails(bandId) {
    let url = this.baseURL + 'band/band_details';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.get(url, {
      params: params,
    });
  }
  editBand(bandData) {
    let url = this.baseURL + 'band/edit_band';
    return this.http.put(url, bandData);
  }
  bandMembers(bandId) {
    let url = this.baseURL + 'band/bandmembers_list';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.get(url, {
      params: params,
    });
  }
  bandGallery(bandId) {
    let url = this.baseURL + 'band/band_images';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.get(url, {
      params: params,
    });
  }
  uploadGalleryImage(formData) {
    let url = this.baseURL + 'band/upload_images';
    return this.http.post(url, formData);
  }
  deleteGalleryImages(bandId, checkBoxObject) {
    let url = this.baseURL + 'band/delete_images';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.delete(url, {
      params: params,
      body: checkBoxObject,
    });
  }
  getBandMembers(bandId, query) {
    let url = ' http://50.19.24.41/api/band/members';
    let params = new HttpParams();
    params = params.set('bandId', bandId).set('search', query);
    return this.http.get(url, {
      params: params,
    });
  }
  bandMemberInvite(object) {
    let url = this.baseURL + 'bandmember/invite';
    return this.http.post(url, object);
  }
  deleteBandMember(bandId, Id) {
    let url = this.baseURL + 'band/' + bandId + '/bandmember/' + Id;
    return this.http.delete(url);
  }
}
