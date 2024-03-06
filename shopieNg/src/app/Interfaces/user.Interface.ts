export interface User {
  firstName:string,
  lastName: string,
  email: string,
  password:string
}

export interface userResponse {
  message: string
}

export interface userInfoResponse {
  info: {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean
  },
  error:string
}
