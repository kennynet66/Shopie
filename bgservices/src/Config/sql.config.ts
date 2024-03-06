import dotenv from 'dotenv';

dotenv.config()

export const sqlConfig = {
    //enter custom server credentials
    user: 'sa' || process.env.DB_USER,
    password: 'password123' || process.env.DB_PWD,
    database: 'XPLORA' || process.env.DB_NAME,
    server: "CALIGULA\\MSSQLSERVER1" ||process.env.SERVER,
    port: 1433,

    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },

    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}