**All routes and Details information**

## User route

#### creating user/admin

_POST_

`http://localhost:5000/api/auth/register`

##### It'll take this data from frontend / demo data

```json
{
  "username": "user",
  "email": "user@user.com",
  "password": "securePassword1",
  "role": "user" // role could be admin too
}
```

## Login Route

#### Login

_POST_

`http://localhost:5000/api/auth/login`

##### Demo data

```json
{
  "username": "user",
  "password": "securePassword1"
}
```

##### It'll return - demo

```json
 "success": true,
    "message": "Login successfully",
    "data": {
        "user": {
            "_id": "65985079b6c379afd2f6422b",
            "username": "admin",
            "email": "admin@admin.com",
            "role": "admin"
        },
        "token": "Demo"  // jwt token
    }
```

#### Change Password Route

_POST_

`http://localhost:5000/api/auth/change-password`

**Must Pass the JWT from frontend**
**Only User or himself can change their password**

##### Demo data

```json
{
  "oldPassword": "securePassword1",
  "newPassword": "securePassword3"
}
```

##### Demo Returned Values

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": {
    "_id": "65985079b6c379afd2f6422b",
    "username": "admin",
    "email": "admin@admin.com",
    "role": "admin",
    "createdAt": "2024-01-05T18:54:49.742Z",
    "updatedAt": "2024-01-06T13:14:24.843Z"
  }
}
```

## Category Routes

#### Create category

_POST_
**Only admin can create a new category**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/categories/`

##### Demo data

```json
{
  "name": "TShirt"
}
```

##### Demo Returned Data

```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "name": "TShirt2",
    "createdBy": "6591bb9c4df3d7dfaf5ad82a",
    "_id": "659954e70a98ece393f09365",
    "createdAt": "2024-01-06T13:25:59.326Z",
    "updatedAt": "2024-01-06T13:25:59.326Z",
    "__v": 0
  }
}
```

#### Get All Category

_GET_
`http://localhost:5000/api/categories/`

##### Demo returned Data

```json
{
  "success": true,
  "message": "All Categories fetched successfully",
  "data": [
    {
      "_id": "659958753b42c956b54c2d17",
      "name": "TShirt32",
      "createdBy": {
        "_id": "659958593b42c956b54c2d12",
        "username": "admin"
      },
      "createdAt": "2024-01-06T13:41:09.967Z",
      "updatedAt": "2024-01-06T13:41:09.967Z",
      "__v": 0
    }
  ]
}
```

#### Get Single Category BY ID

_GET_

`http://localhost:5000/api/categories/:id`

##### Demo returned Data

```json
{
  "success": true,
  "message": "Single Category fetched successfully",
  "data": {
    "_id": "659958753b42c956b54c2d17",
    "name": "TShirt32",
    "createdBy": {
      "_id": "659958593b42c956b54c2d12",
      "username": "admin"
    },
    "createdAt": "2024-01-06T13:41:09.967Z",
    "updatedAt": "2024-01-06T13:41:09.967Z",
    "__v": 0
  }
}
```

#### Update Single Category BY ID

_PATCH_

**Only admin can update a new category**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/categories/:id`

##### DEMO DATA

```json
{
  "name": "BAGS"
}
```

##### Demo returned Data

```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "659958753b42c956b54c2d17",
    "name": "BAGS",
    "createdBy": "659958593b42c956b54c2d12",
    "createdAt": "2024-01-06T13:41:09.967Z",
    "updatedAt": "2024-01-06T13:49:03.296Z",
    "__v": 0
  }
}
```

#### Delete Single Category BY ID

_DELETE_

**Only admin can delete a new category**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/categories/:id`

##### Demo returned Data

```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "_id": "659958753b42c956b54c2d17",
    "name": "BAGS",
    "createdBy": "659958593b42c956b54c2d12",
    "createdAt": "2024-01-06T13:41:09.967Z",
    "updatedAt": "2024-01-06T13:49:03.296Z",
    "__v": 0
  }
}
```
