const express = require('express');
const app = express();
const todoController = require('./controllers/todoController'); // Import your module
const authController = require('./controllers/authController');
const { body, validationResult } = require('express-validator');
const swaggerUi = require('swagger-ui-express')
require('dotenv').config();
const mongoose = require('mongoose');
const protect = require('./middlewares/authMiddleware');
const dns = require("dns");
const cors = require('cors');
app.use(cors());

dns.setServers(["8.8.8.8", "8.8.4.4"])

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'My To-Do API',
    version: '1.0.0',
    description: 'A simple backend API with Auth and CRUD'
  },
  paths: {
    '/login': {
      post: {
        summary: 'Login to get a token',
        responses: { '200': { description: 'Success' } }
      }
    },
    '/todos': {
      get: {
        summary: 'Get all user tasks (Requires Token)',
        responses: { '200': { description: 'Success' } }
      }
    }
  }
};

// This creates the /api-docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
const PORT = process.env.PORT || 3000;
// Now your routes look much cleaner!
app.get('/todos',protect, todoController.getAllTodos);
app.post('/todos', protect, todoController.createTodo);
app.delete('/todos/:id', todoController.deleteTodo);
app.put('/todos/:id', todoController.updateTodo);
// app.post('/register', authController.register);

app.post('/register', [
  // Validation Rules
  body('username').isLength({ min: 5 }).withMessage('Username must be 5+ chars'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
], (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  // If no errors, call your controller
  authController.register(req, res);
});
app.post('/login', authController.login)
// app.patch('/todos/:id', todoController.patchTodo);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log("Failed to connect:", err));