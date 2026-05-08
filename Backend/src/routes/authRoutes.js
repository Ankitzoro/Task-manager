// const { body, validationResult } = require('express-validator');

// app.post('/register', [
//   // Validation Rules
//   body('username').isLength({ min: 5 }).withMessage('Username must be 5+ chars'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
// ], (req, res) => {
//   // Check for errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
  
//   // If no errors, call your controller
//   authController.register(req, res);
// });