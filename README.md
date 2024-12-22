# Node.js API with JWT Authentication and CRUD Operations

This project is a Node.js-based API that provides JWT-based authentication and CRUD operations for managing users, roles, statuses, clients, products, categories, orders, and order details.

## Features
- Authentication: User login and registration with JWT token generation and 24-hour expiration.
- CRUD Operations:
  - Roles
  - Statuses
  - Users
  - Clients
  - Product Categories
  - Products
  - Orders and Order Details (master-detail structure for order management)
- Token validation: Ensures secure API access.
- Database: MySQL database integration using Sequelize.

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
Node.js  
MySQL  
Git (optional, for version control)  

### Installation
Clone this repository using Git:  
git clone https://github.com/PedroGalindo0911/Proyecto_NodeJs_DesafioWeb360.git  

Navigate to the project directory:  
cd Proyecto_NodeJs_DesafioWeb360  

Install dependencies:  
npm install  


## Usage

Start the server in development mode:  
npm run dev  

Start the server in production mode:  
npm start  

## Testing the API
You can use Postman or any API testing tool to interact with the endpoints. Ensure you include a valid JWT token for secured endpoints.

## License
This project is licensed under the MIT License.
