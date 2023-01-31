import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient, private route: Router) {}
  signup(data: any) {
    const url = 'http://50.19.24.41/api/auth/signup';
    return this.http.post(url, data);
  }
  avatars() {
    return this.http.get('http://50.19.24.41/api/auth/avatars');
  }
  signin(userdata) {
    const url = 'http://50.19.24.41/api/auth/login';
    return this.http.post(url, userdata);
  }

  forgot(mail) {
    const url = 'http://50.19.24.41/api/auth/request-reset-password';
    return this.http.post(url, mail);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!!localStorage.getItem('accessToken')) {
      return true;
    } else {
      this.route.navigate(['auth/login']);
    }
  }
  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
