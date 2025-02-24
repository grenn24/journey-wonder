
import winston, { transports, format } from "winston";
const { combine, timestamp, colorize, json } = format;
const {  File } = transports;

// log errors to a file or console
const logger = (filename: string) =>
	winston.createLogger({
		level: "info", // Set the log level (silly, debug, verbose, info, warn, error)
		format: combine(colorize({ all: true }), timestamp(), json()),
		transports: [
			//new Console({format: winston.format.combine(winston.format.colorize(),winston.format.prettyPrint()),}),
			new File({ filename: filename }),
		],
	});

export default logger;
