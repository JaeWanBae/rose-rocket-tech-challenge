import { EditOutlined, DeleteOutlined, DragOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const OrderContainer = styled.div`
	display: flex;
	width: 90%;
	margin: 0 auto 10px;
	border: 1px solid black;
	justify-content: space-evenly;
	align-items: center;
	margin-bottom: 15px;
	min-height: 50px;
	background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};

	& .anticon:hover,
	.anticon:focus {
		cursor: pointer;
	}

	& p {
		text-align: center;
		margin: 0;
		padding: 5px 0;
	}

	& .description {
		width: 120px;
	}

	& .anticon-delete {
		color: red;
	}

	& .anticon-drag {
		font-size: 15px;
		padding: 3px;
	}
`;

const Order = ({
	order,
	setModalVisible,
	setOrder_id,
	setRevenue,
	setCost,
	handleOrderDelete,
	i,
}) => {
	return (
		<Draggable draggableId={order._id} index={i}>
			{(provided, snapshot) => (
				<OrderContainer
					{...provided.draggableProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					<DragOutlined {...provided.dragHandleProps} />
					<p className='description'>{order.description}</p>
					<p>${order.revenue}</p>
					<p>${order.cost}</p>
					<EditOutlined
						onClick={() => {
							setModalVisible(true);
							setOrder_id(order._id);
							setRevenue(order.revenue);
							setCost(order.cost);
						}}
					/>
					<DeleteOutlined onClick={() => handleOrderDelete(order)} />
				</OrderContainer>
			)}
		</Draggable>
	);
};

export default Order;
