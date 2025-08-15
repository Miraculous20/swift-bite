import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createAddress } from "../store/addressSlice";
import { IoClose } from "react-icons/io5";
import { uyoLocationOptions } from "../utils/uyoValidation";
import PropTypes from 'prop-types';

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      state: "Akwa Ibom",
      country: "Nigeria",
      city: "Uyo" // Uyo is the only city allowed
    }
  });

  const dispatch = useDispatch();
  const { status } = useSelector(state => state.address);

  const onSubmit = (data) => {
    // Combine LGA and specific area into a single address_line for the backend
    const payload = {
      ...data,
      address_line: `${data.area}, ${data.lga}, Uyo`,
    };
    
    dispatch(createAddress(payload)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        reset();
        close();
      }
    });
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-60 h-screen flex justify-center items-center p-4">
      <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-xl">Add New Delivery Address</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={25} />
          </button>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          
          <input type="text" value="Akwa Ibom" readOnly className="form-input bg-slate-200" {...register("state")} />
          <input type="text" value="Nigeria" readOnly className="form-input bg-slate-200" {...register("country")} />
          
          <select {...register("lga", { required: "LGA is required" })} className="form-input">
            <option value="">Select LGA in Uyo Metropolis</option>
            {uyoLocationOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.lga && <p className="form-error">{errors.lga.message}</p>}
          
          <input
            type="text"
            placeholder="Enter House No. & Street Name"
            className="form-input"
            {...register("area", { required: "Street address is required" })}
          />
          {errors.area && <p className="form-error">{errors.area.message}</p>}

          <input
            type="text"
            placeholder="Postal Code (e.g., 520101)"
            className="form-input"
            {...register("pincode", { required: "Postal code is required" })}
          />
          {errors.pincode && <p className="form-error">{errors.pincode.message}</p>}
          
          <input
            type="tel"
            placeholder="Mobile Number"
            className="form-input"
            {...register("mobile", { required: "Mobile number is required" })}
          />
          {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}

          <button type="submit" className="form-button" disabled={status === 'loading'}>
            {status === 'loading' ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </section>
  );
};

AddAddress.propTypes = {
  close: PropTypes.func.isRequired,
};

export default AddAddress;
