import { Injectable } from '@angular/core';
import { getEndpoint } from '../../utility/constants';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login_url: string;
  options: any;
  headers: any;
  constructor(private http: HttpClient) {
    this._prepare();
  }

  _prepare() {
    this.login_url = `${getEndpoint(false)}/auth`;
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
    this.options = {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    };
  }

  accountLogin(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.login_url}`, user).subscribe(
        async data => {
          return await resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

}
