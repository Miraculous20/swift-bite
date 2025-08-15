import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginEateryAdmin, selectEateryAdminStatus } from "../../store/eateryAdminSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import logoImage from '../../assets/images/logo.png';

const EateryLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectEateryAdminStatus);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        dispatch(loginEateryAdmin(data)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate("/eatery/dashboard");
            }
        });
    };

    return (
        <section className="container flex items-center justify-center w-full min-h-screen p-4 mx-auto bg-slate-50">
            <div className="w-full max-w-md p-6 mx-auto my-4 bg-white shadow-2xl rounded-xl md:p-8">
                <img src={logoImage} alt="Swift-Bite" className="w-40 mx-auto mb-4"/>
                <h2 className="mb-6 text-2xl font-bold text-center">Eatery Admin Portal</h2>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-1">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" className="form-input"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your admin email"
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="password">Password:</label>
                        <div className="flex items-center p-3 border rounded-lg bg-slate-100 focus-within:border-green-500">
                            <input
                                type={showPassword ? "text" : "password"} id="password"
                                className="w-full bg-transparent outline-none"
                                {...register("password", { required: "Password is required" })}
                                placeholder="Enter your password"
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer text-slate-500">
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                        {errors.password && <p className="form-error">{errors.password.message}</p>}
                    </div>

                    <button type="submit" disabled={status === "loading"} className="form-button">
                        {status === "loading" ? "Signing in..." : "Sign In"}
                    </button>
                </form>
                 <p className="mt-4 text-sm text-center">
                    Not a customer? <Link to="/login" className='font-semibold text-green-600 hover:underline'>Customer or Agent Login</Link>
                </p>
            </div>
        </section>
    );
};

export default EateryLogin;