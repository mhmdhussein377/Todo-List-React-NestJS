# Todo Documentation

## Table of Contents

- [Authentication](#Authentication)
    - [Register](#Register)
    - [Login](#Login)
- [Todo APIs](#TodoCrud)
    - [Create Todo](#CreateTodo)
    - [Update Todo](#UpdateTodo)
    - [Delete Todo](#DeleteTodo)
    - [Get All Todos](#GetAllTodos)

<br>
<a name="Authentication"></a>

### Authentication

> All routes, except for creating a new user account, require authentication using JSON Web Tokens (JWT). To obtain a JWT, you need to register and log in using the `/auth/register` and `/auth/login` endpoints.

<a name="Register"></a>

#### Example: Registration
```sh 
POST http://localhost:3000/auth/register 
'{"name": "your_name", email": "your_email", "password": "your_password"}'
"Content-Type: application/json"
```

<a name="login"></a>

#### Example: Login
```sh 
POST http://localhost:3000/auth/login
'{"email": "your_email", "password": "your_password"}'
"Content-Type: application/json"
```
The response will contain a JWT token

<br>
<a name="TodoCrud"></a>

### Todo APIs

<a name="CreateTodo"></a>

#### Create Todo
##### Endpoint: POST /todos/create
> Creates a new todo item for the authenticated user.

Example:
```sh
POST http://localhost:3000/todos/create 
"Authorization: Bearer YOUR_JWT_TOKEN" 
'{"description": "This is an example todo.", "priority": "LOW", "date": "2023-11-13T00:00:00.000Z", "completed": false}' 
"Content-Type: application/json"
```

Response:
```sh
{
  "id": 1,
  "description": "This is an example todo.",
  "priority": "LOW",
  "date": "2023-11-13T00:00:00.000Z",
  "completed": false,
  "userId": 1,
  "createdAt": "2023-11-12T00:00:00.000Z",
  "updatedAt": "2023-11-12T00:00:00.000Z"
}
```

<a name="UpdateTodo"></a>

#### Update Todo
##### Endpoint: PUT /todos/:id/update
> Updates an existing todo item for the authenticated user.

Example:
```sh
PUT http://localhost:3000/todos/1/create 
"Authorization: Bearer YOUR_JWT_TOKEN" 
'{"description": "This is an updated example todo."}' 
"Content-Type: application/json"
```

Response:
```sh
{
  "id": 1,
  "description": "This is an updated example todo.",
  "priority": "LOW",
  "date": "2023-11-13T00:00:00.000Z",
  "completed": false,
  "userId": 1,
  "createdAt": "2023-11-12T00:00:00.000Z",
  "updatedAt": "2023-11-12T00:00:00.000Z"
}
```

<a name="DeleteTodo"></a>

#### Delete Todo
##### Endpoint: DELETE /todos/:id/delete
> Deletes an existing todo item for the authenticated user.

Example:
```sh
DELETE http://localhost:3000/todos/1/delete 
"Authorization: Bearer YOUR_JWT_TOKEN" 
```

Response:
```sh
{
  "status": 200,
  "message": "Item deleted successfully"
}
```

<a name="GetAllTodos"></a>

#### Get All Todos
##### Endpoint: GET /todos/all
> Retrieves all todo items for the authenticated user.

Example:
```sh
GET http://localhost:3000/todos/all 
"Authorization: Bearer YOUR_JWT_TOKEN" 
'{"description": "This is an updated example todo."}' 
"Content-Type: application/json"
```

Response:
```sh
{
  "id": 1,
  "description": "This is an example todo.",
  "priority": "LOW",
  "date": "2023-11-13T00:00:00.000Z",
  "completed": false,
  "userId": 1,
  "createdAt": "2023-11-12T00:00:00.000Z",
  "updatedAt": "2023-11-12T00:00:00.000Z"
},
{
  "id": 1,
  "description": "This is another example todo.",
  "priority": "MEDIUM",
  "date": "2023-11-14T00:00:00.000Z",
  "completed": true,
  "userId": 1,
  "createdAt": "2023-11-12T00:00:00.000Z",
  "updatedAt": "2023-11-12T00:00:00.000Z"
},
```