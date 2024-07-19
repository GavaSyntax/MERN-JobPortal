import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase auth methods here
import app from '../firebase/firebase.config'; // Adjust path as per your setup
import Swal from 'sweetalert2';


const Navbar = () => {
    const auth = getAuth(app); // Initialize Firebase auth
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [user, setUser] = useState(null); // State to hold user information

    useEffect(() => {
        // Firebase auth state change listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                Swal.fire({
                  title: 'Logged Out',
                  text: 'You have been logged out',
                  icon: 'success',
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false
              }); // Clear user state
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-job", title: "My Jobs" },
        { path: "/salary", title: "Salary Estimate" },
        { path: "/post-job", title: "Post A Job" },
    ];

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <nav className="flex justify-between items-center py-6">
                <img src="/images/logo.png" alt="Logo" />
                <a href="/" className="flex items-center gap-0 text-2xl md:text-5xl text-black">
                    <span className='text-white bg-black px-2 py-1 md:px-3 md:py-1'>Career</span>
                    <span className='text-white bg-blue px-2 py-1 md:px-3 md:py-1'>Spark</span>
                </a>

                {/* Nav items for large devices */}
                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                                to={path}
                                className={({ isActive, isPending }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Conditional rendering based on user authentication */}
                {user ? (
                    // If user is logged in, show logout button and user info
                    <div className="text-base text-primary font-medium space-x-0 hidden lg:block  flex gap-4">
                        <button className="py-2 px-5 border rounded bg-blue mr-3 text-white" onClick={handleLogout}>
                            Logout
                        </button>
                        <span className="ml-4 py-2 px-5 border rounded bg-gray-400  text-white">{user.email}</span>
                    </div>
                ) : (
                    // If user is not logged in, show login/signup buttons
                    <div className="text-base text-primary font-medium space-x-0 hidden lg:block">
                        <button className="py-2 px-5 border rounded bg-blue text-white" onClick={() => setIsLoginModalOpen(true)}>
                            Login
                        </button>
                        <LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />
                        <button className="py-2 px-5 border rounded bg-blue text-white" onClick={() => setIsSignupModalOpen(true)}>
                            Signup
                        </button>
                        <SignupModal isOpen={isSignupModalOpen} onRequestClose={() => setIsSignupModalOpen(false)} />
                    </div>
                )}

                {/* Mobile menu */}
                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
                    </button>
                </div>
            </nav>

            {/* Nav items for mobile */}
            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-white first:text-white py-1">
                            <NavLink
                                to={path}
                                className={({ isActive, isPending }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        // If user is logged in, show logout button and user info
                        <li className="text-white py-1">
                            <button onClick={handleLogout}>Logout</button>
                            <span className="ml-2">{user.email}</span>
                        </li>
                    ) : (
                        // If user is not logged in, show login link
                        <li className="text-white py-1"><Link to="/login">Log in</Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
