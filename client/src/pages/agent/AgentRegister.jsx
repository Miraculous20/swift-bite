import { useState } from 'react';
import PropTypes from 'prop-types';

// --- Helper Components (for a self-contained example) ---

// A simple logo component for an agent
const AgentLogo = ({ className }) => (
    <div className={`flex items-center justify-center bg-blue-500 rounded-full ${className}`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    </div>
);
AgentLogo.propTypes = { className: PropTypes.string };


// --- Main Authentication Page Component ---

const AgentAuthPage = () => {
    // State to toggle between 'login' and 'register' forms
    const [authMode, setAuthMode] = useState('login'); 
    
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // For agent registration

    const isLoginMode = authMode === 'login';

    // Placeholder for handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginMode) {
            console.log('Attempting agent login with:', { email, password });
            // TODO: Add your API call for agent login here.
            // On success, save token and redirect to the agent dashboard.
            // navigate('/agent/dashboard'); 
        } else {
            console.log('Attempting agent registration with:', { fullName, email, password });
            // TODO: Add your API call for agent registration here.
            // On success, you might automatically log them in or redirect to login.
        }
    };

    const toggleAuthMode = () => {
        setAuthMode(isLoginMode ? 'register' : 'login');
        // Clear form fields when toggling
        setEmail('');
        setPassword('');
        setFullName('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex flex-col items-center mb-6">
                        <AgentLogo className="w-16 h-16 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isLoginMode ? 'Agent Portal' : 'Become a Delivery Agent'}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {isLoginMode ? 'Sign in to view your deliveries.' : 'Join our delivery team.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Input (only for registration) */}
                        {!isLoginMode && (
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
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
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                {isLoginMode ? 'Sign In' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    {/* Toggle Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            {isLoginMode ? "Need to register?" : "Already have an account?"}
                            <button
                                onClick={toggleAuthMode}
                                className="font-medium text-blue-500 hover:text-blue-600 ml-1 focus:outline-none"
                            >
                                {isLoginMode ? 'Create an account' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentAuthPage;
