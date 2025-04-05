
// export default Register;
// React imports for using state and effect hooks
import React, { useState, useEffect } from "react";

// Axios for making HTTP requests to the backend
import axios from "axios";

// useNavigate from react-router-dom to programmatically navigate between routes
import { useNavigate } from "react-router-dom"

// Register component
const Register = () => {

    // A boolean to switch between Login and Register form views
    const [isLogin, setIsLogin] = useState(false);

    // Form data state that holds user input for name, email, and password
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Hook to navigate user to different pages (after login or register)
    const navigate = useNavigate();


    // Handles changes in form inputs
    const onchangehandler = (e) => {
        const { name, value } = e.target;

        // Dynamically update the corresponding input value in formData
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    // Form submission handler
    const handlesubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh on form submit

        if (isLogin) {
            // User is trying to login, so only send email and password
            const logindata = {
                email: formData.email,
                password: formData.password
            }

            try {
                // POST request to login route of backend
                const res = await axios.post("https://autoemailsq-1.onrender.com/user/login", logindata);

                if (res.data.success) {
                    alert("Login Successful");

                    // Save token to localStorage for session persistence
                    localStorage.setItem("token", res.data.token);

                    // Navigate to homepage
                    navigate("/");
                }
            } catch (error) {
                console.log(error); // Handle login errors
            }

        } else {
            // User is trying to register - send complete formData
            try {
                const res = await axios.post("https://autoemailsq-1.onrender.com/user/register", formData);

                if (res.data.success) {
                    alert("Register Successful");

                    // After successful registration, switch to login view
                    setIsLogin(true);
                }
            } catch (error) {
                console.log(error); // Handle registration errors
            }
        }

        // Reset form after submission (whether login or register)
        setFormData({
            name: "",
            email: "",
            password: "",
        })
    }

    // JSX to render the registration/login form UI
    return (
        <>
            {/* Page wrapper with gradient background and centered card */}
            <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 flex items-center justify-center px-4">
                {/* Card container */}
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition-all">

                    {/* Title heading that changes based on login or register mode */}
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>

                    {/* Form element with input fields and submit button */}
                    <form className="space-y-4" onSubmit={handlesubmit}>

                        {/* Name input only shown during registration */}
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onchangehandler}
                                placeholder="Full Name"
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        )}

                        {/* Email input - common to both login and registration */}
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={onchangehandler}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />

                        {/* Password input - common to both login and registration */}
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={onchangehandler}
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />

                        {/* Submit button - changes label based on login/register mode */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </form>

                    {/* Toggle between Login and Register modes */}
                    <p className="text-center mt-6 text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            className="text-blue-600 hover:underline font-medium"
                            onClick={() => setIsLogin(!isLogin)} // toggle form mode
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register;
