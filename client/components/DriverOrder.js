import { DeleteOutlined, DragOutlined } from "@ant-design/icons";
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
	background-color: white;

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

	& .anticon-drag {
		font-size: 15px;
		padding: 3px;
	}

	& .anticon-delete {
		color: red;
	}
`;

const DriverOrder = ({ order, i, handleOrderDelete, driver }) => {
	return (
		<Draggable draggableId={order._id} index={i}>
			{(provided) => (
				<OrderContainer {...provided.draggableProps} ref={provided.innerRef}>
					<DragOutlined {...provided.dragHandleProps} />
					<p className='description'>{order.description}</p>
					<p>${order.revenue}</p>
					<p>${order.cost}</p>
					<DeleteOutlined
						onClick={() => handleOrderDelete(order, driver._id)}
					/>
				</OrderContainer>
			)}
		</Draggable>
	);
};

export default DriverOrder;
