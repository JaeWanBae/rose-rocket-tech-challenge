import { Modal, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;

	& .visually-hidden {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	& input {
		padding: 5px;
		margin-bottom: 5px;
	}
`;

const AddNewOrder = ({ fetchOrders }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [description, setDescription] = useState("");
	const [revenue, setRevenue] = useState("");
	const [cost, setCost] = useState("");

	const showModal = () => {
		setModalVisible(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API}/new-order`,
				{
					orderId,
					description,
					revenue,
					cost,
				}
			);

			if (data.error) {
				toast.error(data.error);
			} else {
				setCost("");
				setRevenue("");
				setDescription("");
				setOrderId("");
				fetchOrders();
				setModalVisible(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleCancel = () => {
		setModalVisible(false);
		setOrderId("");
		setDescription();
		setRevenue("");
		setCost("");
	};

	return (
		<>
			<Button
				type='primary'
				icon={<PlusCircleOutlined />}
				onClick={showModal}
				style={{ marginRight: 155, marginTop: 20, marginBottom: 20 }}
			>
				New Order
			</Button>
			<Modal
				title='Add New Order'
				visible={modalVisible}
				footer={null}
				onCancel={handleCancel}
				bodyStyle={{ height: 250 }}
			>
				<Form onSubmit={handleSubmit}>
					<label htmlFor='orderid' className='visually-hidden'>
						Order Id
					</label>
					<input
						id='orderId'
						type='number'
						min='1'
						placeholder='Order ID'
						value={orderId}
						onChange={(e) => setOrderId(e.target.value)}
					/>

					<label htmlFor='description' className='visually-hidden'>
						Order Description
					</label>
					<input
						id='description'
						type='text'
						placeholder='Order Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<label htmlFor='revenue' className='visually-hidden'>
						Order Revenue
					</label>
					<input
						id='revenue'
						type='number'
						placeholder='Revenue'
						value={revenue}
						onChange={(e) => setRevenue(e.target.value)}
						step='any'
					/>

					<label htmlFor='cost' className='visually-hidden'>
						Order Cost
					</label>
					<input
						id='cost'
						type='number'
						placeholder='Cost'
						value={cost}
						onChange={(e) => setCost(e.target.value)}
						step='any'
					/>

					<button
						disabled={!orderId || !description || !revenue || !cost}
						className='ant-btn ant-btn-primary'
					>
						Add
					</button>
				</Form>
			</Modal>
		</>
	);
};

export default AddNewOrder;
