**All routes and Details information**

## User route

#### creating user/admin

_POST_

`http://localhost:5000/api/auth/register`
`https://mern-ecom-backend-henna.vercel.app/api/auth/register`

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
`https://mern-ecom-backend-henna.vercel.app/api/auth/login`

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
`https://mern-ecom-backend-henna.vercel.app/api/auth/change-password`

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
`https://mern-ecom-backend-henna.vercel.app/api/categories/`

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
`https://mern-ecom-backend-henna.vercel.app/api/categories/`

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
`https://mern-ecom-backend-henna.vercel.app/api/categories/:id`

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
`https://mern-ecom-backend-henna.vercel.app/api/categories/:id`

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
**it'll be directly deleted from DB**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/categories/:id`
`https://mern-ecom-backend-henna.vercel.app/api/categories/:id`

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

## Product ROUTE

#### Create/Add new Product

_POST_

**Only admin can add a new PRODUCT**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/product`
`https://mern-ecom-backend-henna.vercel.app/api/product`

##### Demo data

```json
{
  "title": "Sample Product",
  "price": 29.99,
  "image": "https://example.com/sample-image.jpg",
  "description": "This is a sample product description.",
  "category": "659959683b42c956b54c2d1c",
  "companyName": "Sample Company",
  "sellerName": "John Doe",
  "policy": "Sample return policy",
  "size": "Medium",
  "color": "Blue",
  "sizes": ["Small", "Medium", "Large"],
  "quantity": 10
}
```

##### Returned DEMO data

```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "title": "Sample Product",
    "price": 29.99,
    "image": "https://example.com/sample-image.jpg",
    "description": "This is a sample product description.",
    "category": "659959683b42c956b54c2d1c",
    "companyName": "Sample Company",
    "sellerName": "John Doe",
    "policy": "Sample return policy",
    "size": "Medium",
    "color": "Blue",
    "addedBy": "659958593b42c956b54c2d12",
    "sizes": ["Small", "Medium", "Large"],
    "quantity": 10,
    "_id": "65995dabae471dbdae02e5a2",
    "createdAt": "2024-01-06T14:03:23.708Z",
    "updatedAt": "2024-01-06T14:03:23.708Z",
    "__v": 0,
    "averageRating": {},
    "id": "65995dabae471dbdae02e5a2"
  }
}
```

#### GET ALL PRODUCT

_GET_

`http://localhost:5000/api/product/`
`https://mern-ecom-backend-henna.vercel.app/api/product`

##### Returned DEMO DATA

```json
{
  "success": true,
  "message": "All products retrieved successfully",
  "data": [
    {
      "_id": "65995dabae471dbdae02e5a2",
      "title": "Sample Pasddaroductd14e21",
      "price": 29.99,
      "image": "https://example.com/sample-image.jpg",
      "description": "This is a sample product description.",
      "category": {
        "_id": "659959683b42c956b54c2d1c",
        "name": "TShirt324"
      },
      "companyName": "Sample Company",
      "sellerName": "John Doe",
      "policy": "Sample return policy",
      "size": "Medium",
      "color": "Blue",
      "addedBy": {
        "_id": "659958593b42c956b54c2d12",
        "username": "admin"
      },
      "sizes": ["Small", "Medium", "Large"],
      "quantity": 10,
      "createdAt": "2024-01-06T14:03:23.708Z",
      "updatedAt": "2024-01-06T14:03:23.708Z",
      "__v": 0,
      "reviews": [],
      "averageRating": 0,
      "id": "65995dabae471dbdae02e5a2"
    }
  ]
}
```

#### GET SINGLE PRODUCT

_GET_

`http://localhost:5000/api/product/:ID`
`https://mern-ecom-backend-henna.vercel.app/api/product`

##### DEMO returned Data

```json
{
  "success": true,
  "message": "Product Retrieved successfully",
  "data": {
    "_id": "65995dabae471dbdae02e5a2",
    "title": "Sample Pasddaroductd14e21",
    "price": 29.99,
    "image": "https://example.com/sample-image.jpg",
    "description": "This is a sample product description.",
    "category": {
      "_id": "659959683b42c956b54c2d1c",
      "name": "TShirt324"
    },
    "companyName": "Sample Company",
    "sellerName": "John Doe",
    "policy": "Sample return policy",
    "size": "Medium",
    "color": "Blue",
    "addedBy": {
      "_id": "659958593b42c956b54c2d12",
      "username": "admin"
    },
    "sizes": ["Small", "Medium", "Large"],
    "quantity": 10,
    "createdAt": "2024-01-06T14:03:23.708Z",
    "updatedAt": "2024-01-06T14:03:23.708Z",
    "__v": 0,
    "averageRating": {},
    "id": "65995dabae471dbdae02e5a2",
    "review": []
  }
}
```

