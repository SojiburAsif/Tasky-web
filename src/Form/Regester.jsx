import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const { creatUser, setuser, googleSingIn, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirm_password');
        const agree = data.get('agree_terms') === 'on';
        const photo = data.get('photo');

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and be at least 6 characters long.",
                { style: { fontSize: '16px', padding: '16px' } }
            );
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", {
                style: { fontSize: '16px', padding: '16px' }
            });
            return;
        }

        if (!agree) {
            toast.error("You must agree to the terms and conditions.", {
                style: { fontSize: '16px', padding: '16px' }
            });
            return;
        }


        creatUser(email, password)
            .then((userCredential) => {

                console.log(userCredential.user);

                const user = userCredential.user;
                updateUser({ displayName: name })
                    .then(() => {
                        setuser({ ...user, displayName: name });
                    })
                    .catch((error) => {
                        console.log(error);

                        setuser(user)
                    });

                toast.success('Account created successfully!', {
                    style: {
                        fontSize: '18px',
                        fontWeight: '600',
                        padding: '16px 24px',
                        borderRadius: '10px',
                    },
                });


                // information In data base
                const userInfo = {
                    name,
                    email,
                    creationTime: userCredential.user.metadata.creationTime,


                    lastSignInTime: userCredential.user.metadata.lastSignInTime,

                    photo,
                    agree
                };

                console.log(userInfo);

                fetch('https://backend-zeta-ochre-92.vercel.app/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after profile save', data);
                    })


                navigate('/'); 
            })
            .catch((error) => {
                console.log(error.code, error.message);
                toast.error("This email has been used.", {
                    style: {
                        fontSize: '18px',
                        fontWeight: '600',
                        padding: '16px 24px',
                        borderRadius: '10px',
                    },
                });
            });
    };

    const handleGoogleSignUp = () => {
        googleSingIn()
            .then((result) => {
                console.log(result.user);
                toast.success("Google sign-in success");
                navigate('/'); 
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error);
            });
    };

    return (
        <div className="min-h-screen font-display flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-black">
                <div className="text-center">
                    <a href="/">
                        <img
                            src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png"
                            alt="logo"
                            className="mx-auto h-12 w-auto"
                        />
                    </a>
                    <h2 className="mt-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                        Create Your Account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-purple-500">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter your full name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-purple-500">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="photo" className="block text-sm font-medium text-purple-500">
                            Photo URL
                        </label>
                        <input
                            id="photo"
                            name="photo"
                            type="url"
                            placeholder="Enter your photo URL"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-purple-500">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Create a password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 text-purple-500 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-purple-500">
                            Confirm Password
                        </label>
                        <input
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            required
                            placeholder="Confirm your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agree_terms"
                            name="agree_terms"
                            type="checkbox"
                            className="h-4 w-4 text-purple-500 focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor="agree_terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                            I agree to the terms and conditions
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full cursor-pointer flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-2">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Or continue with
                    </p>
                    <div className="mt-2">
                        <button
                            onClick={handleGoogleSignUp}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg
                                className="h-5 w-5 mr-2"
                                aria-hidden="true"
                                focusable="false"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                            >
                                <path fill="#EA4335" d="M24 9.5c3.35 0 6.08 1.15 8.33 3.4l6.25-6.25C34.18 3.05 29.43 1 24 1 14.62 1 6.86 6.93 3.37 15.85l7.44 5.77C12.28 16.27 17.68 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.5 24c0-1.6-.15-3.13-.43-4.62H24v8.75h12.73c-.55 2.92-2.18 5.4-4.65 7.07l7.13 5.53C42.63 37.34 46.5 31.24 46.5 24z" />
                                <path fill="#FBBC05" d="M10.81 28.13A14.59 14.59 0 0110 24c0-1.13.2-2.22.56-3.25L3.12 14.98A23.997 23.997 0 001 24c0 3.88.93 7.55 2.56 10.86l7.25-6.73z" />
                                <path fill="#34A853" d="M24 46c5.43 0 10.18-1.8 14.01-4.86l-7.13-5.53A14.43 14.43 0 0124 36c-6.32 0-11.72-6.77-13.19-15.63l-7.44 5.77C6.86 41.07 14.62 47 24 47z" />
                            </svg>
                            Sign up with Google
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-purple-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
