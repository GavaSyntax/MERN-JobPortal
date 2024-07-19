import React, { useState } from 'react';
import Modal from 'react-modal';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import app from '../firebase/firebase.config';
import './modal.css';
import { FaGoogle } from "react-icons/fa6";
import Swal from 'sweetalert2';

const LoginModal = ({ isOpen, onRequestClose }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                onRequestClose(); // Close the modal after login
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage); // Alert error message
                console.error(errorMessage);
            });
    };

    const handleEmailPasswordLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                  }); // Alert success message
                onRequestClose(); // Close the modal after login
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;
                switch (errorCode) {
                    case AuthErrorCodes.INVALID_EMAIL:
                        errorMessage = "Invalid email address.";
                        break;
                    case AuthErrorCodes.INVALID_PASSWORD:
                        errorMessage = "The password is incorrect.";
                        break;
                    default:
                        errorMessage = "Login failed. Please try again later.";
                        break;
                }
                alert(errorMessage); // Alert error message
                console.error(errorMessage);
            });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Login Modal" className="modal" overlayClassName="modal-overlay">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md mx-auto my-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-common"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-common"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="button-common bg-blue text-white font-bold"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center flex items-center justify-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="button-common bg-red-500 text-white font-bold flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" /> Sign in with Google
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
