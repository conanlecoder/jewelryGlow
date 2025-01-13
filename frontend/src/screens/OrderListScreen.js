import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders, validateOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && (userInfo.isAdmin || userInfo.isSeller)) {
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, userInfo, history]);

	const validateHandler = (orderId) => {
		if (window.confirm('Are you sure you want to validate this order?')) {
			dispatch(validateOrder(orderId));
		}
	};

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table bordered hover responsive className='table-sm'>
					<thead>
					<tr>
						<th>ID</th>
						<th>User</th>
						<th>Date</th>
						<th>Total</th>
						<th>Delivered</th>
						<th>Validated</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{orders.map((order) => (
						<tr key={order._id}>
							<td>{order._id}</td>
							<td>{order.user && order.user.name}</td>
							<td>{order.createdAt.substring(0, 10)}</td>

							<td>{order.totalPrice} €</td>

							
							<td>
								{order.isDelivered ? (
									order.deliveredAt.substring(0, 10)
								) : (
									<i className='fas fa-times' style={{ color: 'red' }}></i>
								)}
							</td>
							<td>
								{order.isValidated ? (
									order.validatedAt.substring(0, 10)
								) : (
									<i className='fas fa-times' style={{ color: 'red' }}></i>
								)}
							</td>
							<td>
								<LinkContainer to={`/order/${order._id}`}>
									<Button variant='primary' className='btn-sm'>
										Edit
									</Button>
								</LinkContainer>
								{userInfo.isSeller && !order.isValidated && (
									<Button
										variant='success'
										className='btn-sm ml-2'
										onClick={() => validateHandler(order._id)}
									>
										Validate
									</Button>
								)}
							</td>
						</tr>
					))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
