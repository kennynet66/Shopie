#!/bin/bash

echo "Installing dependencies..."

# Install development dependencies
npm install --save-dev @types/concurrently@^7.0.0
npm install --save-dev @types/dotenv@^8.2.0
npm install --save-dev @types/ejs@^3.1.5
npm install --save-dev @types/express@^4.17.21
npm install --save-dev @types/mssql@^9.1.5
npm install --save-dev @types/node-cron@^3.0.11
npm install --save-dev @types/nodemailer@^6.4.14
npm install --save-dev @types/nodemon@^1.19.6
npm install --save-dev concurrently@^8.2.2
npm install --save-dev nodemon@^3.0.3
npm install --save-dev @types/jest@^29.5.12
npm install --save-dev jest@^29.7.0
npm install --save-dev ts-jest@^29.1.2
npm install --save-dev typescript@^5.3.3

# Install runtime dependencies
npm install dotenv@^16.4.1
npm install ejs@^3.1.9
npm install express@^4.18.2
npm install mssql@^10.0.2
npm install node-cron@^3.0.3
npm install nodemailer@^6.9.9

echo "Dependencies installed successfully!"
