export interface loginDetails{
    email: string;
    password: string
}

export interface loginResponse {
  message: string,
  token: string
  error: string
  isAdmin: Boolean
}