## Add Learning

#### learning/add [POST]

**input:**
```
{
	"topic": "javascript",
	"level": 1
}
```
**Response:**
```
{
    "msg": "Language/Skill Added",
    "responseData": {
        "_id": "5f102568e848881b00046da1",
        "user_id": "5f1008036cc91503f472b061",
        "topic": "javascript",
        "auth0Ref": "github|37709578",
        "created_at": "2020-07-16T10:01:12.363Z",
        "updated_at": "2020-07-16T10:01:12.363Z",
        "__v": 0
    }
}
```


## Update/Edit Expertise

#### learning/update [PUT]

**input:**
```
{
	"learning_id": "5f102568e848881b00046da1",
	"topic": "NodeJS UPDATED!!",
	"level": 3
}
```

**response:**
```
{
    "msg": "Language/Skill Updated",
    "responseData": {
        "_id": "5f102568e848881b00046da1",
        "user_id": "5f1008036cc91503f472b061",
        "topic": "NodeJS UPDATED!!",
        "auth0Ref": "github|37709578",
        "created_at": "2020-07-16T10:01:12.363Z",
        "updated_at": "2020-07-16T10:03:33.924Z",
        "__v": 0
    }
}
```


## Remove Expertise

### learning/remove [DELETE]

input:
```
{
	"learning_id": "5f10253e9cd6af43e4b2c6be"
}
```

response:
```
{
    "msg": "Language/Skill Removed",
    "responseData": {
        "_id": "5f102568e848881b00046da1",
        "user_id": "5f1008036cc91503f472b061",
        "topic": "NodeJS UPDATED!!",
        "auth0Ref": "github|37709578",
        "created_at": "2020-07-16T10:01:12.363Z",
        "updated_at": "2020-07-16T10:03:33.924Z",
        "__v": 0
    }
}
```

## Get All User's Expertise

### learning/:user_id [GET]

input
```
No Input
```

response:
```
{
    "msg": [
        {
            "_id": "5f1026b27474560454f47ce7",
            "user_id": "5f1008036cc91503f472b061",
            "topic": "Javascript",
            "auth0Ref": "github|37709578",
            "created_at": "2020-07-16T10:06:42.401Z",
            "updated_at": "2020-07-16T10:06:42.401Z",
            "__v": 0
        },
        {
            "_id": "5f1026d347a4ec358c4499cc",
            "user_id": "5f1008036cc91503f472b061",
            "topic": "Javascript Beginners",
            "auth0Ref": "github|37709578",
            "created_at": "2020-07-16T10:07:15.783Z",
            "updated_at": "2020-07-16T10:07:15.783Z",
            "__v": 0
        }
    ]
}
```
