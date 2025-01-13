import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders, validateOrder } from '../actions/orderActions';

const SellerOrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderValidate = useSelector((state) => state.orderValidate);
    const { success: successValidate } = orderValidate;

    useEffect(() => {
        if (userInfo && userInfo.isSeller) {
            dispatch(listOrders()); // Fetch all orders for sellers
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, successValidate]);

    const validateHandler = (id) => {
        if (window.confirm('Are you sure you want to validate this order?')) {
            dispatch(validateOrder(id));
        }
    };

    return (
        <>
            <h1>Orders to Validate</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table bordered hover responsive className="table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
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
                                {order.isValidated ? (
                                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                                ) : (
                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {!order.isValidated && (
                                    <Button
                                        variant="success"
                                        className="btn-sm"
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

export default SellerOrderListScreen;
