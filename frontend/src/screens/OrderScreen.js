import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  deliverOrder,
  validateOrder,
  cancelOrder,
} from '../actions/orderActions';
import {
  ORDER_DELIVER_RESET,
  ORDER_VALIDATE_RESET,
  ORDER_CANCEL_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderValidate = useSelector((state) => state.orderValidate);
  const { loading: loadingValidate, success: successValidate } = orderValidate;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancel, success: successCancel } = orderCancel;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order || successDeliver || successValidate || successCancel || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_VALIDATE_RESET });
      dispatch({ type: ORDER_CANCEL_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successDeliver, successValidate, successCancel, order]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const validateOrderHandler = () => {

    dispatch(validateOrder(orderId));
  };


  const cancelOrderHandler = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder(orderId));
    }
  };

  return loading ? (
      <Loader />
  ) : error ? (
      <Message variant="danger">{error}</Message>
  ) : (
      <>
        <Link to={userInfo.isAdmin ? '/admin/orderlist' : '/profile'} className="btn btn-light my-3">
          Go Back
        </Link>
        <h1>Order {order._id}</h1>
        {order.isCancelled && (
            <Message variant="danger">This order has been cancelled</Message>
        )}
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                    <Message variant="success">Delivered on {order.deliveredAt}</Message>
                ) : (
                    <Message variant="danger">Not Delivered</Message>
                )}

              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                    <Message>Your order is empty</Message>
                ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x {item.price} € = {item.qty * item.price} €
                              </Col>
                            </Row>
                          </ListGroup.Item>
                      ))}
                    </ListGroup>
                )}

              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{order.itemsPrice} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order.shippingPrice} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{order.taxPrice} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice} €</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {loadingDeliver && <Loader />}
                {loadingDeliver && <Loader />}
                {userInfo.isAdmin && !order.isDelivered && order.isValidated && !order.isCancelled && (
                    <ListGroup.Item>
                      <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                )}


                {loadingValidate && <Loader />}
                {(userInfo.isAdmin || userInfo.isSeller) &&  !order.isDelivered  && !order.isValidated && !order.isCancelled && (
                    <ListGroup.Item>
                      <Button type="button" className="btn btn-block" onClick={validateOrderHandler}>
                        Validate Order
                      </Button>
                    </ListGroup.Item>
                )}
                {loadingCancel && <Loader />}
                {!order.isCancelled && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                          type="button"
                          className="btn btn-block"
                          variant="danger"
                          onClick={cancelOrderHandler}
                      >
                        Cancel Order
                      </Button>
                    </ListGroup.Item>
                )}

              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
  );
};

export default OrderScreen;
