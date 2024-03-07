import mssql from 'mssql';
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, updateOrder } from '../orders.controller';


//test for createOrder
describe("Order created Successfully", ()=>{

    let res: any

    beforeEach(()=>{
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Order created Successfully"', async()=>{
        const req = {
            body:{
                cartId: "355yry4464-4564gg45t-45644644y-636633y3",
                userId: "45y45sfw-y363-faeqr53-6h67674-46744uujd",
                totalPrice: 4500,
                status: "Pending",
            }
        }

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

        await createOrder(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Order created Successfully"})
    })
})


//test for getSingleOrder
describe("Gets a single order", () => {

    let req: any
    let res: any;

    beforeEach(() => {
        req = {
            params: {
                id: '4756cf7d-ff5c-4b78-965d-864691cbe560', 
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('Successfully got a single order', async () => {
       
        const mockedResult = [
            { 
                orderId: '4756cf7d-ff5c-4b78-965d-864691cbe560',
                userId: '454y4655-dfg4-r67r-54h4-356633g3u466',
                totalPrice: 4500,
                status: 'Pending'
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

       
        await getSingleOrder(req as any, res);

     
        expect(res.json).toHaveBeenCalledWith({ message: "Gets a single order" });
    });

});

//test for getAllOrders
describe('Gets all orders', ()=>{
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

    it('Successfully fetches orders', async()=>{
        const mockedResult =[
            { orderId: '4756cf7d-ff5c-4b78-965d-864691cbe560', userId: '454y4655-dfg4-r67r-54h4-356633g3u466', totalPrice: 4500, status: 'Pending'},
            { orderId: '345553t45-3563-36u5-47h4-ry446644774', userId: '454664yr-545y-wrt3-e466-46h466h4422y', totalPrice: 3500, status: 'Pending'}
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

        await getAllOrders(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: "Gets all orders" });
    })
})



//test for updateOrder
describe("Order updated succesfully", ()=>{

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

    it('Successfully updates order',async () => {
        const req ={
            body:{
                userId: "454y4655-dfg4-r67r-54h4-356633g3u466",
                totalPrice: 4500,
                status: "Approved"
            }
        }
        
        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest ={
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool ={
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        await updateOrder(req as any, res);

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)
        expect(res.json).toHaveBeenCalledWith({message: "Order updated successfully"})      
    })
})

describe('Order deleted successfully', ()=>{

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

        await deleteOrder(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Order  deleted successfully"})
    })
})
