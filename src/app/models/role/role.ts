import { User } from '../user/user';

export class Role {
  public id       ?: string;
  public name         ?: string;
  constructor(
    id: string,
    name: string
  ) {
    this.id = id;
    this.name = name;
  }
}