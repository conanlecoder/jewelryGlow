import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import '../header.css'; // Import custom CSS file

const Header = () => {
	const dispatch = useDispatch();

	// Get user info from Redux state
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar
				style={{ backgroundColor: '#F5E9DA' }} // Light beige background
				className="text-uppercase"
				expand="lg"
				collapseOnSelect
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<img
								src="/images/logo.png" // Path to your logo file
								alt="Logo"
								width="200" // Adjust width as needed
								height="80"
								className="d-inline-block align-top"
							/>
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Route render={({ history }) => <SearchBox history={history} />} />
						<Nav className="ml-auto">
							{/* Cart */}
							<LinkContainer to="/cart">
								<Nav.Link className="custom-btn-text">
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>

							{/* User Dropdown */}
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="username"
									className="custom-btn-text"
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								// Login Link
								<LinkContainer to="/login">
									<Nav.Link className="custom-btn-text">
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}

							{/* Admin Dropdown */}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown
									title="Admin"
									id="adminmenu"
									className="custom-btn-text"
								>
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}

							{/* Seller Dropdown */}
							{userInfo && userInfo.isSeller && (
								<NavDropdown
									title="Seller"
									id="sellermenu"
									className="custom-btn-text"
								>
									<LinkContainer to="/seller/orders">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
