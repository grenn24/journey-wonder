import { Request, Response } from "express";

export default function cors(request: Request, response: Response, next: any) {
	const allowedOrigins = ["http://localhost:5173"];
	const origin = request.header("Origin");
	if (origin) {
		allowedOrigins.includes(origin) &&
			response.setHeader("Access-Control-Allow-Origin", origin);
	}
	const headers = new Headers({
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, X-Access-Token",
		"Access-Control-Expose-Headers": "X-Access-Token",
		"Access-Control-Allow-Credentials": "true",
	});
	response.setHeaders(headers);
    next();
}
