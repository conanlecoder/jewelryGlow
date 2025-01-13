import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		shippingPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

		// Calculate taxPrice as 15% of itemsPrice (example tax rate)
		const taxPrice = Number((0.15 * itemsPrice).toFixed(2));

		const totalPrice = itemsPrice + shippingPrice + taxPrice;

		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});


// @desc    Get all orders for sellers
// @route   GET /api/orders/seller-orders
// @access  Private/Seller
const getSellerOrders = asyncHandler(async (req, res) => {
	if (!req.user || !req.user.isSeller) {
		res.status(403);
		throw new Error('Not authorized as a seller');
	}

	const orders = await Order.find({}).populate('user', 'name email');
	res.json(orders);
});


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email');

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

// @desc    Get all orders (Admin/Seller)
// @route   GET /api/orders
// @access  Private/Admin or Seller
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');
	res.json(orders);
});


// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

const cancelOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		// Check if the order has already been cancelled
		if (order.isCancelled) {
			res.status(400);
			throw new Error('This order has already been cancelled');
		}

		// Check if the order is already delivered
		if (order.isDelivered) {
			res.status(400);
			throw new Error('Delivered orders cannot be cancelled');
		}

		// Mark the order as cancelled and save
		order.isCancelled = true;
		order.cancelledAt = Date.now();

		const cancelledOrder = await order.save();
		res.json({
			status: 'cancelled',
			message: 'Order cancelled successfully',
			order: cancelledOrder,
		});
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});
// @desc    Validate order by seller
// @route   PUT /api/orders/:id/validate
// @access  Private/Admin or Seller
const validateOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isValidated = true;
		order.validatedAt = Date.now();

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	cancelOrder,
	validateOrder,
	getSellerOrders
};
