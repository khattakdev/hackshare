# Server

This is the Backend folder, all API, Authentication etc are in this folder.

## Folder Layout

### Helper

This folder contains all the helper, High Order Functions functions.

### Controller

This folder contains all the API callbacks, that executes when a specific API Endpoint is hit.

### Middleware

This folder has all the middlewares that needs to be executed before sending any response to client or interacting with Database. For example Authenticating User.

### Model

This folder has all the MongoDb Schemas.

### Routes

All the routes (Endpoints) are available here. This folder helps keeping `app.js` clean by adding just the first root level directory and further directories are specified in this folder. For example, `/user` has different Endpoints which are available in this folder.

- `/addProfile`
- `/editProfile`

### Env

Create `.env` file with keys from `.env.example`.
