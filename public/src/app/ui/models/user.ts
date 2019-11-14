import { MyShow } from './my_show';
export class User {
  constructor(
    public email: string,
    public username: string,
    public password: string,
    public is_admin: boolean,
    public is_banned: boolean,
    public my_shows: Array<MyShow>
  ) { }
}
