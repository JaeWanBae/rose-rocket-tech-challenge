import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const { Schema } = mongoose;

const driverSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true,
	},

	lastName: {
		type: String,
		trim: true,
		required: true,
	},

	orders: [
		{
			type: ObjectId,
			ref: "Order",
		},
	],
});

export default mongoose.model("Driver", driverSchema);
