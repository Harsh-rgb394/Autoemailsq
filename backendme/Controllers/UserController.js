const user = require("./../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller for registering a new user
const RegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const exist_user = await user.findOne({ email });
        if (exist_user) {
            return res.status(404).json({ message: "User already exists", success: false });
        }

        // Hash the password before saving
        const hashedpassword = await bcrypt.hash(password, 10);

        // Create the new user
        const result = await user.create({ name, email, password: hashedpassword });

        res.status(200).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while registering user", success: false });
    }
};

// Controller for user login
const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const exist_user = await user.findOne({ email });
        if (!exist_user) {
            return res.status(404).json({ message: "User does not exist", success: false });
        }

        // Compare entered password with stored hashed password
        const matchedpassword = await bcrypt.compare(password, exist_user.password);
        if (!matchedpassword) {
            return res.status(404).json({ message: "Password does not match", success: false });
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { email: exist_user.email, id: exist_user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ message: "User login successfully", success: true, data: exist_user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while logging in user", success: false });
    }
};

// Export the controllers
module.exports = { RegisterController, LoginController };
