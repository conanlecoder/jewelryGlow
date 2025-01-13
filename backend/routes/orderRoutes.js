import express from 'express';
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	validateOrder,
	cancelOrder, // Ensure cancelOrder is imported
} from '../controllers/orderController.js';
import { protect, admin, seller, adminOrSeller } from '../middleware/authMiddleware.js';

// Route for creating a new order (accessible to authenticated users)
router.route('/').post(protect, addOrderItems);

// Route for getting all orders (accessible to both admins and sellers)
router.route('/').get(protect, adminOrSeller, getOrders);

// Route for getting logged-in user's orders
router.route('/myorders').get(protect, getMyOrders);

// Route for getting a single order by ID
router.route('/:id').get(protect, getOrderById);

// Route for updating order to paid
router.route('/:id/pay').put(protect, updateOrderToPaid);
// Route for validate order
router.route('/:id/validate').put(protect, seller, validateOrder);
// Route for updating order to delivered
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

// Route for validating an order by a seller
router.route('/:id/validate').put(protect, seller, validateOrder);

// Route for cancelling an order
router.route('/:id/cancel').put(protect, cancelOrder);

export default router;
