## Add Expertise

#### expertise/add [POST]

**input:**
```
{
	"topic": "File Handling in NodeJs", // Required
	"level": 1, // Min = 1 , Max = 3 , Required
	"tag": ["nodejs", "javascript] // Max = 3 , Required
}
```
**Response:**
```
{
    "msg": "Expertise Added",
    "responseData": {
        "tags": [],
        "_id": "5f1012b888ddb832d065f086",
        "user_id": "5f1008036cc91503f472b061",
        "topic": "Node Basics",
        "level": 1,
        "auth0Ref": "github|37709578",
        "created_at": "2020-07-16T08:41:28.717Z",
        "updated_at": "2020-07-16T08:41:28.717Z",
        "__v": 0
    }
}
```


## Update/Edit Expertise

#### expertise/update [PUT]

**input:**
```
{
	"topic": "Javascript, only solution",
	"level": 1,
	"expertise_id": "5f1012b888ddb832d065f086",
	"tags": ["nodejs", "javascript"]
}
```

**response:**
```
{
    "msg": "Expertise Updated",
    "responseData": {
        "tags": [
            "nodejs",
            "javascript"
        ],
        "_id": "5f1012b888ddb832d065f086",
        "user_id": "5f1008036cc91503f472b061",
        "topic": "Javascript, only solution",
        "level": 1,
        "auth0Ref": "github|37709578",
        "created_at": "2020-07-16T08:41:28.717Z",
        "updated_at": "2020-07-16T08:52:50.736Z",
        "__v": 0
    }
}
```


## Remove Expertise

### expertise/remove [DELETE]

input:
```
{
	"expertise_id": "5f10118ba50d7f31e0ab8e5b"
}
```

response:
```
{
    "msg": "Expertise Removed",
    "responseData": {
        "tags": [],
        "_id": "5f10118ba50d7f31e0ab8e5b",
        "user_id": "5f1008036cc91503f472b061",
        "topic": "File Handling in NodeJs",
        "level": 1,
        "auth0Ref": "github|37709578",
        "created_at": "2020-07-16T08:36:27.076Z",
        "updated_at": "2020-07-16T08:36:27.076Z",
        "__v": 0
    }
}
```

## Get All User's Expertise

### expertise/:user_id [GET]

input
```
{
	"expertise_id": "5f10118ba50d7f31e0ab8e5b"
}
```

response:
```
{
    "msg": [
        {
            "tags": [],
            "_id": "5f10129e0d88bb2d38319325",
            "user_id": "5f1008036cc91503f472b061",
            "topic": "Node Basics",
            "level": 1,
            "auth0Ref": "github|37709578",
            "created_at": "2020-07-16T08:41:02.626Z",
            "updated_at": "2020-07-16T08:41:02.626Z",
            "__v": 0
        },
        {
            "tags": [
                "nodejs",
                "javascript"
            ],
            "_id": "5f1012b888ddb832d065f086",
            "user_id": "5f1008036cc91503f472b061",
            "topic": "Javascript, only solution",
            "level": 1,
            "auth0Ref": "github|37709578",
            "created_at": "2020-07-16T08:41:28.717Z",
            "updated_at": "2020-07-16T08:52:50.736Z",
            "__v": 0
        }
    ]
}
```
