import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db, auth } from "../firebase"; // Ensure 'auth' is exported from your firebase config
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import Firebase auth methods

function Login({ setIsLoggedIn, setWelcomeMessage }) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const [msg, setMsg] = useState(<div></div>);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = collection(db, "User-data");

        try {
            const response = await getDocs(userRef);
            const userdata = response.docs.map((doc) => ({
                data: doc.data(),
                id: doc.id,
            }));
            checkUserCredentials(userdata);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Error fetching user data. Please try again.");
        }
    };

    function checkUserCredentials(userdata) {
        const userMatch = userdata.find(
            (up) => email === up.data.user["emailId"] && password === up.data.user["password"]
        );

        if (userMatch) {
            setWelcomeMessage(`Welcome, ${userMatch.data.user["firstName"]}`);
            setError("");
            setIsLoggedIn(true);
        } else {
            setError("Credentials do not match");
        }
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user; // Firebase user object
            setWelcomeMessage(`Welcome, ${user.displayName}`); // Display name from Google
            setError("");
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setError("Google Sign-In failed. Please try again.");
        }
    };

    return (
        <div className="Login">
            <Link to="/signup">
                <button className="sign-up">Sign up</button>
            </Link>
            <div className="login-details">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Your email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter Your Email ID"
                        required
                    />

                    <label htmlFor="password">Your Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        required
                    />

                    <br />
                    <button className="login-button" type="submit">
                        Login
                    </button>
                    <button
                        className="login-with-google"
                        type="button" // Change to "button" to prevent form submission
                        onClick={handleGoogleSignIn}
                    >
                        Login with Google
                    </button>
                </form>
            </div>
            <div className="display-msg">
                {msg}
                {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
        </div>
    );
}

export default Login;
