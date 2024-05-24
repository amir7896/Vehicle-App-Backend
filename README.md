## Shopping app backend

This documentation provides details on how to use the API endpoints of the backend server.

## Installation

Before running the backend server, make sure to install the required dependencies. You can do this using the following command:

```bash
npm install
```

## For run server

1-nodemon
2-node index.js

## Table of Contents

1. [Signup](#Signup user)
2. [Login ](#Login user)
3. [Categories ](#Category apis)
4. [Vehicles ](#Vehicle apis)

## 1. Signup

- **URL**: POST /api/user/signup
- **Description**: Signup user.
- **Request Body**:
  - `username` (string): The name of user.
  - `email` (string): The email of user.
- **Response**:
  - `success` (boolean): `true` if the user signup successfully.
  - `message` (string): A success message.
  - `event` (Method): Send mail to user along password.

## 2. Login

- **URL**: POST /api/user/login
- **Description**: Login an existing user.
- **Request Body**:
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.
- **Response**:
  - `success` (boolean): `true` if the user was logged in successfully.
  - `token` (string): Authentication token.
  - `data` (object): User information object.
  - `message` (string): A success message.

## 3. Categories

### 1. Create category

- **URL**: POST /api/category/create
- **Description**: Create new category.
  **Request Body**:
- `categoryName` (string): The name of category.
- **Response**:
- `success` (boolean): `true` if category created successfully.
- `message` (string): A success message.
- `data` (object): An object of created category.

### 2. Get Categories

- **URL**: GET /api/category/list
- **Description**: Get categories list.
- **Response**:
- `success` (boolean): `true` if the categories were retrieved successfully.
- `data` (Array):An array of categories.

### 3. Get single category

- **URL**: GET /api/category/:id
- **Description**: Retrieve a single category by ID.
- **Request Params**:
- `id` (string): The ID of the category to retrieve
- **Response**:
- `success` (boolean): `true` if the category was retrieved successfully.
- `message` (string): A success message.
- `data` (object): The retrieved category.

### 4. Update category

- **URL**: PUT /api/category/update/:id
- **Description**: Update a category by ID.
- **Request Body**
- `categoryName` (string): Name of category to update.
- **Request Params**:
- `id` (string): The ID of the category to update.
- **Response**:
- `success` (boolean): `true` if the category was updated successfully.
- `message` (string): A success message.
- `data` (object): The updated category.

### 5. Delete category

- **URL**: DELETE /api/category/delete/:id
- **Description**: Delete a category by ID.
- **Request Params**:
- `id` (string): The ID of the category to delete.
- **Response**:
- `success` (boolean): `true` if the category was deleted successfully.
- `message` (string): A success message.

## 4. Vehicles

### 1. Create vehicle

- **URL**: POST /api/vehicle/create
- **Description**: Create new vehicle.
  **Request Body**:
- `category` (string): The category of vehicle.
- `color` (string): The color of vehicle.
- `make` (string): The make of vehicle.
- `model` (string): The model of vehicle.
- `registrationNo` (string): The registration no of vehicle.
- **Response**:
- `success` (boolean): `true` if category created successfully.
- `message` (string): A success message.
- `data` (object): An object of created category.

### 2. Get Vehicles

- **URL**: GET /api/vehicle/list
- **Description**: Get vehicles list.
- **Response**:
- `success` (boolean): `true` if the vehicles were retrieved successfully.
- `data` (Array):An array of vehicles.

### 3. Get single category

- **URL**: GET /api/vehicle/:id
- **Description**: Retrieve a single vehicle by ID.
- **Request Params**:
- `id` (string): The ID of the vehicle to retrieve
- **Response**:
- `success` (boolean): `true` if the vehicle was retrieved successfully.
- `message` (string): A success message.
- `data` (object): The retrieved vehicle.

### 4. Update category

- **URL**: PUT /api/vehicle/update/:id
- **Description**: Update a vehicle by ID.
- **Request Body**
- `category` (string): The category of vehicle.
- `color` (string): The color of vehicle.
- `make` (string): The make of vehicle.
- `model` (string): The model of vehicle.
- `registrationNo` (string): The registration no of vehicle.
- **Request Params**:
- `id` (string): The ID of the vehicle to update.
- **Response**:
- `success` (boolean): `true` if the vehicle was updated successfully.
- `message` (string): A success message.
- `data` (object): The updated vehicle.

### 5. Delete category

- **URL**: DELETE /api/vehicle/delete/:id
- **Description**: Delete a vehicle by ID.
- **Request Params**:
- `id` (string): The ID of the vehicle to delete.
- **Response**:
- `success` (boolean): `true` if the vehicle was deleted successfully.
- `message` (string): A success message.

### 6. Total Vehicle Save In System

- **URL**: GET /api/vehicle/total
- **Description**: Get total vehicles stored in system.
- **Response**:
- `success` (boolean): `true` if the total vehicles were retrieved successfully.
- `data` (number): Number of vehicles save in system.
