import nodemailer from 'nodemailer' 
import dotenv from 'dotenv';
import { mail_configs } from '../Interfaces/mail_config';

dotenv.config();

function createTransporter(config: mail_configs){
    const transporter = nodemailer.createTransport()

    return transporter
}

let configuration: mail_configs = ({
    service : '',
    host: '', 
    port: 587,
    requireTLS: true,
    auth:{
        user: "",
        pass: ""
    }
})

export const sendMail =async (messageOption: any) => {
    const transporter = await createTransporter(configuration)

    await transporter.verify()

    await transporter.sendMail(messageOption, (error, info)=>{
        if (error){
            console.log(error);  
        }else{
            console.log(info.response);           
        }
    })
}