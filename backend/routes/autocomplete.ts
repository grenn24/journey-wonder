import express from "express";
import autocompleteController from "../controllers/autocomplete";

const autocomplete = express.Router();

// Define the route handlers
autocomplete.get(
	"/destination",
	autocompleteController.catchErrors(autocompleteController.destination.bind(autocompleteController))
);

export default autocomplete;