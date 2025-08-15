import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../store/addressSlice";
import { IoClose } from "react-icons/io5";
import { uyoLocationOptions } from "../utils/uyoValidation";
import PropTypes from 'prop-types';

const EditAddressDetails = ({ close, data }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data // Pre-fill the form with the address data
  });

  const dispatch = useDispatch();
  const { status } = useSelector(state => state.address);

  const onSubmit = (formData) => {
    dispatch(updateAddress(formData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        close(); // Close the modal on success
      }
    });
  };

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-60 h-screen flex justify-center items-center p-4">
      <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-xl">Edit Delivery Address</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={25} />
          </button>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Form fields are the same, but now managed by react-hook-form */}
          <input type="text" readOnly className="form-input bg-slate-200" {...register("state")} />
          <select {...register("lga", { required: "LGA is required" })} className="form-input">
            <option value="">Select LGA in Uyo Metropolis</option>
            {uyoLocationOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          {errors.lga && <p className="form-error">{errors.lga.message}</p>}
          
          <input type="text" placeholder="House No. & Street Name" className="form-input" {...register("address_line", { required: "Street address is required" })} />
          {errors.address_line && <p className="form-error">{errors.address_line.message}</p>}
          
          <input type="tel" placeholder="Mobile Number" className="form-input" {...register("mobile", { required: "Mobile number is required" })} />
          {errors.mobile && <p className="form-error">{errors.mobile.message}</p>}

          <button type="submit" className="form-button" disabled={status === 'loading'}>
            {status === 'loading' ? "Saving..." : "Update Address"}
          </button>
        </form>
      </div>
    </section>
  );
};

EditAddressDetails.propTypes = {
  close: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EditAddressDetails;
