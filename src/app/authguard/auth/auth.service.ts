import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {
  }


  public getToken(): string {
    try {
      const session = localStorage.getItem('authorization');
      return session;
    } catch (ex) {
      return '';
    }
  }

  public updateToken(token): boolean {
    try {
      localStorage.setItem('authorization', token);
      return true;
    } catch (ex) {
      return false;
    }
  }


  public getUserName(): string {
    try {
      const userName = localStorage.getItem('userName');
      return userName;
    } catch (ex) {
      return '';
    }

  }

  isAuthenticated(): boolean {
    try {
      const session = localStorage.getItem('authorization');
      if (!session) {
        return false;
      }
      return true;
    } catch (ex) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('authorization');
    this.router.navigate(['/']);
  }

}
