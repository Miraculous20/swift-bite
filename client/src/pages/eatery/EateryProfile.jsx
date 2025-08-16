import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {  FaToggleOn, FaToggleOff } from "react-icons/fa";

import { selectEateryAdmin } from '../../store/eateryAdminSlice';
import { selectAllEateries, selectEateryStatus, updateEateryDetails } from '../../store/eaterySlice';

const EateryProfile = () => {
    const dispatch = useDispatch();
    const eateryAdmin = useSelector(selectEateryAdmin);
    const allEateries = useSelector(selectAllEateries);
    const status = useSelector(selectEateryStatus);

  
    const currentEatery = allEateries.find(e => e._id === eateryAdmin?.eateryId);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            isOpen: true
        }
    });
    const isOpen = watch('isOpen');


    useEffect(() => {
        if (currentEatery) {
            setValue('name', currentEatery.name);
            setValue('address', currentEatery.address);
            setValue('cuisine', currentEatery.cuisine.join(', '));
            setValue('deliveryTimeMinutes', currentEatery.deliveryTimeMinutes);
            setValue('isOpen', currentEatery.isOpen);
        }
    }, [currentEatery, setValue]);

    const onSubmit = (data) => {
        const payload = {
            ...data,
            _id: currentEatery._id,
            cuisine: data.cuisine.split(',').map(c => c.trim()), 
        };
        dispatch(updateEateryDetails(payload));
    };

    if (!currentEatery) {
        return <div>Loading eatery details...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Eatery Profile & Settings</h1>
            <p className="text-slate-600 mb-6">
                Update your eatery&apos;s details and manage its status.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Eatery Name */}
                        <div>
                            <label className="block font-medium text-gray-700">Eatery Name</label>
                            <input {...register("name", { required: "Eatery name is required" })} className="form-input mt-1" />
                            {errors.name && <p className="form-error">{errors.name.message}</p>}
                        </div>

                        {/* Eatery Address */}
                        <div>
                            <label className="block font-medium text-gray-700">Address</label>
                            <input {...register("address", { required: "Address is required" })} className="form-input mt-1" />
                            {errors.address && <p className="form-error">{errors.address.message}</p>}
                        </div>

                        {/* Cuisine Types */}
                        <div>
                            <label className="block font-medium text-gray-700">Cuisine Types</label>
                            <input {...register("cuisine", { required: "Cuisine is required" })} placeholder="e.g., Nigerian, Jollof, Swallow" className="form-input mt-1" />
                            <p className="text-xs text-gray-500 mt-1">Separate types with a comma.</p>
                            {errors.cuisine && <p className="form-error">{errors.cuisine.message}</p>}
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <label className="block font-medium text-gray-700">Average Delivery Time (minutes)</label>
                            <input type="number" {...register("deliveryTimeMinutes", { required: "Time is required" })} className="form-input mt-1" />
                            {errors.deliveryTimeMinutes && <p className="form-error">{errors.deliveryTimeMinutes.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Eatery Status */}
                <div className="p-6 bg-white rounded-lg shadow-md">
                     <h2 className="text-lg font-semibold mb-4">Eatery Status</h2>
                     <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{isOpen ? "Open for Business" : "Temporarily Closed"}</p>
                            <p className="text-sm text-gray-500">{isOpen ? "Customers can place orders." : "Your eatery will not appear in search results."}</p>
                        </div>
                        <button type="button" onClick={() => setValue('isOpen', !isOpen)} className="flex items-center gap-2">
                            {isOpen 
                                ? <FaToggleOn size={40} className="text-green-500" />
                                : <FaToggleOff size={40} className="text-gray-400" />
                            }
                        </button>
                     </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="form-button max-w-xs" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EateryProfile;
