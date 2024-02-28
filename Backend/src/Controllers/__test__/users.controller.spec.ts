import mssql from 'mssql';
import { createUser, getUser, getAllUsers, deleteUser, updateUser } from '../users.controller';

//test for createUser

describe("Account created successfully", ()=>{

    let res: any

    beforeEach(()=>{
        res={
            status:jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully creates account', async () => {
        const req = {
            body:{
                firstName: "Duncan",
                lastName: "Kingangi",
                email: "kingangi@gmail.com",
                password: "nervouswreck"
            }
        }

        const mockedInput = jest.fn().mockReturnThis

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createUser(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Account created successfully"})
        expect(res.status).toHaveBeenCalledWith(200);
    })
})

//test for getAllUsers

describe('Gets all accounts', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{
        req={
            body:{}
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully fetches all members', async () => {
        const mockedResult = [
            { id: '353545-43495835-458347575', firstName: 'Duncan', lastName: 'Kingangi', email: 'kingangi@teach2give.com', password: 'nervouswreck' },
            { id: '353545-43468335-454387435', firstName: 'Kenedy', lastName: 'Maina', email: 'kenny@teach2give.com', password: 'nervouswreck' }
        ]

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult })

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await getAllUsers(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ users: mockedResult });
    })
})

//test for getUser

describe('Gets a single user', ()=>{

    let req: any
    let res: any

    beforeEach(()=>{
        req = {
            params: {
                id: '353545-43495835-458347575', 
            },
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    })

    it('Successful fetch for a single member',async () => {
        const mockedResult = [
            { id: '353545-43495835-458347575', firstname: 'Kevin', lastname: 'Kimani', email: 'Kevin.Kimani@thejitu.com', cohortno: 22 }
        ]

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult [0] })

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await getUser(req as any, res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while fetching member." });
    })
})

//test for deleteUser


//test for updateUser
