import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import NavBar from './routes/Navbar'
import Login from './routes/login'
import SignUp from './routes/Signup'
import { auth } from "./firebase"; 

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState(""); // State for welcome message

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setWelcomeMessage={setWelcomeMessage} welcomeMessage={welcomeMessage} />}>
                <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} setWelcomeMessage={setWelcomeMessage} />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
}
