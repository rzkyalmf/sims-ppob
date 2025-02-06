export interface AuthPayload {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface Auth {
  token: string;
}
