import express from 'express';
import cron from 'node-cron'
import { confirmOrder } from './MailServices/orders';
import { welcomeUser } from './MailServices/register';

const app = express()

const run = async () => {
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('checking for a new user');
        
        await welcomeUser()
    }) 
    
    cron.schedule('*/10 * * * * *',async () => {
        console.log('checking for a new cart'); 
        
        await confirmOrder()
    })
}

run()

app.listen(5000, ()=>{
    console.log("server running...");
})