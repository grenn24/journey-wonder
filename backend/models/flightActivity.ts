import mongoose from "mongoose";
import Activity from "./activity";

const flightActivitySchema = new mongoose.Schema({
	airline: {
		type: String,
	},
    flightNumber:{
        type: String
    },
	departure: {
		airport: String,
	},
	arrival: {
		airport: String,
	},
});

const FlightActivity = Activity.discriminator("FlightActivities",flightActivitySchema);
export default FlightActivity;