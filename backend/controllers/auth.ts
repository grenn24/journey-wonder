import Joi from "joi";
import AuthService from "../services/auth";
import { Request, Response } from "express";
import mongoose from "mongoose";

export default class AuthController {
	authService = new AuthService();
	
	async login(request: Request, response: Response) {
		const login = request.body;
		const error = validateLogin(login);
		if (error) {
			return response.status(400).send(error);
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
				response.status(500).send(err);
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
