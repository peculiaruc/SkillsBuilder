export interface AuthInterface {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserInterface extends AuthInterface {

  fullname: string;

  phone: string;

  city: string;

}
