
---

# Jewelry Glow E-Commerce Platform

This repository contains the code for **Jewelry Glow**, a complete e-commerce platform built using the MERN stack (MongoDB, Express, React, NodeJS). The platform features CRUD operations for products, user authentication, order management, and payment integration. The backend is connected to a MongoDB database, while the frontend is built with React and Redux for state management.

This project also implements real-time validation for orders by both sellers and admins, order cancellation, and a seamless user experience.

---

## **Features**

- **Home Page**: Displays a list of available products.
- **Product Page**: View individual product details.
- **Cart Page**: Add products to the cart and proceed to checkout.
- **Place Order Page**: Review your order before placing it.
- **Payment**: cash on delivery COD.
- **My Orders Page**: Users can view their order history.
- **Admin Dashboard**: Admins can manage products, users, and orders.
- **Seller Dashboard**: Sellers can validate orders and view their sales.
- **Order Management**:
    - **Order Validation** by both sellers and admins.
    - **Order Cancellation** feature.
    - **Order Delivery** tracking for admins.

---

## **Technologies Used**


### **Coding Practices**
- OOP (Object-Oriented Programming)
- MVC (Model-View-Controller)

### **Programming Languages/Frameworks**
- **JavaScript**
- **React**
- **Redux**
- **NodeJS**
- **Express**
- **MongoDB**
- **Postman**
- **Axios**

---

## **Screenshots**

### **Home Page**
![Home Page](path/to/homepage-screenshot.png)

### **Product Page**
![Product Page](path/to/productpage-screenshot.png)

### **Cart Page**
![Cart Page](path/to/cartpage-screenshot.png)

### **Place Order Page**
![Place Order Page](path/to/placeorderpage-screenshot.png)

### **Admin Dashboard**
![Admin Dashboard](path/to/admindashboard-screenshot.png)

---

## **Instructions**

### **Requirements**

Make sure you have the following installed:
- **NodeJS**  
  _We used node version 16.20.0 and npm version 6.14.9 at the time of creation._
- **MongoDB**  
  _We used mongo version 8.0 at the time of creation._
- **Postman**  
  _We used postman version 7.36.1 at the time of creation._

---

### **Setup**

#### **Clone the Repository**

```bash
git clone https://github.com/conanlecoder/jewelryglow.git
```

#### **Backend Setup**

1. Navigate to the root directory.
2. Install backend dependencies (do not `cd` into a subfolder):
   ```bash
   npm install
   ```

#### **Frontend Setup**

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

---

### **Database Setup**

1. **Start MongoDB server**
   ```bash
   mongod
   ```
2. **Enter the Mongo shell**
   ```bash
   mongo
   ```
3. **Insert data into the MongoDB database**
   ```bash
   npm run data:import
   ```

---





### **Run the Application**

To run both the frontend and backend, navigate to the root of the project and execute:

```bash
npm run dev
```

---

## **Live Demo**

_Link to your live demo if applicable._

---

## **Authors**

- **RYANY Aymane**  
- **ELYATIMI Othmane**
---


