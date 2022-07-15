const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./todoHandler/todoHandler');

const app = express();
app.use(express.json());

//DB connection
mongoose.connect('mongodb://localhost:27017/todo_practice')
.then(() => {
    console.log('connection successfull');
})
.catch((err) => {
    console.log(err);
});

//default error handler
function errorHandler(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({error: err});

}

app.use('/todo', todoHandler);

app.listen(3000, () => {
    console.log('listening on port 3000');
});