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

## Order ROute

#### Create/Add new Order

_POST_

**Registered User and Non Register user Can Order**

> If jwt is available, Just pass the jwt with the json data , rest will be managed by backend. otherwise dont pass jwt.

`http://localhost:5000/api/order`

##### DEMO Data

```json
{
  "products": [
    {
      "productId": "659c13e11b156fbacbb9b050",
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "district": "Sample District",
  "thana": "Sample Thana",
  "address": "123 Main Street",
  "phoneNumber": 1234567890,
  "email": "john.doe@example.com",
  "additionalInfo": "Please handle with care",
  "status": "pending"
}
```

##### DEMO Returned Data

```json
{
  "success": true,
  "message": "Product Ordered successfully",
  "data": {
    "products": [
      {
        "productId": "659c13e11b156fbacbb9b050",
        "quantity": 2,
        "_id": "659c13eb1b156fbacbb9b055"
      }
    ],
    "customerName": "John Doe",
    "district": "Sample District",
    "thana": "Sample Thana",
    "address": "123 Main Street",
    "phoneNumber": "1234567890",
    "email": "john.doe@example.com",
    "additionalInfo": "Please handle with care",
    "status": "pending",
    "orderedBy": "6598572c764d4dba9cafaca7", // null , if user is not logged in
    "_id": "659c13eb1b156fbacbb9b054",
    "orderedDate": "2024-01-08T15:25:31.347Z",
    "__v": 0
  }
}
```

#### Add cart

_POST_

`http://localhost:5000/api/order/addProductToCart`

**Only Registered User Can Add Product to Cart**

##### DEMO Data

- Just pass the jwt with the json data , rest will be managed by backend
-
-

```json
{
  "products": [
    {
      "productId": "659c13e11b156fbacbb9b050",
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "district": "Sample District",
  "thana": "Sample Thana",
  "address": "123 Main Street",
  "phoneNumber": 1234567890,
  "email": "john.doe@example.com",
  "additionalInfo": "Please handle with care",
  "status": "pending"
}
```

##### DEMO Returned Data

```json
{
  "success": true,
  "message": "Product added to cart successfully",
  "data": {
    "products": [
      {
        "productId": "659c5a3ed6c071d4fdd457fe",
        "quantity": 2,
        "_id": "65a22bf28464fd4a1f017579"
      }
    ],
    "customerName": "John Doe",
    "district": "Sample District",
    "thana": "Sample Thana",
    "address": "123 Main Street",
    "phoneNumber": "1234567890",
    "email": "john.doe@example.com",
    "additionalInfo": "Please handle with care",
    "status": "pending",
    "orderedBy": "659c261690fa55c73a62d78d",
    "cartAdded": true,
    "_id": "65a22bf28464fd4a1f017578",
    "orderedDate": "2024-01-13T06:21:38.230Z",
    "__v": 0
  }
}
```

#### Order product from Cart

_PATCH_

`http://localhost:5000/api/order/user/cartToOrder/:productId`

**Registered User who added the product to the Cart, only he can Order the product**

- Just pass the jwt with the json data , rest will be managed by backend
-

#### Get All Cart Products of An User

_GET_

`http://localhost:5000/api/order/user/cart/:userID`

**Only Registered User or The Admin Can view items which are added to Cart**

- Just pass the jwt with the json data , rest will be managed by backend
-

##### DEMO Returned Data

```json
{
  "success": true,
  "message": "All Cart Items fetched successfully",
  "data": {
    "orders": [
      {
        "_id": "65a22bf28464fd4a1f017578",
        "products": [
          {
            "productId": {
              "_id": "659c5a3ed6c071d4fdd457fe",
              "title": "Jeans - Shorts",
              "price": 1,
              "image": "https://i.ibb.co/W6sFq5h/Rectangle-20.png",
              "description": "This is updated description here",
              "category": "659960c1ae471dbdae02e5c8",
              "companyName": "The Brother Company",
              "color": "Blind ddd",
              "averageRating": {},
              "id": "659c5a3ed6c071d4fdd457fe"
            },
            "quantity": 2,
            "_id": "65a22bf28464fd4a1f017579"
          }
        ],
        "customerName": "John Doe",
        "district": "Sample District",
        "thana": "Sample Thana",
        "address": "123 Main Street",
        "phoneNumber": "1234567890",
        "email": "john.doe@example.com",
        "additionalInfo": "Please handle with care",
        "status": "pending",
        "orderedBy": "659c261690fa55c73a62d78d",
        "cartAdded": true,
        "orderedDate": "2024-01-13T06:21:38.230Z",
        "__v": 0
      },
      {
        "_id": "65a22e524b59d0b6aa35a1f5",
        "products": [
          {
            "productId": {
              "_id": "659c5a3ed6c071d4fdd457fe",
              "title": "Jeans - Shorts",
              "price": 1,
              "image": "https://i.ibb.co/W6sFq5h/Rectangle-20.png",
              "description": "This is updated description here",
              "category": "659960c1ae471dbdae02e5c8",
              "companyName": "The Brother Company",
              "color": "Blind ddd",
              "averageRating": {},
              "id": "659c5a3ed6c071d4fdd457fe"
            },
            "quantity": 2,
            "_id": "65a22e524b59d0b6aa35a1f6"
          }
        ],
        "customerName": "John Doe",
        "district": "Sample District",
        "thana": "Sample Thana",
        "address": "123 Main Street",
        "phoneNumber": "1234567890",
        "email": "john.doe@example.com",
        "additionalInfo": "Please handle with care",
        "status": "pending",
        "orderedBy": "659c261690fa55c73a62d78d",
        "cartAdded": true,
        "orderedDate": "2024-01-13T06:31:47.000Z",
        "__v": 0
      }
    ],
    "totalPrice": 4
  }
}
```

