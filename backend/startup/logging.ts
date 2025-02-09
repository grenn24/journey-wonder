import winston, { transports, format, ExceptionHandler } from "winston";

const {
	combine,
	timestamp,
	colorize,
	prettyPrint,
	simple,
	json,
	printf,
} = format;
const { Console, File } = transports;
// catch uncaught errors that occur during runtime
const logging = () => {
	winston.createLogger({
		
		format: combine(
			colorize({ all: true }),
			printf((info) => String(info.message))
		),
		exceptionHandlers: [
			new Console({
				format: combine(
					colorize({ all: true }),
					printf((info) => String(info.message))
				),
			}),
		],
	});
	winston.createLogger({
		format: combine(timestamp(), json()),
		exceptionHandlers: [
			new File({
				filename: "logs/uncaughtErrors.log",
				format: combine(timestamp(), json()),
			}),
		],
	});
	process.on("unhandledRejection", (reason, promise) => {
		throw new Error(`${promise} Rejected: ${reason}`);
	});
};

export default logging;
