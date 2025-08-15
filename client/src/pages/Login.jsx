import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUserStatus } from "../store/userSlice";
import { loginAgent, selectAgentStatus } from "../store/agentSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import logo from '../assets/images/logo.png';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // This state controls which login form is shown. It defaults to 'user'.
  const [loginType, setLoginType] = useState('user'); 

  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(state => state.user.error);
  const agentStatus = useSelector(selectAgentStatus);
  const agentError = useSelector(state => state.agent.error);

  const [showPassword, setShowPassword] = useState(false);

  // This automatically switches the form to 'agent' if you are redirected 
  // from a page that requires an agent login.
  useEffect(() => {
    if (location.state?.role === 'agent') {
      setLoginType('agent');
    } else {
      setLoginType('user'); // Ensures it defaults to user otherwise
    }
  }, [location.state]);

  const onSubmit = async (data) => {
    try {
      if (loginType === 'user') {
        const resultAction = await dispatch(loginUser(data));
        unwrapResult(resultAction);
        navigate("/"); // Redirect user to home
      } else {
        const resultAction = await dispatch(loginAgent(data));
        unwrapResult(resultAction);
        navigate("/agent/dashboard"); // Redirect agent to their dashboard
      }
    } catch (err) {
      console.error(`Failed to login as ${loginType}:`, err);
    }
  };

  const status = loginType === 'user' ? userStatus : agentStatus;
  const error = loginType === 'user' ? userError : agentError;

  return (
    <section className="w-full min-h-screen container mx-auto p-4 flex items-center justify-center bg-slate-50">
      <div className="bg-white my-4 w-full max-w-md mx-auto rounded-xl p-6 md:p-8 shadow-2xl">
        <img src={logo} alt="Swift-Bite" className="w-40 mx-auto mb-4"/>
        
        {/* --- THIS IS THE TOGGLE --- */}
        <div className="flex justify-center mb-6 bg-slate-100 rounded-full p-1">
          <button 
            onClick={() => setLoginType('user')} 
            className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${loginType === 'user' ? 'bg-green-600 text-white shadow' : 'text-slate-600'}`}>
            Customer
          </button>
          <button 
            onClick={() => setLoginType('agent')} 
            className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${loginType === 'agent' ? 'bg-green-600 text-white shadow' : 'text-slate-600'}`}>
            Delivery Agent
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          {loginType === 'user' ? "Login to Swift-Bite" : "Agent Login"}
        </h2>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields are rendered here */}
          <div className="grid gap-1">
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" className="form-input"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
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
            {loginType === 'user' && (
                <Link to={"/forgot-password"} className="block text-sm text-right mt-1 hover:text-green-600 hover:underline">
                    Forgot password?
                </Link>
            )}
          </div>

          {status === "failed" && error && (
            <p className="text-red-500 text-center bg-red-100 p-2 rounded-lg">
              {error.message || "Login failed. Please check your credentials."}
            </p>
          )}

          <button type="submit" disabled={status === "loading"} className="form-button">
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Dont have an account?{" "}
          <Link
            to={loginType === 'user' ? "/register" : "/agent/register"}
            className="font-semibold text-green-600 hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
