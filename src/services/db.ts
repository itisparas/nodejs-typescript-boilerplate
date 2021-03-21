import { logger } from './logger';
import { Sequelize } from 'sequelize';

export default async function dbConn(dbDetails: any) {
    const dbConn = new Sequelize(dbDetails.DB_NAME, dbDetails.DB_USER, dbDetails.DB_PASS, {
        host: dbDetails.DB_HOST,
        port: dbDetails.DB_PORT,
        dialect: 'postgres',
        define: {
            createdAt: false,
            updatedAt: false
        }
    });
    try {
        await dbConn.authenticate();
        logger.info('DB connected successfully.');
    } catch (e) {
        logger.error('Error while connecting to DB.');
    }
};