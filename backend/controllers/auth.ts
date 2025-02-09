import Joi from "joi";
import AuthService from "../services/auth";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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
			response
				.status(200)
				.header("X-Access-Token", accessToken)
				.send({ message: "Success" });
		} catch (err) {
			if (err instanceof mongoose.Error) {
				response.status(400).send({ message: err.message });
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
	});
	const result = loginSchema.validate(login);
	if (result.error) {
		return { message: result.error.details[0].message };
	}
};
