import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authguard/auth/auth.service';
import { tap } from 'rxjs/operators';
import { CODE_REQUEST_TIMEOUT, CODE_REQUEST_UNAUTHORIZED, CODE_REQUEST_INVALID_USERSESSION } from '../utility/varlist/codeVarlist';

@Injectable()
export  class EDBSInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        authorization: `${this.auth.getToken()}`
      }
    });

    return next.handle(request).pipe(
      tap(event => {
          if (event instanceof HttpResponse) {
            if (event['headers'].get('authorization') && this.auth.getToken()) {
              this.auth.updateToken(event['headers'].get('authorization'));
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if ( error['headers'].get('authorization') && this.auth.getToken()) {
              this.auth.updateToken(error['headers'].get('authorization'));
            }
            if (
              CODE_REQUEST_TIMEOUT === error['error']['errorCode'] ||
              CODE_REQUEST_UNAUTHORIZED === error['error']['errorCode'] ||
              CODE_REQUEST_INVALID_USERSESSION === error['error']['errorCode']) {
              this.auth.logout();
            }
          }
        })
    );
  }
}
