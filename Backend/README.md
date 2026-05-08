backend/
│
├── src/
│   ├── controllers/       # Handles request & response logic
│   ├── models/            # Database schemas (MongoDB / Mongoose)
│   ├── routes/            # API route definitions
│   ├── middlewares/       # Custom middleware (auth, error handling)
│   ├── services/          # Business logic (optional but scalable)
│   ├── utils/             # Helper functions (JWT, email, etc.)
│   ├── config/            # DB config, environment setup
│   ├── constants/         # Static values, enums
│   ├── db/                # Database connection logic
│   ├── validators/        # Request validation (Joi/Zod)
│   ├── app.js             # Express app setup
│   └── server.js          # Entry point
│
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md