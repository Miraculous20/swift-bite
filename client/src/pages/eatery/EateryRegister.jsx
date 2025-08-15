import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logo.png';
import { registerEatery, selectEateryAdminStatus } from '../../store/eateryAdminSlice';

const EateryRegister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(selectEateryAdminStatus);

    const onSubmit = (data) => {
        dispatch(registerEatery(data)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/eatery/login');
            }
        });
    };

    return (
        <section className="container flex items-center justify-center w-full min-h-screen p-4 mx-auto bg-slate-50">
            <div className="w-full max-w-2xl p-6 mx-auto my-8 bg-white shadow-2xl rounded-xl md:p-8">
                <img src={logoImage} alt="Swift-Bite" className="w-40 mx-auto mb-4"/>
                <h2 className="mb-2 text-2xl font-bold text-center">Partner with Swift-Bite</h2>
                <p className="mb-6 text-center text-slate-500">Register your eatery and reach more customers.</p>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="p-4 border rounded-lg">
                        <legend className="px-2 font-semibold">Eatery Details</legend>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <input {...register("eateryName", { required: "Eatery name is required" })} placeholder="Eatery Name" className="form-input" />
                                {errors.eateryName && <p className="form-error">{errors.eateryName.message}</p>}
                            </div>
                            <div>
                                <input {...register("eateryAddress", { required: "Eatery address is required" })} placeholder="Full Address" className="form-input" />
                                {errors.eateryAddress && <p className="form-error">{errors.eateryAddress.message}</p>}
                            </div>
                            <div>
                                <input {...register("eateryCuisine", { required: "Cuisine type is required" })} placeholder="Cuisine (e.g., Nigerian, Italian)" className="form-input" />
                                {errors.eateryCuisine && <p className="form-error">{errors.eateryCuisine.message}</p>}
                            </div>
                            <div>
                                <input type="number" {...register("deliveryTime", { required: "Avg. delivery time is required" })} placeholder="Avg. Delivery Time (mins)" className="form-input" />
                                {errors.deliveryTime && <p className="form-error">{errors.deliveryTime.message}</p>}
                            </div>
                        </div>
                    </fieldset>

                     <fieldset className="p-4 border rounded-lg">
                        <legend className="px-2 font-semibold">Administrator Details</legend>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <input {...register("adminName", { required: "Your full name is required" })} placeholder="Your Full Name" className="form-input" />
                                {errors.adminName && <p className="form-error">{errors.adminName.message}</p>}
                            </div>
                            <div>
                                <input type="email" {...register("adminEmail", { required: "Your email is required" })} placeholder="Your Email Address" className="form-input" />
                                {errors.adminEmail && <p className="form-error">{errors.adminEmail.message}</p>}
                            </div>
                            <div>
                                <input {...register("adminPhone", { required: "Your phone number is required" })} placeholder="Your Phone Number" className="form-input" />
                                {errors.adminPhone && <p className="form-error">{errors.adminPhone.message}</p>}
                            </div>
                            <div>
                                <input type="password" {...register("password", { required: "A password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} placeholder="Create a Password" className="form-input" />
                                {errors.password && <p className="form-error">{errors.password.message}</p>}
                            </div>
                        </div>
                    </fieldset>
                    
                    <button type="submit" className="form-button" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Submitting...' : 'Register Eatery'}
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Already have a partner account? <Link to="/eatery/login" className='font-semibold text-green-600 hover:underline'>Sign In</Link>
                </p>
            </div>
        </section>
    );
};

export default EateryRegister;