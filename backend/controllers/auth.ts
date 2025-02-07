import Joi from "joi";
import jwt from "jsonwebtoken";
import AuthService from "../services/auth";
import { Request, Response } from "express";
import mongoose from "mongoose";

const authService = new AuthService();

export async function login(request: Request, response: Response) {
	const login = request.body;
	const error = validateLogin(login);
	if (error) {
		return response.status(400).send(error);
	}
	try {
		if (await authService.login(login.email, login.password)) {
			// Return JSON Web Token
			jwt.sign
            response.status(200).send({message:"Success"});
        }
	} catch (err) {
		console.log(err);
		if (err instanceof mongoose.Error) {
			response.status(400).send({ message: err.message });
		} else {
            response.status(500).send(err);
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
