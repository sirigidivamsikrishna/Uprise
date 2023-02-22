import { Injectable, EventEmitter } from '@angular/core';
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
import { ArtistService } from '../shared/services/artist service/artist.service';
import { environment } from 'src/environments/environment';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  token: string;

  constructor(
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private artist: ArtistService
  ) {}
  ngOnInit() {
    this.spinner.show();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    let headers = request.headers
      .set('client-id', environment.CLIENT_ID)
      .set('client-secret', environment.cLIENT_SECRET)
      .set('Authorization', 'Bearer ' + token);

    const newRequest = request.clone({ headers });
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.auth.errorEmitter.emit(true);
        this.artist.errorLoader.emit(true);
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
