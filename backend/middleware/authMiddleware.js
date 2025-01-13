import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]; // Extract token
			const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

			req.user = await User.findById(decoded.id).select('-password'); // Fetch user from DB
			console.log('Authenticated User:', req.user); // Log for debugging

			next(); // Proceed to the next middleware
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error('Not authorized as an admin')
	}
}
const adminOrSeller = (req, res, next) => {
	if (req.user && (req.user.isAdmin || req.user.isSeller)) {
		next(); // Allow if user is admin or seller
	} else {
		res.status(403); // Forbidden
		throw new Error('Not authorized as admin or seller');
	}
};


// Middleware to check if the user is a seller
const seller = (req, res, next) => {
	if (req.user && req.user.isSeller) {
		next();
	} else {
		res.status(403); // Forbidden
		throw new Error('Not authorized as a seller');
	}
};

export { protect, admin, seller, adminOrSeller };

