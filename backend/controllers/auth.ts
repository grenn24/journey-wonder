import Joi from "joi";
import AuthService from "../services/auth";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../middlewares/error";
import { generateRefreshToken } from "../middlewares/auth";

export default class AuthController {
	authService = new AuthService();

	async login(request: Request, response: Response, next: NextFunction) {
		const login = request.body;
		const error = validateLogin(login);
		if (error) {
			response.status(400).send(error);
			return;
		}
		try {
			// Return JSON Web Token
			const { accessToken } = await this.authService.login(
				login.email,
				login.password
			);
			const refreshToken = login.remember
				? generateRefreshToken("30d")
				: generateRefreshToken("5d");
			response
				.status(200)
				.header("X-Access-Token", accessToken)
				.cookie("X-Refresh-Token", refreshToken, {
					maxAge: login.remember ? 2592000000 : 432000000,
					httpOnly: true,
					secure: true,
					domain: request.header("Host")?.split(":")[0],
					sameSite:"lax"
				})
				.send({ message: "Success" });
		} catch (err) {
			if (err instanceof HttpError) {
				response.status(400).send(err);
			} else {
				next(err);
			}
		}
	}
}

const validateLogin = (login: any) => {
	const loginSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(64).required(),
		remember: Joi.boolean(),
	});
	const result = loginSchema.validate(login);
	if (result.error) {
		return { message: result.error.details[0].message };
	}
};
