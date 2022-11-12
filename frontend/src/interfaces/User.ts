export type UserType = {

  email: string;

  password: string;

  rememberMe?: boolean;

  fullname: string;

  phone: string;

  city: string;

  id: number;

  role: number;
};

export type CredentialsType = {
  email: string,
  password: string,
  rememberMe?: boolean
};

export type UserRegisterType = Omit<UserType, 'id ' | 'role'>;
