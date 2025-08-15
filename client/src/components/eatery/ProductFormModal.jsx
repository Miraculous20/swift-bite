import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast';

// Import the correct actions and selectors from your product slice
import { createProduct, updateProduct, selectAllCategories, selectProductStatus } from '../../store/productSlice';

const ProductFormModal = ({ close, initialData = null }) => {
    const isEditMode = Boolean(initialData);
    const { register, handleSubmit, formState: { errors } } = useForm({
        // Set default values for the form fields, either from existing data or empty
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            price: initialData?.price || '',
            stock: initialData?.stock || '',
            unit: initialData?.unit || '',
            category: initialData?.category?._id || '',
            image: initialData?.image?.[0] || '', // Assuming one image URL for simplicity
        }
    });
    
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    const status = useSelector(selectProductStatus); // Get loading status for the button

    const onSubmit = (data) => {
        const payload = {
            ...data,
            image: [data.image], // Ensure the image is in an array as the backend expects
        };

        if (isEditMode) {
            // Dispatch the update action with the product ID
            dispatch(updateProduct({ ...payload, _id: initialData._id }));
            toast.success("Product updated successfully (simulated)!");
        } else {
            // Dispatch the create action for a new product
            dispatch(createProduct(payload));
            toast.success("Product added successfully (simulated)!");
        }
        close(); // Close the modal after the form is submitted
    };

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center h-screen p-4 bg-black bg-opacity-60">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">{isEditMode ? "Edit Menu Item" : "Add New Menu Item"}</h2>
                    <button onClick={close} className="hover:text-red-500">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="grid gap-4 max-h-[70vh] overflow-y-auto pr-2" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input {...register("name", { required: "Product name is required" })} placeholder="Product Name" className="form-input" />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>

                    <textarea {...register("description")} placeholder="Product Description" className="form-input" rows="3" />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input type="number" {...register("price", { required: "Price is required" })} placeholder="Price (₦)" className="form-input" />
                            {errors.price && <p className="form-error">{errors.price.message}</p>}
                        </div>
                        <div>
                            <input type="number" {...register("stock", { required: "Stock is required" })} placeholder="Stock Quantity" className="form-input" />
                            {errors.stock && <p className="form-error">{errors.stock.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input {...register("unit")} placeholder="Unit (e.g., per slice)" className="form-input" />
                        </div>
                        <div>
                            <select {...register("category", { required: "Category is required" })} className="form-input">
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                            </select>
                            {errors.category && <p className="form-error">{errors.category.message}</p>}
                        </div>
                    </div>
                    
                    <div>
                        <input {...register("image", { required: "Image URL is required" })} placeholder="Image URL" className="form-input" />
                        {errors.image && <p className="form-error">{errors.image.message}</p>}
                    </div>
                    
                    <button type="submit" className="form-button" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Saving...' : (isEditMode ? "Save Changes" : "Add Product")}
                    </button>
                </form>
            </div>
        </section>
    );
};

ProductFormModal.propTypes = {
  close: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default ProductFormModal;