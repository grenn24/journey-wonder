import { Request, Response } from "express";
import createDebug from "debug";
const runtimeDebug = createDebug("app:runtime");

// Cors middleware for cross origin requests (backend server hosted independently)
export default function cors(request: Request, response: Response, next: any) {
	const allowedOrigins = [
		"http://localhost:5173",
		"http://localhost",
		"http://www.journey-wonder.com",
		"https://www.journey-wonder.com",
	];
	const origin = request.header("Origin");
	runtimeDebug(`Origin: ${origin}`);

	if (origin) {
		allowedOrigins.includes(origin) &&
			response.setHeader("Access-Control-Allow-Origin", origin);
	}
	const headers = new Headers({
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, X-Access-Token",
		"Access-Control-Expose-Headers": "X-Access-Token",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Max-Age": "1728000",
	});
	response.setHeaders(headers);
    next();
}
