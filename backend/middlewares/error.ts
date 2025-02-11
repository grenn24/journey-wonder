import createDebug from "debug";
import logger from "../utilities/winston";

// log uncaught errors to console and file
const runtimeDebug = createDebug("app:runtime");

export default function error(
	err: any,
	request: any,
	response: any,
	next: any
) {
	if (err) {
		// print to console, log to file
		runtimeDebug(err);
		logger("logs/errors.log").verbose(err);
		// send http 500 status response
		return response.status(500).send(err);
	} else {
		next();
	}
}

export class HttpError {
	status?: string | undefined;
	message: string;

	constructor(message: string, status: string | undefined = undefined) {
		this.message = message;
		this.status = status;
	}
}
