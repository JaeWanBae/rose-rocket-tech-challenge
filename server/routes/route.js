import express from "express";

const router = express.Router();

// controller import
import {
	newDriver,
	getDrivers,
	deleteDriver,
	newOrder,
	getOrders,
	deleteOrder,
	updateOrder,
	getDriverOrders,
	updateDriverOrders,
} from "../controllers/controller";

router.post("/new-driver", newDriver);
router.get("/drivers", getDrivers);
router.delete("/delete-driver/:_id", deleteDriver);

router.post("/new-order", newOrder);
router.get("/orders", getOrders);
router.delete("/delete-order/:_id", deleteOrder);
router.put("/update-order/:_id", updateOrder);

router.get("/driver-orders/:_id", getDriverOrders);
router.put("/update-driverorders", updateDriverOrders);
module.exports = router;
