# Su;Go backend

#### How to start the backend - [``install node.js``](https://nodejs.org/en/download/) [``clone repo``](https://github.com/tysonkaufmann/su-go.git)
#### install the dependencies - ``npm install``
#### install nodemon - ``npm install nodemon``
#### install Validator - ``npm install express-validator``
#### install Jest - ``npm install jest --save-dev``
#### install Req and Res Mocker - ``npm i -D jest-mock-req-res``
#### install JWT - ``npm install jsonwebtoken``
#### install Supertest - ``npm install supertest --save-dev``
#### install UUID ``npm install uuid``
#### To run the server - ``` npm run start```
#### Mongoose  
Schemas (models folder) can be added using mongoose that will directly interact with MongoDB.
#### Express
API routes (routes folder) can be created using express router, and the Schemas (models folder).
#### Environment variables -> '.env' file
```process.env.*``` are the configuration variables used in the backend.  
For example - ```process.env.NODE_ENV``` should be 'production' when deployed.  
Example usage in application -```process.env.NODE_ENV === 'production'```

#### Dev port - ```localhost:5000```
#### Prod port = ```process.env.PORT```
