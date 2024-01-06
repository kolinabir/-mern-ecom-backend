**All routes and Details information**

## User route

#### creating user/admin

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

`http://localhost:5000/api/auth/change-password`

**Must Pass the JWT from frontend**

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

