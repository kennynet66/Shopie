import mssql from 'mssql';
import { createCategory, getAllCategories } from '../category.Controller';
import { number } from 'joi';
describe("Category tests", () => {
    let res: any
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })
    it("Successfuly creates a category", async () => {
        const req = {
            body: {
                categoryName: "sample category"
            }
        }

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] })

        const mockedRequest =
        {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createCategory(req as any, res)

        expect(res.json).toHaveBeenCalledWith({ success: "Category created successfuly" })
        expect(res.status).toHaveBeenCalledWith(200)
    })

    it("returns an error if category name is empty", async () => {
        const req = {
            body: {
                categoryName: ""
            }
        }

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [0] })

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createCategory(req as any, res)

        expect(res.json).toHaveBeenCalledWith({ "error": "\"categoryName\" is not allowed to be empty" })
        expect(res.status).toHaveBeenCalledWith(202)
    })
})

describe('Get all categories', () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Gets all categories', async () => {

        const req = {}

        const mockedExecute = jest.fn().mockResolvedValue({recordSet: [1]})
        
        const mockedRequest = {
            execute: jest.fn().mockReturnValue(mockedExecute)
        }
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }
        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await getAllCategories(req as any, res)

            expect(res.json).toHaveBeenCalledWith({success: "Found some categories"})
            expect(res.status).toHaveBeenCalledWith(200)

    })
})