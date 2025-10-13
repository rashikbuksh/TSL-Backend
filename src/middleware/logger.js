import winston from 'winston';
import path from 'path';
import fs from 'fs';

const { combine, timestamp, json, colorize, printf } = winston.format;

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true });
}

// const fileRotateTransport = new winston.transports.DailyRotateFile({
// 	filename: 'combined-%DATE%.log',
// 	datePattern: 'YYYY-MM-DD',
// 	maxFiles: '14d',
// });

const logger = winston.createLogger({
	format: combine(
		colorize({ all: true }),
		// errors({ stack: true }),
		timestamp({
			format: 'YYYY-MM-DD hh:mm:ss A',
		}),
		json()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(logsDir, 'error.log'),
			level: 'error',
		}),
		new winston.transports.File({
			filename: path.join(logsDir, 'combined.log'),
		}),
	],

	// transports: [fileRotateTransport],
	// exceptionHandlers: [
	// 	new winston.transports.File({ filename: 'exception.log' }),
	// ],
	// rejectionHandlers: [
	// 	new winston.transports.File({ filename: 'rejections.log' }),
	// ],
});

export default logger;
