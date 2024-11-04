export interface User {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  roles: Roles[];
  isNew: boolean;
}


export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AuthStatus = 'authorized' | 'unauthorized';
