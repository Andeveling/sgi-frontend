export interface User {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  roles: Roles[];
}


export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AuthStatus = 'authorized' | 'unauthorized';
