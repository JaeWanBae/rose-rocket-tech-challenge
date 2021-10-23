import styled from "styled-components";
import "antd/dist/antd.css";
import { useState } from "react";
import UpdateOrder from "./UpdateOrder";
import Order from "./Order";
import axios from "axios";
import { toast } from "react-toastify";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
	max-width: 400px;
	min-width: 400px;
	border: 1px solid black;
	width: 20%;
	background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
	transition: backgrond-color 0.2 ease;
`;

const Header = styled.div`
	border-bottom: 1px solid black;
	text-align: center;
	background-color: lightgrey;
	margin-bottom: 10px;
`;

const Title = styled.h2`
	padding-top: 5px;
	font-size: 16px;
`;

const UnassignedOrder = ({ orders, handleOrderDelete, fetchOrders }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [revenue, setRevenue] = useState("");
	const [cost, setCost] = useState("");
	const [order_id, setOrder_id] = useState("");

	const handleCancel = () => {
		setModalVisible(false);
		setRevenue("");
		setCost("");
	};

	const postSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_API}/update-order/${order_id}`,
				{
					revenue,
					cost,
				}
			);

			fetchOrders();
			setModalVisible(false);
			toast.success("Revenue/Cost update");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Droppable droppableId='orderDroppable1'>
			{(provided, snapshot) => (
				<Container
					{...provided.droppableProps}
					ref={provided.innerRef}
					isDraggingOver={snapshot.isDraggingOver}
				>
					<Header>
						<Title>Unassigned Orders</Title>
					</Header>

					{orders &&
						orders.map((order, i) => {
							return (
								<Order
									order={order}
									setModalVisible={setModalVisible}
									setOrder_id={setOrder_id}
									setRevenue={setRevenue}
									setCost={setCost}
									handleOrderDelete={handleOrderDelete}
									i={i}
									key={order._id}
								/>
							);
						})}
					<UpdateOrder
						handleCancel={handleCancel}
						modalVisible={modalVisible}
						postSubmit={postSubmit}
						setRevenue={setRevenue}
						setCost={setCost}
						revenue={revenue}
						cost={cost}
						setOrder_id={setOrder_id}
					/>

					{provided.placeholder}
				</Container>
			)}
		</Droppable>
	);
};

export default UnassignedOrder;
