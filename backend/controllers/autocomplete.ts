import Joi from "joi";
import authService from "../services/auth";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../middlewares/error";
import User from "../models/user";
import fs from "fs";
import config from "config";
import axios from "axios";
import autocompleteService from "../services/autocomplete";

class AutocompleteController {
	async destination(request: Request, response: Response) {
		const { query } = request.query;
		const destinations = await autocompleteService.searchDestinations(
			query as string
		);
        response.status(200).send(destinations);
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
				// Custom response errors
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

const autocompleteController = new AutocompleteController();
export default autocompleteController;
