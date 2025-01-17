import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_VALIDATE_REQUEST,
	ORDER_VALIDATE_SUCCESS,
	ORDER_VALIDATE_FAIL,
	SELLER_ORDER_LIST_REQUEST,
	SELLER_ORDER_LIST_SUCCESS,
	SELLER_ORDER_LIST_FAIL,
	ORDER_CANCEL_REQUEST,
	ORDER_CANCEL_SUCCESS,
	ORDER_CANCEL_FAIL,
} from '../constants/orderConstants';

// Action to create a new order
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post('/api/orders', order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
		dispatch({ type: CART_CLEAR_ITEMS });
		localStorage.removeItem('cartItems');
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

// Action to get order details
export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

// Action to list user's orders
export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_MY_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/orders/myorders', config);

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

// Action to list all orders
export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/orders', config);

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

// Action to deliver an order
export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELIVER_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

		dispatch({ type: ORDER_DELIVER_SUCCESS });
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};
// Action to validate an order by a seller and admin
export const validateOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_VALIDATE_REQUEST });

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// Make put request to validate the order
		await axios.put(`/api/orders/${orderId}/validate`, {}, config);

		dispatch({ type: ORDER_VALIDATE_SUCCESS });
	} catch (error) {
		dispatch({
			type: ORDER_VALIDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// Action to list seller's orders
export const listSellerOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SELLER_ORDER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get('/api/orders/seller-orders', config);

		dispatch({
			type: SELLER_ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SELLER_ORDER_LIST_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

// Action to cancel an order
export const cancelOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CANCEL_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.put(`/api/orders/${orderId}/cancel`, {}, config);

		dispatch({ type: ORDER_CANCEL_SUCCESS });
	} catch (error) {
		dispatch({
			type: ORDER_CANCEL_FAIL,
			payload: error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

