const express = require('express');
var cors = require('cors')
require('./db_connection/mongodb');
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
const groupRouter = require('./routers/group')
const authenticationMiddleware = require('./middlewares/authentication');
const logsMiddleware = require('./middlewares/logs');
const errorHandlerMiddleware = require('./middlewares/errorhandler');

const app = express();
app.use(cors())

app.use(express.static('public'));
app.use(express.json());

app.use( '/api/users',logsMiddleware,userRouter);
app.use( '/api/todos' ,logsMiddleware ,authenticationMiddleware ,todoRouter);
app.use( '/api/groups' ,logsMiddleware,  authenticationMiddleware ,groupRouter);
app.use(errorHandlerMiddleware)


app.listen(process.env.PORT || 3000, () => {
    console.info(`server listening on port 3000`);
}); 