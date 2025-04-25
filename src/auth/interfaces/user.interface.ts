export interface Role {
  role_name: string;
}

export interface User {
  user_id: number;
  username: string;
  password_hash: string;
  roles: Role[];
}

type SafeUser = Omit<User, 'password_hash'>;
export default SafeUser;
