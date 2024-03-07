import mssql from 'mssql';
import { createCart, getAllUsersCarts, getUserCart, deleteCart, updateCart,  } from '../cart.Controller';

//test for create cart
describe("Cart created successfully", () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('Successfully creates cart', async () => {
        const req = {
            body: {
                id: "355yry4464-4564gg45t-45644644y-636633y3",
                userId: "45y45sfw-y363-faeqr53-6h67674-46744uujd",
                date: "2024-06-06T00:00:00",
                products: [{}, {}]
            }
        };

        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

        await createCart(req as any, res);

        expect(res.json).toHaveBeenCalledWith({ message: "Order created Successfully" });
    });
});


//test for getUserCart
describe("Gets a single cart", () => {

    let req: any
    let res: any;

    beforeEach(() => {
        req = {
            params: {
                id: '355yry4464-4564gg45t-45644644y-636633y3', 
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('Successfully got a single cart', async () => {
       
        const mockedResult = [
            { 
                userId: "45y45sfw-y363-faeqr53-6h67674-46744uujd",
                date: "2024-06-06T00:00:00",
                products: [{}, {}]
            }
        ];

        const mockedInput = jest.fn().mockReturnThis() 

        const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult });

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnThis()
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

       
        await getUserCart(req as any, res);

     
        expect(res.json).toHaveBeenCalledWith({ message: "Gets a single cart" });
    });

});

//test for getAllOrders
describe('Gets all carts', ()=>{
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

    it('Successfully fetches carts', async()=>{
        const mockedResult =[
            { id: '4756cf7d-ff5c-4b78-965d-864691cbe560', userId: '454y4655-dfg4-r67r-54h4-356633g3u466', date: "2024-06-06T00:00:00", products: [{}, {}]},
            { id: '4756cf7d-ff5c-4b78-965d-864691cbe560', userId: '454y4655-dfg4-r67r-54h4-356633g3u466', date: "2024-06-06T00:00:00", products: [{}, {}]}
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

        await getAllUsersCarts(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: "Gets all carts" });
    })
})

//test  for delete cart
describe('Cart deleted successfully', ()=>{

    let res: any
    let req: any

    beforeEach(()=>{

        req={
            params: {
                id: '4756cf7d-ff5c-4b78-965d-864691cbe560', 
            }
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully deletes order',async () => {
        const req={ body:{}}
        
        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await deleteCart(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Cart  deleted successfully"})
    })
})
