import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
	orderId: {
		type: Number,
		required: true,
		trim: true,
	},

	description: {
		type: String,
		required: true,
	},

	revenue: {
		type: Number,
		required: true,
		trim: true,
	},

	cost: {
		type: Number,
		required: true,
		trim: true,
	},
});

export default mongoose.model("Order", orderSchema);
