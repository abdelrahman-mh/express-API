export interface Signup {
   username: string;
   email: string;
   password: string;
}

export type SignIn = Omit<Signup, 'username'>;
