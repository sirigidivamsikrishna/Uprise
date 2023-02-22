import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HttpConfigInterceptor } from 'src/app/interceptor/http-config.interceptor';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.BASE_URL;
  headers = new HttpHeaders();
  errorEmitter = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private route: Router) {}
  ngOnInit(): void {}
  signup(data: any) {
    const url = this.baseURL + 'auth/signup';
    return this.http.post(url, data);
  }
  avatars() {
    return this.http.get(this.baseURL + 'auth/avatars');
  }
  signin(userdata) {
    const url = this.baseURL + 'auth/login';
    return this.http.post(url, userdata);
  }

  forgot(mail) {
    const url = this.baseURL + 'auth/request-reset-password';
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
