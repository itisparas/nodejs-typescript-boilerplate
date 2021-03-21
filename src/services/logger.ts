import winston from 'winston';
import { stringify } from 'flatted';

const customLogFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
export const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.label({ label: 'ExpressServer' }),
        winston.format.timestamp({
            format: ((): string => {
                return new Date().toLocaleString('en-IN');
            })
        }),
        customLogFormat
    ),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new winston.transports.File({ filename: './logs/silly-log.log', level: 'silly' }),
        new winston.transports.File({ filename: './logs/error-log.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/debug.log', level: 'debug' }),
        new winston.transports.File({ filename: './logs/http-log.log', level: 'http' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize()
            )
        })
    ]
});
export const logHttpRequest = (req: any, _res: any, next: any) => {
    let log: any = {
        method: req.method,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        headers: req.headers,
        cache: req.stale,
        ip: req.ip
    }
    if (req.params) log.params = stringify(req.params);
    if (req.query) log.query = stringify(req.query);
    if (req.body) log.body = stringify(req.body);
    logger.log('http', JSON.stringify(log));
    next();
}