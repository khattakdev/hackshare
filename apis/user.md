**Note:** You must pass Access tokens with all APIs.

## Register New User

#### /user/register [POST]

**input:** 
```
{
	"firstName": "Arsalan",
	"lastName": "Khattak",
	"email":"akkhattak65@gmail.com",
	"timeZone": "GMT +5",
	"countryCode": "92"
}
```
All fields are required

**Response:**
```
{
  msg: "User Registered",
  user: {
    "expertMeeting": 0,
    "learnerMeeting": 0,
    "challenegesAdded": 0,
    "challengesComplete": 0,
    "_id": "5f1008036cc91503f472b061",
    "firstName": "Arsalan",
    "lastName": "Khattak",
    "email": "akkhattak65@gmail.com",
    "timeZone": "GMT +5",
    "auth0Ref": "github|37709578",
    "picture": "https://avatars3.githubusercontent.com/u/37709578?v=4",
    "created_at": "2020-07-16T07:55:47.613Z",
    "updated_at": "2020-07-16T07:55:47.613Z",
    "__v": 0
  }
}
```

## Edit User [PUT]

#### /user/edit [PUT]

**input:** 
```
{
	"lastName": "Khan"
}
```
User must send atleast one field, else validation will fail

**Response:**
```
    "msg": "User Updated",
    "user": {
        "lastName": "Khann"
    }
```

## Who Am I?

Find who's currently logged in

#### /user/whoami [get]

**input:** no input

**Response:**
```
{
    "expertMeeting": 0,
    "learnerMeeting": 0,
    "challenegesAdded": 0,
    "challengesComplete": 0,
    "_id": "5f1008036cc91503f472b061",
    "firstName": "Arsalan",
    "lastName": "Khann",
    "email": "akkhattak65@gmail.com",
    "timeZone": "GMT +5",
    "auth0Ref": "github|37709578",
    "picture": "https://avatars3.githubusercontent.com/u/37709578?v=4",
    "created_at": "2020-07-16T07:55:47.613Z",
    "updated_at": "2020-07-16T08:25:30.611Z",
    "__v": 0
}
```

