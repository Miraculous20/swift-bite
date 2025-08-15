import{ useState } from 'react';
import PropTypes from 'prop-types';

// --- Helper Components (for a self-contained example) ---

// A simple logo component
const EateryLogo = ({ className }) => (
    <div className={`flex items-center justify-center bg-orange-500 rounded-full ${className}`}>
        <span className="text-4xl font-bold text-white">S</span>
    </div>
);
EateryLogo.propTypes = { className: PropTypes.string };


// --- Main Authentication Page Component ---

const EateryAuthPage = () => {
    // State to toggle between 'login' and 'register' forms
    const [authMode, setAuthMode] = useState('login'); 
    
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eateryName, setEateryName] = useState(''); // Only for registration

    const isLoginMode = authMode === 'login';

    // Placeholder for handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginMode) {
            console.log('Attempting login with:', { email, password });
            // TODO: Add your API call for login here.
            // On success, you would typically save a token and redirect:
            // navigate('/admin/dashboard'); 
        } else {
            console.log('Attempting registration with:', { eateryName, email, password });
            // TODO: Add your API call for registration here.
            // On success, you might automatically log them in or ask them to log in.
        }
    };

    const toggleAuthMode = () => {
        setAuthMode(isLoginMode ? 'register' : 'login');
        // Clear form fields when toggling
        setEmail('');
        setPassword('');
        setEateryName('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-50">
            <div className="w-full max-w-md">
                <div className="p-8 bg-white shadow-xl rounded-2xl">
                    <div className="flex flex-col items-center mb-6">
                        <EateryLogo className="w-16 h-16 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isLoginMode ? 'Welcome Back, Eatery' : 'Register Your Eatery'}
                        </h1>
                        <p className="mt-1 text-gray-500">
                            {isLoginMode ? 'Sign in to manage your restaurant.' : 'Join Swift-Bite today.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Eatery Name Input (only for registration) */}
                        {!isLoginMode && (
                            <div>
                                <label htmlFor="eateryName" className="block text-sm font-medium text-gray-700">
                                    Eatery Name
                                </label>
                                <input
                                    id="eateryName"
                                    name="eateryName"
                                    type="text"
                                    required
                                    value={eateryName}
                                    onChange={(e) => setEateryName(e.target.value)}
                                    className="block w-full px-3 py-2 mt-1 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Your Restaurant's Name"
                                />
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 mt-1 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-3 py-2 mt-1 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="flex justify-center w-full px-4 py-3 text-sm font-bold text-white transition-colors bg-orange-500 border border-transparent rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                {isLoginMode ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    {/* Toggle Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={toggleAuthMode}
                                className="ml-1 font-medium text-orange-500 hover:text-orange-600 focus:outline-none"
                            >
                                {isLoginMode ? 'Register here' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EateryAuthPage;
