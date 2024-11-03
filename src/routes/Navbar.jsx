import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth

function NavBar({ isLoggedIn, setIsLoggedIn, setWelcomeMessage, welcomeMessage }) {
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                setIsLoggedIn(false);
                setWelcomeMessage(""); // Clear welcome message on sign out
                alert("You have signed out successfully.");
            })
            .catch((error) => {
                console.error("Sign out error:", error);
            });
    };

    return (
        <div>
            <header>
                <div className="nav_div">
                    <p>DEV@Deakin</p>
                    <input type="search" placeholder="Search..." />
                    <div className="nav_but">
                        {isLoggedIn ? (
                            <>
                                <button onClick={handleSignOut}>Sign Out</button>
                            </>
                        ) : (
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            {isLoggedIn && welcomeMessage && (  // Only display welcome message if logged in
                <div className="welcome-message">{welcomeMessage}</div>
            )}
            <Outlet />
        </div>
    );
}

export default NavBar;
