import { Role } from '../role/role';

export class User {
  public id?: string;
  public username?: string;
  public password?: string;
  public passwordconfirm?: string;
  public firstname?: string;
  public lastname?: string;
  public email?: string;
  public enabled?: boolean;
  public lastPasswordResetDate?: string;
  public authorities?: Array<Role>;
  constructor(
    id: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
    enabled: boolean,
    lastPasswordResetDate: string,
    authorities: Array<Role>
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.enabled = enabled;
    this.lastPasswordResetDate = lastPasswordResetDate;
    this.authorities = authorities;
  }
}
