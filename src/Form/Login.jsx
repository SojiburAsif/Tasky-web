import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, googleSingIn } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const email = data.get('email');
        const password = data.get('password');

        loginUser(email, password)
            .then(() => {
                toast.success('Login successful!');
                navigate('/');
            })
            .catch(() => {
                toast.error("Email or password incorrect!");
            });
    };

    const handleGoogleSignIn = () => {
        googleSingIn()
            .then(() => {
                toast.success("Google sign-in successful!");
                navigate('/');
            })
            .catch(() => {
                toast.error("Google sign-in failed!");
            });
    };

    return (
        <div className="min-h-screen roboto-font flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg bg-black">
                <div className="text-center">
                    <a href="/">
                        <img
                            src="https://i.ibb.co/tM1fXLzx/Chat-GPT-Image-May-20-2025-05-52-48-PM.png"
                            alt="logo"
                            className="mx-auto h-12 w-auto"
                        />
                    </a>
                    <h2 className="mt-6 text-3xl font-semibold text-gray-100">
                        Sign In to Your Account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
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
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-400">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="text-purple-500 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Or continue with
                    </p>
                    <div className="mt-2">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.35 0 6.08 1.15 8.33 3.4l6.25-6.25C34.18 3.05 29.43 1 24 1 14.62 1 6.86 6.93 3.37 15.85l7.44 5.77C12.28 16.27 17.68 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.5 24c0-1.6-.15-3.13-.43-4.62H24v8.75h12.73c-.55 2.92-2.18 5.4-4.65 7.07l7.13 5.53C42.63 37.34 46.5 31.24 46.5 24z" />
                                <path fill="#FBBC05" d="M10.81 28.13A14.59 14.59 0 0110 24c0-1.13.2-2.22.56-3.25L3.12 14.98A23.997 23.997 0 001 24c0 3.88.93 7.55 2.56 10.86l7.25-6.73z" />
                                <path fill="#34A853" d="M24 46c5.43 0 10.18-1.8 14.01-4.86l-7.13-5.53A14.43 14.43 0 0124 36c-6.32 0-11.72-6.77-13.19-15.63l-7.44 5.77C6.86 41.07 14.62 47 24 47z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Not a member yet?{' '}
                    <Link to="/register" className="text-purple-500 hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
