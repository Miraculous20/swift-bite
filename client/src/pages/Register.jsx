import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/userSlice';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from 'react';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Watch the password field to use for confirm password validation
    const password = watch("password", "");

    const onSubmit = (data) => {
        dispatch(registerUser(data)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/login'); // Redirect to login on successful registration
            }
        });
    };

    return (
        <section className='w-full container mx-auto p-4'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded-lg p-6 shadow-lg'>
                <h2 className="text-2xl font-bold text-center mb-2">Create Your Account</h2>
                <p className="text-center text-slate-500 mb-6">Welcome to Swift-Bite</p>

                <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Full Name:</label>
                        <input
                            type='text'
                            id='name'
                            className={`bg-slate-100 p-3 border rounded-lg outline-none focus:border-green-500 ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                            {...register("name", { required: "Full name is required" })}
                            placeholder='Enter your full name'
                        />
                        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                    </div>
                    
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email Address:</label>
                        <input
                            type='email'
                            id='email'
                            className={`bg-slate-100 p-3 border rounded-lg outline-none focus:border-green-500 ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
                            {...register("email", { required: "Email is required" })}
                            placeholder='Enter your email'
                        />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password:</label>
                        <div className={`bg-slate-100 p-3 border rounded-lg flex items-center focus-within:border-green-500 ${errors.password ? 'border-red-500' : 'border-slate-200'}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-transparent outline-none'
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer text-slate-500'>
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className={`bg-slate-100 p-3 border rounded-lg flex items-center focus-within:border-green-500 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200'}`}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full bg-transparent outline-none'
                                {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })}
                                placeholder='Confirm your password'
                            />
                            <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer text-slate-500'>
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                        {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
                    </div>
                    
                    {status === 'failed' && error && (
                        <p className='text-red-500 text-center bg-red-100 p-2 rounded-lg'>{error.message || "An error occurred."}</p>
                    )}

                    <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold my-3 tracking-wide disabled:bg-slate-400"
                    >
                        {status === 'loading' ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center">
                    Already have an account? <Link to={"/login"} className='font-semibold text-green-600 hover:underline'>Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
