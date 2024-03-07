import mssql from 'mssql';
import dotenv from 'dotenv';
import { sqlConfig } from '../Config/sql.config';
import ejs from 'ejs';
import { sendMail } from '../Helpers/emailhelper';
dotenv.config()

export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig)

    const users = (await pool.request().query('SELECT * FROM Users WHERE isWelcomed = 0')).recordset


    for(let user of users){
        ejs.renderFile('Templates/welcomeUser.ejs', {CustomerName: user.firstName}, async(error, data)=> {
            let mailOptions = {
                from : "itsronduncan@gmail.com",
                to: user.email, 
                subject: "Welcome to Shop.ie",
                html: data
            } 
            
            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE Users SET isWelcomed = 0')
            } catch (error) {
                console.log(error);
                
            }
        })
    }
}