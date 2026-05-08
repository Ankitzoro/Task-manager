const Todo = require('../models/Todo.model')

const getAllTodos = async (req, res) => {
    try{
        const todos = await Todo.find({ owner: req.user })
        res.json(todos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            task: req.body.task,
            owner: req.user // This comes from the 'protect' middleware!
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTodo = async(req, res) => {

    try {
        const todoId = parseInt(req.params.id);
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: `Deleted todo with id ${todoId}`})
    } catch (error){
        res.status(400).json({ message: error.message })
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = req.body;

        console.log(`Attempting to update ID: ${id} with data:`, dataToUpdate);

        // findByIdAndUpdate takes: (ID, Data, Options)
        const updatedTodo = await Todo.findByIdAndUpdate(
            id, 
            dataToUpdate, 
            { returnDocument: 'after', runValidators: true } 
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found with that ID" });
        }

        res.json({ message: "Update successful!", updatedTodo });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(400).json({ message: "Update failed", error: error.message });
    }
};

    
module.exports = { getAllTodos, createTodo, deleteTodo,updateTodo };

// let todos = [{ id: 1, task: "Learn Node.js", completed: false }];

// const getAllTodos = (req, res) => {
//   res.json(todos);
// };

// const createTodo = (req, res) => {
//   const newTodo = {
//     id: todos.length + 1,
//     task: req.body.task,
//     completed: false,
//   };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// };

// const deleteTodo = (req, res) => {
//   const todoId = parseInt(req.params.id); // Convert the string "1" to a number 1

//   // We redefine the array to exclude the item with that ID
//   const originalLength = todos.length;
//   todos = todos.filter((t) => t.id !== todoId);

//   if (todos.length < originalLength) {
//     res.json({ message: `Deleted todo with id ${todoId}` });
//   } else {
//     res.status(404).json({ message: "Todo not found" });
//   }
// };

// const updateTodo = (req, res) => {
//   const todoId = parseInt(req.params.id);
//   const todo = todos.find((t) => t.id === todoId);

//   if (todo) {
//     todo.completed =
//       req.body.completed !== undefined ? req.body.completed : todo.completed;
//     todo.task = req.body.task || todo.task;

//     res.json({
//       message: "Updated successfully",
//       todo,
//     });
//   } else {
//     res.status(404).json({ message: "Todo not found" });
//   }
// };

// const patchTodo = (req,res) => {
//     const todoId = parseInt(req.params.id);
//     const todo = todos.find(t => t.id === todoId)

//     if(!todo) return res.status(404).json({message: "Not Found"})

//     if(req.body.task) todo.task = req.body.task;
//     res.json({message: "Field patched successfully", todo})
// };
// // We "export" these functions so index.js can see them
// module.exports = { getAllTodos, createTodo, deleteTodo, updateTodo, patchTodo };



