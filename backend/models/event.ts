import mongoose from "mongoose";

const categories: Record<string, string[]> = {
	Transport: ["Train", "Flight", "Cable", "Drive"],
	Accommodation: ["Stay"],
	Activity: ["Walk", "Food", "Sightseeing", "Theme Park"],
};

const eventSchema = new mongoose.Schema({
	itinerary: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "itineraries",
	},
	category: {
		type: String,
		enum: Object.keys(categories),
		required: true,
	},
	subcategory: {
		type: String,
		validate: {
			validator: function (this: any, value: any) {
				return categories[this.category].includes(value);
			},
			message: (props: any) =>
				`"${props.value}" is not a valid subcategory for category "${props.instance.category}"`,
		},
		required: true,
	},
	orderIndex: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	location: {
		name: String,
		address: String,
	},
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	notes: {
		type: String,
	},
	files: [Buffer]
});

const Event = mongoose.model("events", eventSchema);

export default Event;
