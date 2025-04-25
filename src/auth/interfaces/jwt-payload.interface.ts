export interface JwtPayload {
  user_id: string;
  username: string;
  roles: string[];
}

export interface LoginResponse {
  access_token: string;
}
