import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
// index.js or App.js
import '../dashboard.css';

const DashboardScreen = ({ history }) => {
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
    }, [dispatch, history, userInfo]);

    // Calculate summary data
    const pendingOrders = orders.filter((order) => order.status === 'Pending');
    const cancelledOrders = orders.filter((order) => order.status === 'Cancelled');
    const processingOrders = orders.filter((order) => order.status === 'Processing');
    const totalIncome = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    return (
        <div>
            <h1>Dashboard</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    {/* Summary Cards */}
                    <Row>
                        <Col md={3}>
                            <Card className="text-center bg-primary text-white">
                                <Card.Body>
                                    <Card.Title>Order Pending</Card.Title>
                                    <Card.Text>{pendingOrders.length}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center bg-danger text-white">
                                <Card.Body>
                                    <Card.Title>Order Cancel</Card.Title>
                                    <Card.Text>{cancelledOrders.length}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center bg-info text-white">
                                <Card.Body>
                                    <Card.Title>Order Process</Card.Title>
                                    <Card.Text>{processingOrders.length}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="text-center bg-success text-white">
                                <Card.Body>
                                    <Card.Title>Today Income</Card.Title>
                                    <Card.Text>${totalIncome.toFixed(2)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Recent Orders Table */}
                    <h2 className="mt-4">Recent Orders</h2>
                    <Table bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Payment Method</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'N/A'}</td>
                                <td>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>
                                    <Button variant="light" className="btn-sm">
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </>
            )}
        </div>
    );
};

export default DashboardScreen;
