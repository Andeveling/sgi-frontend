export interface User {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  roles: Roles[];
  isNew: boolean;
}


export enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type AuthStatus = 'authorized' | 'unauthorized';
