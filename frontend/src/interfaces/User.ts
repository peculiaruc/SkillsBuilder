export interface AuthInterface {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserInterface extends Omit<AuthInterface, 'rememberMe'> {

  fullName: string;

  phone: string;

  city: string;

}
