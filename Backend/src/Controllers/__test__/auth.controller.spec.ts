import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mssql from 'mssql'
import { loginUser } from '../auth.controller'
import { Request } from 'express'


describe('Login Test Cases', ()=>{

    let res: any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('successfully logs in a user and return token', async()=>{
        let expectedUser = {
            email: "example@example.com",
            password: "hashedpwd hvust78gwigcdi87wfg8fwgiu"
        }

        const req ={
            body:{
                email: expectedUser.email,
                password: "correctPassword"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [expectedUser]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce('generated-token-ijdgfsgfoia-djfgkjkjg-dsfjgfds' as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Logged in successfully",
            token: "generated-token-ijdgfsgfoia-djfgkjkjg-dsfjgfds"
        })
    })

    test('Returns a validation error if email or password is missing', async()=>{
        const req = {
            body:{}
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenLastCalledWith({
            "error": "\"email\" is required"
        }) 
    })

    it('Returns a validation error if email or password is empty', async()=>{
        const req ={
            body: {
                email: "",
                password: ""
            }
        }

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenLastCalledWith({
            "error": "\"email\" is not allowed to be empty"
        }) 
    })

    it('Returns an error if email is not in database', async()=>{
        const req={
            body:{
                email: 'incorrect@gmail.com',
                password: '12345678'
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: []})
        } as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            "error": "User not found"
        }) 
    })

    it("Handles incorrect password scenarion", async()=>{
        const req={
            body:{
                email: 'correct@gmail.com',
                password: 'wrongPassword'
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [
                {
                    email: 'correct@gmail.com', 
                    password: 'hashedpwd-38698bf-fdnbnfdbnbdiiiyifds'
                }
            ]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

        await loginUser(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            "error": "Incorrect password"
        }) 

    })
})