// Signup.jsx
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const userRef = collection(db, "User-data");
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
    });

    const [message, setMessage] = useState(null); // Message state for success or error feedback

    const { firstName, lastName, emailId, password } = user;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await addDoc(userRef, { user });
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error("Error adding document:", error.message);
            setMessage("Failed to register. Please try again.");
        }
    };

    return (
        <div className="Login">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-label">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        name="firstName"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={handleChange}
                        placeholder="Input First Name"
                        required
                    />
                </div>
                <div className="input-label">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={handleChange}
                        placeholder="Input Last Name"
                        required
                    />
                </div>
                <div className="input-label">
                    <label htmlFor="emailId">Email ID</label>
                    <input
                        name="emailId"
                        id="emailId"
                        type="email"
                        value={emailId}
                        onChange={handleChange}
                        placeholder="Input email id"
                        required
                    />
                </div>
                <div className="input-label">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Input Password"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Submit</button>
            </form>

            {/* Display success or error message */}
            {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
        </div>
    );
}

export default SignUp;
