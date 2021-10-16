# News CRUD
Web application for news publishing.
<br>
<br>
![image](https://user-images.githubusercontent.com/19363147/137604188-2afc0f04-2d93-47f9-9cbb-1f5488032672.png)

## Instructions
The app requires docker and docker-compose. To execute it, enter the project root folder and run the following commands on your OS terminal:
```
docker-compose build
docker-compose up
```

The frontend application can be accessed through a web browser on the address `http://localhost:3000` and the REST API on `http://localhost:4000`.

## API

### POST /register
Creates a new user.
#### Body
```
email: string;
password: string
```

#### Success Response
```
status code: 201
body: { "success": true }
```

#### Error Responses
```
status code: 400
message: "The x field is required"
```

```
status code: 409
message: "There is already a user created with this email"
```

```
status code: 500
message: "An unexpected error ocurred"
```

### POST /login
Log in with user credentials and gets an acess token. Note that all the access routes to news require this token.

#### Body
```
email: string;
password: string
```

#### Success Response
```
status code: 200
body: { "token": authorization-token }
```

#### Error Responses
```
status code: 400
message: "The x field is required"
```

```
status code: 401
message: "Wrong password"
```

```
status code: 404
message: "No user found with this email"
```

```
status code: 500
message: "An unexpected error ocurred"
```

### GET /news
Lists all the news
#### Query
```
skip (optional): number, default: 0
limit (optional): number, default: 20
```

#### Headers
```
Authorization: string - Authorization token obtained on POST /login
```

#### Success Response
```
status codes: 200, 206
body: [
	{
		"_id": "60f4e76976ccd5001fceb080",
		"title": "Nice title",
		"content": "Interesting content",
		"createdAt": "2021-07-19T02:46:01.753Z"
	}
]
```

#### Error Responses
```
status code: 401
message: "Invalid authorization token"
```

```
status code: 500
message: "An unexpected error ocurred"
```

### POST /news
Publish a new news

#### Headers
```
Authorization: string - Authorization token obtained on POST /login
```

#### Body
```
title: string
content: string
```


#### Success Response
```
status codes: 201
body: {
	"success": true
}
```

#### Error Responses
```
status code: 400
message: "The request body cannot be empty"
```

```
status code: 400
message: "The x field is required"
```

```
status code: 500
message: "An unexpected error ocurred"
```

### GET /news/:id
Find news by its id

#### Headers
```
Authorization: string - Authorization token obtained on POST /login
```

#### Success Response
```
status codes: 200
body: {
	"_id": "60f4e76976ccd5001fceb080",
	"title": "Nice title",
	"content": "Interesting content",
	"createdAt": "2021-07-19T02:46:01.753Z"
}
```

#### Error Responses
```
status code: 401
message: "Invalid authorization token"
```

```
status code: 404
message: "News not found"
```

```
status code: 422
message: "The passed id is invalid"
```

```
status code: 500
message: "An unexpected error ocurred"
```

### PATCH /news/:id
Updates one or more field of a news. Only one field is required.

#### Headers
```
Authorization: string - Authorization token obtained on POST /login
```

#### Body
```
title: string;
content: string;
```

#### Success Response
```
status codes: 204
body: {
	"success": true,
}
```

#### Error Responses
```
status code: 400
message: "There must be at least one field on the request body"
```

```
status code: 401
message: "Invalid authorization token"
```

```
status code: 404
message: "News not found"
```

```
status code: 422
message: "The passed id is invalid"
```

```
status code: 500
message: "An unexpected error ocurred"
```

### DELETE /news/:id
Delete news by its id

#### Headers
```
Authorization: string - Authorization token obtained on POST /login
```

#### Success Response
```
status codes: 204
```

#### Error Responses
```
status code: 401
message: "Invalid authorization token"
```

```
status code: 404
message: "News not found"
```

```
status code: 422
message: "The passed id is invalid"
```

```
status code: 500
message: "An unexpected error ocurred"
```
