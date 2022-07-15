const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('TodoPractice', todoSchema, 'TodoPractice');


router.get('/', async(req, res) => {

    const todo = await Todo.find({
        status: 'active'
    });
    try{
        res.status(200).json({
            data: todo,
            message: 'Todo Successfully retrieved'
        });
    }
    catch{
        res.status(500).json('There was a server side error');
    }

});

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    try{
        await newTodo.save() 
        res.status(200).json({ message: 'Success'});
    }
    catch(err){
        console.log(err);
        res.status(500).json('server side error');
    }
        // const todo = await newTodo.save((err) => {
        //     if(err){
        //         res.status(500).json({
        //             error: "There was a server side error",
        //         });
        //     }
        //     else{
        //         res.status(200).json({
        //             message: "Todo is saved successfully",
        //         });
        //     }
        // });
});

module.exports = router;

