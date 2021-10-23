import { Modal } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const Form = styled.form`
	display: flex;
	justify-content: space-between;
	height: 100%;

	& button {
		margin-top: 25px;
	}
`;

const InputContain = styled.div`
	display: flex;
	flex-direction: column;

	& label {
		font-weight: 500;
	}

	& input {
		padding: 5px;
	}
`;

const UpdateOrder = ({
	modalVisible,
	handleCancel,
	postSubmit,
	setRevenue,
	setCost,
	revenue,
	cost,
}) => {
	return (
		<Modal
			title='Add New Order'
			visible={modalVisible}
			footer={null}
			onCancel={handleCancel}
			mask={false}
		>
			<Form onSubmit={postSubmit}>
				<InputContain>
					<label htmlFor='revenue'>Revenue:</label>
					<input
						id='revenue'
						type='number'
						placeholder='Revenue'
						value={revenue}
						onChange={(e) => setRevenue(e.target.value)}
						step='any'
					/>
				</InputContain>

				<InputContain>
					<label htmlFor='cost'>Cost:</label>
					<input
						id='cost'
						type='number'
						placeholder='Cost'
						value={cost}
						onChange={(e) => setCost(e.target.value)}
						step='any'
					/>
				</InputContain>

				<button
					className='ant-btn ant-btn-primary'
					disabled={!revenue || !cost}
				>
					Update
				</button>
			</Form>
		</Modal>
	);
};

export default UpdateOrder;
