export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  created_at: Date;
  created_by: string;
  modified_at: Date;
  modified_by: string;
  hash: string;
  salt: string;
  roles: Array<string>;
  active: Boolean;
}