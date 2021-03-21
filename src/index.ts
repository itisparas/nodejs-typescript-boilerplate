import { logger, logHttpRequest } from './services/logger';
import * as dotenv from 'dotenv';
import express from 'express';
import dbConn from './services/db';

const helmet = require('helmet');

dotenv.config();

async function main() {
    let dbDetails: any = process.env.DB_DETAILS;
    dbDetails = JSON.parse(dbDetails);
    await dbConn(dbDetails);

    const app = express();
    app.use(helmet());
    app.use(logHttpRequest);

    app.get('/', (req, res) => {
        res.json({ 'message': 'Express server is up and running.' });
    });

    const port = process.env.PORT || 2910;

    app.listen(port, () => logger.log('silly', `Express server listening on PORT: ${port}`));
}

main();