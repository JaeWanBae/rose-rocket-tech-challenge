import DriverCard from "../components/DriverCard";
import UnassignedOrder from "../components/UnassignedOrder";
import AddNewDriver from "../components/AddNewDriver";
import AddNewOrder from "../components/AddNewOrder";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Wrapper = styled.div`
	margin: 0 auto;
	width: 90%;
`;

const Flex = styled.div`
	display: flex;
	justify-content: flex-start;
`;

const Container = styled.div`
	display: flex;
	min-height: 500px;
	margin-left: 10px;
	width: 100%;
`;

const Home = () => {
	const [drivers, setDrivers] = useState([]);
	const [orders, setOrders] = useState([]);
	const [columns, setColumns] = useState({});

	useEffect(() => {
		fetchDrivers();
		fetchOrders();
	}, []);

	useEffect(() => {
		const columns = {};

		const driverOrderIdArray = drivers
			.map((driver) => {
				columns[driver._id] = driver.orders;
				return driver.orders;
			})
			.flat();

		columns.orderDroppable1 = orders.filter((order) => {
			return !driverOrderIdArray.includes(order._id);
		});
		setColumns(columns);
	}, [orders, drivers]);

	const fetchDrivers = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API}/drivers`
			);

			setDrivers(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchOrders = async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/orders`);
			setOrders(data);
			setColumns({
				orderDroppable1: data,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleDriverDelete = async (driver) => {
		try {
			const answer = window.confirm(
				`Are you sure you want to remove ${driver.firstName} ${driver.lastName} as a driver?`
			);
			if (!answer) return;
			const { data } = await axios.delete(
				`${process.env.NEXT_PUBLIC_API}/delete-driver/${driver._id}`
			);
			if (data.error) {
				toast.error(data.error);
			}

			toast.success("Driver removed");
			fetchDrivers();
		} catch (err) {
			console.log(err);
		}
	};

	const handleOrderDelete = async (order) => {
		try {
			const answer = window.confirm(
				`Are you sure you want to remove this order (ID: ${order.orderId})?`
			);
			if (!answer) return;
			await axios.delete(
				`${process.env.NEXT_PUBLIC_API}/delete-order/${order._id}`
			);

			toast.error("Order removed");
			fetchOrders();
		} catch (err) {
			console.log(err);
		}
	};

	const onDragEnd = async (result) => {
		const { destination, source, draggableId } = result;
		console.log(result);

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = source.droppableId;
		const finish = destination.droppableId;

		if (start === finish) {
			const items = Array.from(columns[start]);
			const [reorderedItems] = items.splice(result.source.index, 1);
			items.splice(result.destination.index, 0, reorderedItems);
			setColumns((currentColumns) => {
				return {
					...currentColumns,
					[start]: items,
				};
			});
			return;
		}
		const newItems = Array.from(columns[start]);
		const [reorderedNewItem] = newItems.splice(source.index, 1);
		newItems.splice(reorderedNewItem, 0);

		if (start === "orderDroppable1") {
			setColumns((currentColumns) => {
				return {
					...currentColumns,
					[start]: currentColumns[start].filter(
						(order) => order._id !== draggableId
					),
					[finish]: [reorderedNewItem],
				};
			});
			await axios.put(`${process.env.NEXT_PUBLIC_API}/update-driverorders`, {
				driverId: finish,
				objectId: reorderedNewItem._id,
				operation: "add",
			});

			fetchDrivers();
			return;
		}

		if (finish === "orderDroppable1") {
			await axios.put(`${process.env.NEXT_PUBLIC_API}/update-driverorders`, {
				driverId: start,
				objectId: reorderedNewItem,
				operation: "remove",
			});
			fetchDrivers();
			return;
		}

		if (start !== "orderDroppable1") {
			await axios.put(`${process.env.NEXT_PUBLIC_API}/update-driverorders`, {
				driverId: start,
				objectId: reorderedNewItem,
				operation: "remove",
			});

			await axios.put(`${process.env.NEXT_PUBLIC_API}/update-driverorders`, {
				driverId: finish,
				objectId: reorderedNewItem,
				operation: "add",
			});

			fetchDrivers();
			return;
		}
	};

	return (
		<Wrapper>
			<ToastContainer position='top-right' autoClose={3000} />
			<AddNewOrder fetchOrders={fetchOrders} />
			<AddNewDriver fetchDrivers={fetchDrivers} />
			<Flex>
				<DragDropContext onDragEnd={onDragEnd}>
					<UnassignedOrder
						orders={columns.orderDroppable1}
						handleOrderDelete={handleOrderDelete}
						fetchOrders={fetchOrders}
						drivers={drivers}
					/>
					<Container>
						{drivers.map((driver) => {
							return (
								<Droppable droppableId={driver._id} key={driver._id}>
									{(provided, snapshot) => (
										<DriverCard
											snapshot={snapshot}
											driver={driver}
											handleDriverDelete={handleDriverDelete}
											provided={provided}
											fetchOrders={fetchOrders}
										/>
									)}
								</Droppable>
							);
						})}
					</Container>
				</DragDropContext>
			</Flex>
		</Wrapper>
	);
};

export default Home;
