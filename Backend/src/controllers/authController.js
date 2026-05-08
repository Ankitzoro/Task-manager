const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Generate salt
        const salt = await bcrypt.genSalt(10);

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create AND Save the user INSIDE the try block
        const newUser = new User({
            username: username,
            password: hashedPassword // Now it can see the variable!
        });

        await newUser.save();

        // 4. Send success response
        return res.status(201).json({ 
            message: "User created successfully!",
            user: { username: newUser.username } 
        });

    } catch (error) {
        // If anything fails above, it jumps here
        console.error("Registration Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find the user in MongoDB
        const foundUser = await User.findOne({ username: username });

        // Check if user even exists
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. COMPARE (This is usually where the 'not defined' error happens)
        // We compare the PLAIN text password from req.body 
        // with the HASHED password from foundUser.password
        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // 3. Generate Token
        const token = jwt.sign(
            { id: foundUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ message: "Login successful!", token });

    } catch (error) {
        // If you try to log 'hashedPassword' here, it will say NOT DEFINED
        // because that variable only existed in the REGISTER function!
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
module.exports = { register, login };
