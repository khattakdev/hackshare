### Server

This is the Backend folder, all API, Authentication etc are in this folder.

### Folder Layout

#### Config

This is a configuration file, with the help of `config` package, this folder has global variables, which can be access everywhere. For example, MongoDB URI.

#### Controller

This folder contains all the API callbacks, that executes when a specific API Endpoint is hit.

#### Middleware

This folder has all the middlewares that needs to be executed before sending any response to client or interacting with Database. For example Authenticating User.

#### Routes

All the routes (Endpoints) are available here. This folder helps keeping `app.js` clean by adding just the first root level directory and further directories are specified in this folder. For example, `/user` has different Endpoints which are available in this folder.

- `/addProfile`
- `/editProfile`
