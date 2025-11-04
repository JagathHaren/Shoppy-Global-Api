# ShoppyGlobe API

This is the backend for the **ShoppyGlobe E-commerce Application**, built with **Node.js, Express.js, MongoDB, and JWT Authentication** 
---

## Features
-  User authentication (register & login with JWT)
-  Product management (CRUD operations)
-  Cart management (add, update, delete items)
-  Secure endpoints with authorization
-  Well-documented API (Swagger/OpenAPI)

#  ShoppyGlobal API Structure

| Path/Folder        | Description                           |
|---------------------|---------------------------------------|
| `controllers/`      | Business logic for routes             |
| `models/`           | Mongoose schemas (MongoDB models)     |
| `routes/`           | Express route handlers                |
| `middleware/`       | Custom middlewares (auth, logger etc.)|
| `config/`           | Database & JWT configurations         |
| `server.js`            | Express app entry point               |
| `package.json`      | Project dependencies & scripts        |
| `README.md`         | Project documentation                 |

---
##  API Endpoints

###  User Authentication
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
|  POST | `/user/register` |  Register a user  |
|  POST | `/user/login`    |  Login a user     |

---

###  Product API
| Method   | Endpoint          | Description              |
|----------|-------------------|--------------------------|
|  GET   | `/products`       |  Get all products      |
|  GET   | `/products/:id`   |  Get product by ID     |
|  POST  | `/products`       |  Add new product       |
|  PUT   | `/products/:id`   |  Update existing product |
|  DELETE | `/products/:id`   |  Delete a product       |

---

### Cart API only when user is register or logged in
| Method   | Endpoint      | Description                  |
|----------|---------------|------------------------------|
|  POST  | `/cart`       |  Add item to cart           |
|  GET   | `/cart`       |  Get cart items             |
|  PUT   | `/cart/:id`   |  Update cart item quantity |
|  DELETE | `/cart/:id`   |  Remove item from cart      |


- **Error Handling & Validation**
- **MongoDB Integration**
- **Thunder Client Tested**


## Tech Stack
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Thunder Client (API Testing)  

---

## Setup Instructions

### Clone the repository & install dependencies

1. git clone [url](https://github.com/JagathHaren/Shoppy-Global-Api)
2. use cd to change directory
3. npm install


### Configure environment

Create a `.env` file in the root directory (based on `.env.example`):

```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=secret_key
```

### Seed the database with products

```bash
npm run seed
```

### Start the development server

```bash
npm run dev
```

Server will run at : **[http://localhost:4000](http://localhost:4000)**

---

## API Endpoints
### Auth

* **POST** `/register`    : Register new user
* **POST** `/login`       : Login & receive JWT

### Products

* **GET** `/products`     : Get all products
* **GET** `/products/:id` : Get single product details

### Cart (JWT Protected)

* **GET** `/cart`             : Get user’s cart
* **POST** `/cart`            : Add product to cart
* **PUT** `/cart/:itemId`     : Update cart item quantity
* **DELETE** `/cart/:itemId`  : Remove cart item

## Testing with Thunder Client

1. Install the **Thunder Client extension** in VS Code.
2. Create requests for each route (Auth, Products, Cart, DSA).
3. Use `Bearer Token` authentication for cart routes 
4. Verify responses 

## Github: https://github.com/JagathHaren/Shoppy-Global-Api