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
} from '../controllers/orderController.js';
import { protect, admin, seller, adminOrSeller } from '../middleware/authMiddleware.js';

// Route for getting all orders (accessible to both admins and sellers)
router.route('/').get(protect, adminOrSeller, getOrders);

// Other routes
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id/validate').put(protect, seller, validateOrder);

export default router;
