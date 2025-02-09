import mongoose from "mongoose";
import Event from "./event";

const foodEventSchema = new mongoose.Schema({
	reservationNumber: String,
    mealType:{
        type:String,
        enum:["Breakfast","Brunch","Lunch","Tea","Dinner","Supper"],
        required:true
    },
	telephone: String,
	website: String,
});

const FoodEvent = Event.discriminator("foodEvents", foodEventSchema);
export default FoodEvent;
