import Joi from "joi";
import authService from "../services/auth";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../middlewares/error";

class AuthController {
	async login(request: Request, response: Response) {
		const login = request.body;
		validateLogin(login);
		// Return JSON Web Token
		const { accessToken, refreshToken, user } = await authService.login(
			login.email,
			login.password,
			login.remember
		);

		response
			.status(200)
			.header("X-Access-Token", accessToken)
			.cookie("X-Refresh-Token", refreshToken, {
				maxAge: login.remember ? 2592000000 : 432000000,
				httpOnly: true,
				secure: true,
				domain: request.header("Host")?.split(":")[0],
				sameSite: "lax",
			})
			.send(user);
	}

	async logout(request: Request, response: Response) {
		response
			.status(200)
			.cookie("X-Refresh-Token", "", {
				maxAge: 0,
				httpOnly: true,
				secure: true,
				domain: request.header("Host")?.split(":")[0],
				sameSite: "lax",
			})
			.send({ message: "Success" });
	}

	async refreshAccessToken(request: Request, response: Response) {
		const refreshToken = request.cookies["X-Refresh-Token"];

		if (!refreshToken) {
			throw new HttpError(
				"Invalid or missing refresh tokens",
				"INVALID_REFRESH_TOKEN",
				400
			);
		}
		const accessToken = await authService.refreshAccessToken(refreshToken);
		response
			.status(200)
			.header("X-Access-Token", accessToken)
			.header("Cache-Control", "no-store")
			.send({ message: "Success" });
	}

	catchErrors(handler: any) {
		return async (
			request: Request,
			response: Response,
			next: NextFunction
		) => {
			try {
				await handler(request, response);
			} catch (err: any) {
				// Custom response error
				if (err instanceof HttpError) {
					if (err.errorCode === 401) {
						response.status(401).send(err);
						return;
					} else if (err.errorCode == 403) {
						response.status(403).send(err);
						return;
					} else {
						response.status(400).send(err);
						return;
					}
				} else {
					// Internal Server Errors
					next(err);
				}
			}
		};
	}
}

const validateLogin = (login: any) => {
	const loginSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		remember: Joi.boolean(),
	});
	const result = loginSchema.validate(login);
	if (result.error) {
		throw new HttpError(result.error.details[0].message, "INVALID_FIELDS");
	}
};

const authController = new AuthController();
export default authController;
