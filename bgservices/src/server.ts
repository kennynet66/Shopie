import express from 'express';
import cron from 'node-cron'
// import { welcomeUser } from './Mailservices/welcomeuser';
// import { confimBooking } from './Mailservices/bookedtour';

const app = express()

const run = async () => {
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('checking for a new user');
        
        await welcomeUser()
    }) 
    
    cron.schedule('*/10 * * * * *',async () => {
        console.log('checking for a new booking'); 
        
        await confimBooking()
    })
}

run()

app.listen(3000, ()=>{
    console.log("server running...");
})