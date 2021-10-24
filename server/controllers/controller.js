import Driver from "../models/driver";
import Order from "../models/orders";
import mongoose from "mongoose";

export const newDriver = async (req, res) => {
	const { firstName, lastName } = req.body;

	if (!firstName) return;

	if (!lastName) return;

	const driver = new Driver({
		firstName,
		lastName,
	});

	try {
		await driver.save();
		return res.json({
			ok: true,
		});
	} catch (err) {
		console.log("ADDING NEW DRIVER FAILED", err);
		return res.status(400).send("Error, Try again");
	}
};

export const getDrivers = async (req, res) => {
	try {
		const drivers = await Driver.find().populate();
		res.json(drivers);
	} catch (err) {
		console.log(err);
	}
};

export const deleteDriver = async (req, res) => {
	try {
		await Driver.findByIdAndDelete(req.params._id);
		return res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export const newOrder = async (req, res) => {
	const { orderId, description, revenue, cost } = req.body;

	const exist = await Order.findOne({ orderId });
	if (exist) {
		return res.json({
			error: "Order ID must be unique",
		});
	}

	if (!orderId) return;
	if (!description) return;
	if (!revenue) return;
	if (!cost) return;

	const order = new Order({
		orderId,
		description,
		revenue,
		cost,
	});

	try {
		await order.save();
		return res.json({
			ok: true,
		});
	} catch (err) {
		console.log("ADDING NEW ORDER FAILED", err);
		return res.status(400).send("Error, Try again");
	}
};

export const getOrders = async (req, res) => {
	try {
		const orders = await Order.find().populate();
		res.json(orders);
	} catch (err) {
		console.log(err);
	}
};

export const deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params._id);
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export const updateOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});

		res.json(order);
	} catch (err) {
		console.log(err);
	}
};

export const getDriverOrders = async (req, res) => {
	try {
		const { orders } = await Driver.findById(req.params._id).populate("orders");
		if (!orders) {
			return;
		}
		res.json(orders);
	} catch (err) {
		console.log(err);
	}
};

export const updateDriverOrders = async (req, res) => {
	const { operation, driverId, objectId } = req.body;

	try {
		if (operation === "add") {
			const data = await Driver.findByIdAndUpdate(
				driverId,
				{
					$push: { orders: objectId },
				},
				{
					new: true,
				}
			);
			return res.json(data);
		}

		if (operation === "remove") {
			const data = await Driver.findByIdAndUpdate(
				driverId,
				{
					$pull: { orders: objectId },
				},
				{
					new: true,
				}
			);
			return res.json(data);
		}
	} catch (err) {
		console.log(err);
	}
};

export const deleteDriverOrder = async (req, res) => {
	const { driverId, orderId } = req.body;
	try {
		const data = await Driver.findByIdAndUpdate(
			driverId,
			{
				$pull: { orders: orderId },
			},
			{ new: true }
		);

		return res.json(data);
	} catch (err) {
		console.log(err);
	}
};