## Dashboard

#### GET ALL Order

**Only Admin can see all Orders**

- Just pass the jwt with the json data , rest will be managed by backend
-

##### Get All Orders || Which are not added in the Cart

`http://localhost:5000/api/order?cartAdded=false`

###### DEMo returned Data

```json
{
  "success": true,
  "message": "All orders fetched successfully",
  "data": [
    {
      "_id": "659c13eb1b156fbacbb9b054",
      "products": [
        {
          "productId": "659c13e11b156fbacbb9b050",
          "quantity": 2,
          "_id": "659c13eb1b156fbacbb9b055"
        }
      ],
      "customerName": "John Doe",
      "district": "Sample District",
      "thana": "Sample Thana",
      "address": "123 Main Street",
      "phoneNumber": "1234567890",
      "email": "john.doe@example.com",
      "additionalInfo": "Please handle with care",
      "status": "pending",
      "orderedBy": "6598572c764d4dba9cafaca7",
      "orderedDate": "2024-01-08T15:25:31.347Z"
    }
  ]
}
```

##### Get All orders of a single Product (by id)

_It'll show all the orders of that product_
`http://localhost:5000/api/order?products.productId=659c13e11b156fbacbb9b050`

###### DEMo returned Data

```json
{
  "success": true,
  "message": "All orders fetched successfully",
  "data": [
    {
      "_id": "659c13eb1b156fbacbb9b054",
      "products": [
        {
          "productId": "659c13e11b156fbacbb9b050",
          "quantity": 2,
          "_id": "659c13eb1b156fbacbb9b055"
        }
      ],
      "customerName": "John Doe",
      "district": "Sample District",
      "thana": "Sample Thana",
      "address": "123 Main Street",
      "phoneNumber": "1234567890",
      "email": "john.doe@example.com",
      "additionalInfo": "Please handle with care",
      "status": "pending",
      "orderedBy": "6598572c764d4dba9cafaca7",
      "orderedDate": "2024-01-08T15:25:31.347Z"
    }
  ]
}
```

##### Get All orders By "'pending' | 'cancelled' | 'delivered' | 'processing'

###### Get Pending Orders

`http://localhost:5000/api/order?status=pending`

###### Get canceller Orders

`http://localhost:5000/api/order?status=cancelled`

###### Get delivered Orders

`http://localhost:5000/api/order?status=delivered`

###### Get processing Orders

`http://localhost:5000/api/order?status=processing`

##### Get All orders By orderedBy(registered User who ordered)

`http://localhost:5000/api/order?orderedBy=6598572c764d4dba9cafaca7`

##### Get All orders By PhoneNO

`http://localhost:5000/api/order?phoneNumber=01234512345`

##### Get All orders By Sorting

_use '-' for descending _
_By OrderDate_
`http://localhost:5000/api/order?sort=-orderedDate`
`http://localhost:5000/api/order?sort=orderedDate` // ascending

_You can sort by any of the properties_

##### Paginate By Page and Limit

_Here below- every page will contain 2 product _
`http://localhost:5000/api/order?page=3&limit=2`

##### You can combine as well

`http://localhost:5000/api/order?status=pending&sort=-createdAt&page=2&limit=3`

#### GET any order by ID

_Only Admin and the user who ordered that can view_
_Don't forget to pass jwt_
_Total Price of those products_

`http://localhost:5000/api/order/:orderID`

#### GET all orders of an User

_Only the user who ordered and Admin can view this_
_here id is userID_
_Don't forget to pass jwt_

`http://localhost:5000/api/order/user/:userId`

#### GET all orders by month and year and status

`http://localhost:5000/api/order/date?month=1&year=2024&status=delivered`

_Only Admin can view this_
_Don't forget to pass jwt_
_It'll show all the orders of that month and year_
_Also the combined total price of those products_


##### DEMO Returned Data

```json
{
    "success": true,
    "message": "All orders fetched successfully",
    "data": {
        "orders": [
            {
                "_id": "659d404492133c6c4639ff6e",
                "products": [
                    {
                        "productId": {
                            "_id": "659c5a3ed6c071d4fdd457fe",
                            "title": "Jeans - Shorts",
                            "price": 1,
                            "image": "https://i.ibb.co/W6sFq5h/Rectangle-20.png",
                            "averageRating": {},
                            "id": "659c5a3ed6c071d4fdd457fe"
                        },
                        "quantity": 4444,
                        "_id": "659d404492133c6c4639ff6f"
                    }
                ],
                "customerName": "Admin not",
                "district": "Khulna",
                "thana": "Bogura",
                "address": "0x7890706f001a2dc26ec1495f517edd18e339206b",
                "phoneNumber": "1763902654",
                "email": "user@user.com",
                "additionalInfo": "dd",
                "status": "delivered",
                "orderedBy": "6598572c764d4dba9cafaca7",
                "orderedDate": "2024-01-09T12:47:00.111Z",
                "__v": 0
            }
        ],
        "totalOrderPrice": 4444
    }
}
```
