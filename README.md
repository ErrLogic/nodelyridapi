# CodeIgniter 4 CRUD Application

Task Lyrid

## Deployment

To deploy this project

Fill the config inside `config/config.js` according to your setup

```bash
  host: "localhost",
  user: "yourdatabaseusername",
  password: "yourdatabasepassword",
  database: "lyrid",
```

Install Node Modules

```bash
  npm install
```

Run Project

```bash
  node app.js
```

## API Reference

#### Login

```http
  POST /api/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Get User List

```http
  GET /api/users
```

| Parameter           | Type     | Description                    |
| :------------------ | :------- | :----------------------------- |
| `Auth bearer token` | `string` | **Required**. your login token |

#### Get user by id

```http
  GET /api/user/${id}
```

| Parameter           | Type     | Description                       |
| :------------------ | :------- | :-------------------------------- |
| `id`                | `string` | **Required**. Id of item to fetch |
| `Auth bearer token` | `string` | **Required**. your login token    |

#### Create user

```http
  POST /api/register
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `full_name` | `string` | **Required** |
| `username`  | `string` | **Required** |
| `password`  | `string` | **Required** |

#### Update user by id

```http
  PUT /api/user/${id}
```

| Parameter           | Type     | Description                    |
| :------------------ | :------- | :----------------------------- |
| `full_name`         | `string` | **Required**                   |
| `username`          | `string` | **Required**                   |
| `password`          | `string` | **Required**                   |
| `Auth bearer token` | `string` | **Required**. your login token |

#### Delete user by id

```http
  DELETE /api/user/${id}
```

| Parameter           | Type     | Description                       |
| :------------------ | :------- | :-------------------------------- |
| `id`                | `string` | **Required**. Id of item to fetch |
| `Auth bearer token` | `string` | **Required**. your login token    |
