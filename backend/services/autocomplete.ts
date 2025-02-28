import mongoose from "mongoose";
import db from "../startup/db";
import {
	City,
	Country,
	Region,
	State,
} from "../models/autocomplete/destination";

class AutocompleteService {
	async searchDestinations(query: string) {
		const destinations = query ? await Country.aggregate([
			{
				$match: {
					name: { $regex: new RegExp(query, "i") },
				},
			},
			{
				$addFields: {
					value: { $concat: ["$name", ";", { $toString: "$id" }] },
					key: "$id",
				},
			},
			{
				$project: {
					name: 1,
					value: 1,
					key: 1,
					type: 1,
					_id: 0,
				},
			},
			{
				$unionWith: {
					coll: "city",
					pipeline: [
						{
							$match: {
								name: { $regex: new RegExp(query, "i") },
							},
						},
						{
							$addFields: {
								value: {
									$concat: [
										"$name",
										";",
										{ $toString: "$id" },
									],
								},
								key: "$id",
							},
						},
						{
							$project: {
								name: 1,
								value: 1,
								key: 1,
								type: 1,
								_id: 0,
							},
						},
					],
				},
			},
			{
				$unionWith: {
					coll: "region",
					pipeline: [
						{
							$match: {
								name: { $regex: new RegExp(query, "i") },
							},
						},
						{
							$addFields: {
								value: {
									$concat: [
										"$name",
										";",
										{ $toString: "$id" },
									],
								},
								key: "$id",
							},
						},
						{
							$project: {
								name: 1,
								value: 1,
								key: 1,
								type: 1,
								_id: 0,
							},
						},
					],
				},
			},
			{
				$unionWith: {
					coll: "state",
					pipeline: [
						{
							$match: {
								name: { $regex: new RegExp(query, "i") },
							},
						},
						{
							$addFields: {
								value: {
									$concat: [
										"$name",
										";",
										{ $toString: "$id" },
									],
								},
								key: "$id",
							},
						},
						{
							$project: {
								name: 1,
								value: 1,
								key: 1,
								type: 1,
								_id: 0,
							},
						},
					],
				},
			},
		]) : [];
		return destinations;
	}
}

const autocompleteService = new AutocompleteService();
export default autocompleteService;
