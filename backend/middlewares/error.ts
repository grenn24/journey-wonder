import createDebug from "debug";
import logger from "../utilities/winston";

// log uncaught errors to console and file
const runtimeDebug = createDebug("app:runtime");

export default function error(err: any, request: any, response: any, next: any) {
	if (err) {
		runtimeDebug(err);
		logger("logs/errors.log").verbose(err);
		return response.status(500).send(err);
	} else {
		next();
	}
}
