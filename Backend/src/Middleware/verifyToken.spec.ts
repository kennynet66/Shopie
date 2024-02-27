import jwt from 'jsonwebtoken'
import { verifyToken } from './verifyToken'
import { Request } from 'express'

let mockRequest = () =>{
    return {
        headers:{
            token: "valid_token_for_testing_dskjgjfls_fdsjgfdj_fjhggkfsakjh"
        }
    }
}

let mockResponse = ()=>{
    return{
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

let mockNext = jest.fn()

describe('Testing this middleware', ()=>{

    it('authorizes the user', ()=>{
        let mockUser = {
            userId: "62df57e4-f2d7-4ddd-898c-022f91582113",
            firstName: "Sheeyaa",
            lastName: "Abraham",
            email: "sheeyaa@skiff.com"
        }

        let outputResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            info: mockUser
        }

        jest.spyOn(jwt, 'verify').mockResolvedValueOnce({
            outputResponse
        }as never)

        let next = mockNext()

        verifyToken(mockRequest as any, outputResponse as any, next)

        expect(mockNext).toHaveBeenCalledWith()
    })

    it('throws an error if token is missing', ()=>{
        let req ={
            headers:{}
        }

        let res = mockResponse()

        let next = mockNext()

        verifyToken(req as Request, res as any, next)

        expect(res.json).toHaveBeenCalledWith({
            message: "You do not have access"
        })
    })
})