#### UPDATE a Product

_PATCH_

**Only admin can update a product**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/product/:ID`
`https://mern-ecom-backend-henna.vercel.app/api/product`

##### DEMO DATA

###### Partial Update is Possible

###### Only these below is updating POSSIBLE

```json
{
  "title": "Sample Pasddaroductd14e21",
  "price": 29.991,
  "image": "https://example.com/sample-image.jpg1",
  "description": "This is a sample product description1",
  "category": "659960c1ae471dbdae02e5c8",
  "companyName": "Sample Company1",
  "sellerName": "John Doe1",
  "policy": "Sample return policy1",
  "size": "Medium1",
  "color": "Blue1",
  "sizes": ["Small1", "Medium1", "Larg1e"],
  "quantity": 101
}
```

##### DEMO Returned Data

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "65995dabae471dbdae02e5a2",
    "title": "Sample Pasddaroductd14e212",
    "price": 29.991,
    "image": "https://example.com/sample-image.jpg1",
    "description": "This is a sample product description1",
    "category": "659960c1ae471dbdae02e5c8",
    "companyName": "Sample Company1",
    "sellerName": "John Doe1",
    "policy": "Sample return policy1",
    "size": "Medium1",
    "color": "Blue1",
    "addedBy": "659958593b42c956b54c2d12",
    "sizes": ["Small1", "Medium1", "Larg1e"],
    "quantity": 101,
    "createdAt": "2024-01-06T14:03:23.708Z",
    "updatedAt": "2024-01-06T14:19:31.058Z",
    "__v": 0,
    "averageRating": {},
    "id": "65995dabae471dbdae02e5a2"
  }
}
```

#### DELETE a Product

_DELETE_

**Only admin can Delete a product**
**It'll be directly removed from DB**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/product/:ID`
`https://mern-ecom-backend-henna.vercel.app/api/product/:ID`

##### DEMO returned Data

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "_id": "65995dabae471dbdae02e5a2",
    "title": "Sample Pasddaroductd14e212",
    "price": 29.991,
    "image": "https://example.com/sample-image.jpg1",
    "description": "This is a sample product description1",
    "category": "659960c1ae471dbdae02e5c8",
    "companyName": "Sample Company1",
    "sellerName": "John Doe1",
    "policy": "Sample return policy1",
    "size": "Medium1",
    "color": "Blue1",
    "addedBy": "659958593b42c956b54c2d12",
    "sizes": ["Small1", "Medium1", "Larg1e"],
    "quantity": 101,
    "createdAt": "2024-01-06T14:03:23.708Z",
    "updatedAt": "2024-01-06T14:19:31.058Z",
    "__v": 0,
    "averageRating": {},
    "id": "65995dabae471dbdae02e5a2"
  }
}
```

## Review ROUTE

#### Create/Add new Review

_POST_

**Only USER can POST a product**

> Just pass the jwt with the json data , rest will be managed by backend

`http://localhost:5000/api/reviews/`
`https://mern-ecom-backend-henna.vercel.app/api/reviews`

##### DEMO DATA

```json
{
  "productID": "65985a8f90b18582b5cc9f03",
  "rating": 5.0,
  "review": "Nice COurse DamN!!!!!!"
}
```

##### DEMO Returned Data

```json
{
  "success": true,
  "message": "Review created successfully",
  "data": {
    "productID": "65985a8f90b18582b5cc9f03",
    "rating": 5,
    "review": "Nice COurse DamN!!!!!!",
    "createdBy": {
      "_id": "6598572c764d4dba9cafaca7",
      "username": "user",
      "email": "user@user.com",
      "role": "user",
      "createdAt": "2024-01-05T19:23:24.727Z",
      "updatedAt": "2024-01-05T19:23:24.727Z",
      "__v": 0
    },
    "_id": "65994f2e0a98ece393f09351",
    "__v": 0
  }
}
```

#### GET ALL Review

_GET_

`http://localhost:5000/api/reviews`
`https://mern-ecom-backend-henna.vercel.app/api/reviews`

##### DEMO Returned Data

```json
{
  "success": true,
  "message": "All Reviews fetched successfully",
  "data": [
    {
      "_id": "659963b9a9c83780d92fd3de",
      "productID": {
        "_id": "65985a8f90b18582b5cc9f03",
        "title": "Sample Pasddaroductd14e2",
        "price": 29.99,
        "quantity": 10,
        "averageRating": {},
        "id": "65985a8f90b18582b5cc9f03"
      },
      "rating": 5,
      "review": "Nice COurse DamN!!!!!!",
      "createdBy": {
        "_id": "6598572c764d4dba9cafaca7",
        "username": "user"
      },
      "__v": 0
    }
  ]
}
```
