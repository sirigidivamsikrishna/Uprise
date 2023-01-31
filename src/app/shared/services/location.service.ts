import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  results: any[] = [];
  constructor(private http: HttpClient) {}

  getResults(data: string) {
    //  const url = "https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters";
    //  https://maps.googleapis.com/maps/api/place/autocomplete/json
    // ?input=amoeba
    // &location=37.76999%2C-122.44696
    // &radius=500
    // &types=establishment
    // &key=YOUR_API_KEY
    // const options = {
    //   componentRestrictions: { country: 'us' },
    //   fields: ['address_components', 'geometry', 'icon', 'name'],
    //   strictBounds: false,
    //   types: ['establishment'],
    // };
    // const autocomplete = new google.maps.places.Autocomplete(data, options);
    // let params = new HttpParams();
    // params = params
    //   .set('input', data)
    //   .set('key', 'AIzaSyCNNmfTGsBatXy77JEAcjxuHCR2WSxVvg')
    //   .set('language', 'fr');
    // return this.http.get(
    //   'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    //   {
    //     params: params,
    //   }
    // );
  }
}
