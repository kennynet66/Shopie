import mssql from 'mssql';
import dotenv from 'dotenv';
import { sqlConfig } from '../Config/sql.config';
import ejs from 'ejs';
import { sendMail } from '../Helpers/emailhelper'
dotenv.config()

export const confirmOrder= async()=>{
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().query('SELECT * FROM orders WHERE status = "Pending" ')).recordset

    console.log(users);
    
    for(let user of users){
        ejs.renderFile('Templates/welcomeUser.ejs', {CustomerName: user.name}, async(error, data)=>{
            let mailOptions = {
                from: "itsronduncan@gmail.com",
                to: user.email,
                subject: "Confirm Order",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE orders SET status = "Confirmed"')

                console.log("Email sent to confirm cart");
                
            } catch (error) {
                console.log(error);
            }
        })
    }
}