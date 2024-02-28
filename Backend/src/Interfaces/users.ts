export interface user{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface loginUserDetails{
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean
}
