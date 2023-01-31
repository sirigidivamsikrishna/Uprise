import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth service/auth.service';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  token: string;
  constructor(
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.spinner.show();
    // this.token = localStorage.getItem('accessToken');
    // console.log(localStorage.getItem('accessToken'));
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    let headers = request.headers
      .set('client-id', '437920819fa89d19abe380073d28839c')
      .set('client-secret', '28649120bdf32812f433f428b15ab1a1')
      .set('Authorization', 'Bearer ' + token);

    const newRequest = request.clone({ headers });
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let ErrorMessage = this.ErrorToaster(error);
        this.spinner.hide();
        return throwError(ErrorMessage);
      })
    );
  }
  ErrorToaster(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.toast.warning('Your Offline');
    } else {
      this.toast.error(error.error.error);
    }
  }
}
