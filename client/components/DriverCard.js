import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import DriverOrder from "./DriverOrder";
import axios from "axios";
import { useState, useEffect } from "react";

const Container = styled.div`
	border: 1px black solid;
	width: 20%;
	margin-left: 10px;
	min-width: 400px;
	background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
	transition: backgrond-color 0.2 ease;

	flex-direction: column;
`;

const NameHeader = styled.div`
	border-bottom: 1px solid black;
	text-align: center;
	background-color: lightgrey;
	position: relative;
	margin-bottom: 10px;

	& .anticon-close {
		position: absolute;
		right: 20px;
		top: 12px;
		color: #ff4d4f;
	}

	& .anticon-close:hover,
	.anticon-focus {
		cursor: pointer;
	}
`;

const Name = styled.h2`
	padding-top: 5px;
	font-size: 16px;
`;

const DriverCard = ({ driver, handleDriverDelete, provided, snapshot }) => {
	const [driverOrder, setdriverOrder] = useState([]);
	useEffect(() => {
		fetchDriverOrder();
	}, [driver]);

	const fetchDriverOrder = async () => {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API}/driver-orders/${driver._id}`
		);

		setdriverOrder(data);
	};

	return (
		<Container
			{...provided.droppableProps}
			ref={provided.innerRef}
			isDraggingOver={snapshot.isDraggingOver}
		>
			<NameHeader>
				<Name>{`Driver ${driver.firstName} ${driver.lastName}`}</Name>
				<CloseOutlined onClick={() => handleDriverDelete(driver)} />
			</NameHeader>
			{driver.orders.length === 0 ? (
				<p>No Orders Assigned</p>
			) : (
				driverOrder.map((order, i) => {
					return (
						<DriverOrder order={order} key={order._id} driver={driver} i={i} />
					);
				})
			)}
			{provided.placeholder}
		</Container>
	);
};

export default DriverCard;
