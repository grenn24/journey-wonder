import createDebug from "debug";
import logger from "../utilities/winston";

// log uncaught errors to console

const runtimeDebug = createDebug("app:runtime");

export default function error(
	err: any,
	request: any,
	response: any,
	next: any
) {
	if (err) {
		runtimeDebug(err);
		logger("logs/errors.log").verbose(err);
		return response
			.status(500)
			.json({ status: "INTERNAL_SERVER_ERROR", message: err.message });
	} else {
		next();
	}
}

export class HttpError {
	errorCode?: number;
	status?: string | undefined;
	message: string;

	constructor(
		message: string,
		status: string | undefined = undefined,
		errorCode: number | undefined = undefined
	) {
		this.message = message;
		this.status = status;
		this.errorCode = errorCode;
	}
}
