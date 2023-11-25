# Node.js Express MongoDB TypeScript CRUD Application

This is a simple Node.js Express application with TypeScript for building a CRUD (Create, Read, Update, Delete) API. MongoDB is used for data storage, and Mongoose is the ODM (Object Document Mapper) to interact with MongoDB. Joi and Zod are used for data validation.

## Prerequisites

- **Node.js installed on your machine**
- **MongoDB installed and running**

## Getting Started

#### 1. **Clone the Repository**

   ```bash
   git clone https://github.com/Himangsu-Roy/Mongoose-Express-CRUD-Mastery_Assignment_2.git
   cd your-project
   ```

#### 2. **Install Dependencies**
<pre>npm install</pre>

#### 3. **Configure Environment Variables**
<pre>
DATABASE_URL=your_mongodb_connection_url_string
NODE_ENV=development
PORT=5000
BCRYPT_SALT_ROUNDS=12
</pre>

#### 4. **Run the Application**
<pre>npm run dev</pre>

#### 5. **API Endpoints**

- Create a new user:
<pre>
  POST /api/users
  Request Body:
<code>
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}
</code>
</pre>

- **Retrieve all users:**
<pre><code>GET /api/users</code></pre>

- **Retrieve a specific user by ID:**
<pre><code>GET /api/users/:userId</code></pre>

- **Update user information:**
<per><code>PUT /api/users/:userId</code></per>

- **Delete a user:**
<pre><code>DELETE /api/users/:userId </code></pre>

- **Add a new product in order:**

<pre>
PUT /api/users/:userId/orders
Request Body:
<code>
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}
</code>
</pre>

- **Retrieve all orders for a specific user:**
<pre>
<code>
GET /api/users/:userId/orders
</code>
</pre>

- **Calculate total price of orders for a specific user:**
<pre><code>GET /api/users/:userId/orders/total-price</code>
</pre>

#### 6. **Testing**
   You can use tools like Postman to test the API endpoints locally.

<pre>

Make sure to replace placeholders like `your_mongodb_connection_url_string` with your actual information. Additionally, tailor the content according to the structure and features of your application.
</pre>
