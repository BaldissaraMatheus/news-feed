# CRUD de Notícias
Aplicação de publicação de notícias.

## Instruções
A aplicação depende de docker e docker-compose. Para executar a aplicação, entre na pasta do projeto e execute os seguintes comandos no terminal:
```
docker-compose build
docker-compose up
```

A aplicação frontend pode ser acessada pelo browser no endereço `http://localhost:3000` e a API no endereço `http://localhost:4000`.

## API

### POST /register
Faz o cadastro de um novo usuário.
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
message: "O campo x é obrigatório"
```

```
status code: 409
message: "Já existe um usuário cadastrado com este email"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```

### POST /login
Loga com credenciais e obtém um token de acesso. Note que todas as rotas de acesso a notícias necessitam deste token para serem acessadas.
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
message: "O campo x é obrigatório"
```

```
status code: 401
message: "Password incorreto"
```

```
status code: 404
message: "Não foi encontrado nenhum usuário com este email"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```

### GET /news
Lista todas as notícias
#### Query
```
skip (opcional): number, default: 0
limit (opctional): number, default: 20
```

#### Headers
```
Authorization: string - Token de autorização obtido no POST /login
```

#### Success Response
```
status codes: 200, 206
body: [
	{
		"_id": "60f4e76976ccd5001fceb080",
		"title": "Título bacana",
		"content": "Conteúdo interessante",
		"createdAt": "2021-07-19T02:46:01.753Z"
	}
]
```

#### Error Responses
```
status code: 401
message: "Authorization token inválido"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```

### POST /news
Publica nova notícia

#### Headers
```
Authorization: string - Token de autorização obtido no POST /login
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
message: "O corpo da requisição não pode estar vazio"
```

```
status code: 400
message: "O campo x é obrigatório"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```

### GET /news/:id
Busca notícia pelo seu ID

#### Headers
```
Authorization: string - Token de autorização obtido no POST /login
```

#### Success Response
```
status codes: 200
body: {
	"_id": "60f4e76976ccd5001fceb080",
	"title": "Título bacana",
	"content": "Conteúdo interessante",
	"createdAt": "2021-07-19T02:46:01.753Z"
}
```

#### Error Responses
```
status code: 401
message: "Authorization token inválido"
```

```
status code: 404
message: "Notícia não encontrada"
```

```
status code: 422
message: "O id informado é inválido"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```

### PATCH /news/:id
Atualiza um ou mais campos da notícia. Apenas um campo é obrigatório.

#### Headers
```
Authorization: string - Token de autorização obtido no POST /login
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
message: "Deve haver pelo menos um campo no corpo da requisição"
```

```
status code: 401
message: "Authorization token inválido"
```

```
status code: 404
message: "Notícia não encontrada"
```

```
status code: 422
message: "O id informado é inválido"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```

### DELETE /news/:id
Deleta notícia

#### Headers
```
Authorization: string - Token de autorização obtido no POST /login
```

#### Success Response
```
status codes: 204
body: {
	"_id": "60f4e76976ccd5001fceb080",
	"title": "Título bacana",
	"content": "Conteúdo interessante",
	"createdAt": "2021-07-19T02:46:01.753Z"
}
```

#### Error Responses
```
status code: 401
message: "Authorization token inválido"
```

```
status code: 404
message: "Notícia não encontrada"
```

```
status code: 422
message: "O id informado é inválido"
```

```
status code: 500
message: "Ocorreu um erro inesperado"
```