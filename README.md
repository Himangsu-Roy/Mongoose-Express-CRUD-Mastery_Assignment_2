# Node.js Express MongoDB TypeScript CRUD Application

This is a simple Node.js Express application with TypeScript for building a CRUD (Create, Read, Update, Delete) API. MongoDB is used for data storage, and Mongoose is the ODM (Object Document Mapper) to interact with MongoDB. Joi and Zod are used for data validation.

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

1. Install Dependencies
<pre>npm install</pre>

1. Configure Environment Variables
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000

1. Run the Application
<pre>npm run dev</pre>

1. API Endpoints

- Create a new user:
  POST /api/users
  Request Body:
  {
  // user data
  }

- Retrieve all users:
  GET /api/users

- Retrieve a specific user by ID:
  GET /api/users/:userId

- Update user information:
  PUT /api/users/:userId
  Request Body:
  {
  // updated user data
  }

- Delete a user:
  <p DELETE /api/users/:userId >

- Add a new product in order:

<pre>
PUT /api/users/:userId/orders
Request Body:
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
</pre>

- Retrieve all orders for a specific user:
<pre>
GET /api/users/:userId/orders
</pre>

- Calculate total price of orders for a specific user:
<pre>GET /api/users/:userId/orders/total-price
</pre>


5. Testing
You can use tools like Postman to test the API endpoints locally.


<pre>
Make sure to replace placeholders like `your_mongodb_connection_string` with your actual information. Additionally, tailor the content according to the structure and features of your application.
</pre>