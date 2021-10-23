import { Modal, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
	display: flex;
	justify-content: space-around;

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
	}
`;

const AddNewDriver = ({ fetchDrivers }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const showModal = () => {
		setModalVisible(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API}/new-driver`, {
				firstName,
				lastName,
			});

			setFirstName("");
			setLastName("");
			setModalVisible(false);
			fetchDrivers();
		} catch (err) {
			console.log(err);
		}
	};

	const handleCancel = () => {
		setModalVisible(false);
		setFirstName("");
		setLastName("");
	};

	return (
		<>
			<Button type='primary' icon={<PlusCircleOutlined />} onClick={showModal}>
				New Driver
			</Button>
			<Modal
				title='Add New Driver'
				visible={modalVisible}
				footer={null}
				onCancel={handleCancel}
			>
				<Form onSubmit={handleSubmit}>
					<label htmlFor='firstName' className='visually-hidden'>
						Driver First Name
					</label>
					<input
						id='firstName'
						type='text'
						placeholder='First Name'
						onChange={(e) => setFirstName(e.target.value.trim())}
						value={firstName}
					/>

					<label htmlFor='lastName' className='visually-hidden'>
						Driver Last Name
					</label>
					<input
						id='lastName'
						type='text'
						placeholder='Last Name'
						onChange={(e) => setLastName(e.target.value.trim())}
						value={lastName}
					/>

					<button
						disabled={!firstName || !lastName}
						className='ant-btn ant-btn-primary'
					>
						Add
					</button>
				</Form>
			</Modal>
		</>
	);
};

export default AddNewDriver;
