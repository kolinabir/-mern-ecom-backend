**All routes and Details information**

## User route

#### creating user/admin

`http://localhost:5000/api/auth/register`

##### It'll take this data from frontend / demo data

`{
    "username": "user",
    "email": "user@user.com",
    "password": "securePassword1",
    "role": "user" // role could be admin too
}`

## Login Route

#### Login

`http://localhost:5000/api/auth/login`

##### Demo data

`{
    "username": "user",
    "password": "securePassword1"
}`

##### It'll return - demo

`{

}`

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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk4NTA3OWI2YzM3OWFmZDJmNjQyMmIiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNDU0NjUzNTM1NCwiZXhwIjoxNzA0NTQ2NTM4OTU0fQ.ybfzElebb7ObIB_5855G47UXpL8zNhyFCvZnITLpWzg"
    }
```
