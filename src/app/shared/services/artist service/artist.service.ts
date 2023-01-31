import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  // Songs Management
  songsData(bandid: number) {
    let params = new HttpParams();
    params = params.set('bandId', bandid);
    return this.http.get('http://50.19.24.41/api/song/songs-list', {
      params: params,
    });
  }
  deleteData(bandId: number) {
    let url = 'http://50.19.24.41/api/song/' + bandId;
    return this.http.delete(url);
  }
  getGenre() {
    return this.http.get('http://50.19.24.41/api/auth/genres');
  }
  uploadSong(songData) {
    let url = 'http://50.19.24.41/api/song/upload';
    return this.http.post(url, songData);
  }
  updateSong(songId: number, updateData) {
    let url = 'http://50.19.24.41/api/song/edit/' + songId;
    return this.http.put(url, updateData);
  }
  live(liveObject) {
    let url = 'http://50.19.24.41/api/song/live';
    return this.http.put(url, liveObject);
  }
  search(
    searchInput: string,
    pageNumber: number,
    perPage: number,
    bandId?: number
  ) {
    let url = 'http://50.19.24.41/api/song/songs-list';
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
  paginate(
    pageNumber: number,
    perPage: number,
    bandId?: number,
    search?: string
  ) {
    let url = 'http://50.19.24.41/api/song/songs-list';
    let params = new HttpParams();
    params = params
      .set('bandId', bandId)
      .set('search', search)
      .set('currentPage', pageNumber)
      .set('perPage', perPage);
    return this.http.get(url, {
      params: params,
    });
  }

  // Events management
  getEvents(bandId, currentPage, perPage, search?: string) {
    let url = 'http://50.19.24.41/api/eventmanagement/events-list';
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
    let url = 'http://50.19.24.41/api/user/change-password';
    return this.http.put(url, updatedPassword);
  }
  uploadEvent(eventData) {
    let url = 'http://50.19.24.41/api/eventmanagement/create-event';
    return this.http.post(url, eventData);
  }
  updateEvent(Id, eventData) {
    let url = 'http://50.19.24.41/api/eventmanagement/update-event/' + Id;
    return this.http.put(url, eventData);
  }
  // Band Details

  bandDetails(bandId) {
    let url = 'http://50.19.24.41/api/band/band_details';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.get(url, {
      params: params,
    });
  }
  editBand(bandData) {
    let url = 'http://50.19.24.41/api/band/edit_band';
    return this.http.put(url, bandData);
  }
  bandMembers(bandId) {
    let url = 'http://50.19.24.41/api/band/bandmembers_list';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.get(url, {
      params: params,
    });
  }
  bandGallery(bandId) {
    let url = 'http://50.19.24.41/api/band/band_images';
    let params = new HttpParams();
    params = params.set('bandId', bandId);
    return this.http.get(url, {
      params: params,
    });
  }
  uploadGalleryImage(formData) {
    let url = 'http://50.19.24.41/api/band/upload_images';
    return this.http.post(url, formData);
  }
  deleteGalleryImages(bandId, checkBoxObject) {
    let url = 'http://50.19.24.41/api/band/delete_images';
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
    let url = 'http://50.19.24.41/api/bandmember/invite';
    return this.http.post(url, object);
  }
  deleteBandMember(bandId, Id) {
    let url = 'http://50.19.24.41/api/band/' + bandId + '/bandmember/' + Id;
    return this.http.delete(url);
  }
}
