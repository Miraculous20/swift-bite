import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, selectAllCategories, selectAllSubCategories } from '../store/productSlice';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import { useState } from 'react';
import toast from 'react-hot-toast';

const UploadProduct = () => {
    const { register, handleSubmit, control, setValue, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '', description: '', image: [], category: '', subCategory: '',
            unit: '', stock: '', price: '', discount: 0,
        }
    });

    const dispatch = useDispatch();
    const { status } = useSelector(state => state.product);
    const allCategories = useSelector(selectAllCategories);
    const allSubCategories = useSelector(selectAllSubCategories);
    const [imageLoading, setImageLoading] = useState(false);

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageLoading(true);
        try {
            const response = await uploadImage(file);
            const imageUrl = response.data.data.url;
            setValue("image", [...getValues("image"), imageUrl], { shouldValidate: true });
            toast.success("Image uploaded");
        } catch (err) {
            console.error("Image upload failed:", err);
            toast.error("Image upload failed");
        } finally {
            setImageLoading(false);
        }
    };

    const handleDeleteImage = (index) => {
        const updatedImages = getValues("image").filter((_, i) => i !== index);
        setValue("image", updatedImages, { shouldValidate: true });
    };

    const onSubmit = (data) => {
        const payload = {
            ...data,
            // Backend expects arrays of IDs
            category: [data.category],
            subCategory: [data.subCategory],
        };
        
        dispatch(createProduct(payload)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                reset(); // Clear the form on success
            }
        });
    };

    return (
        <section className='p-4'>
            <div className='p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto'>
                <h2 className='text-2xl font-semibold mb-6'>Upload New Product</h2>
                <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
                    
                    <input {...register("name", { required: "Product name is required" })} placeholder="Product Name" className="form-input" />
                    {errors.name && <p className='form-error'>{errors.name.message}</p>}
                    
                    <textarea {...register("description", { required: "Description is required" })} placeholder="Product Description" className="form-input" rows="3" />
                    {errors.description && <p className='form-error'>{errors.description.message}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input {...register("price", { required: "Price is required", valueAsNumber: true })} type="number" placeholder="Price (NGN)" className="form-input" />
                        {errors.price && <p className='form-error'>{errors.price.message}</p>}
                        <input {...register("stock", { required: "Stock is required", valueAsNumber: true })} type="number" placeholder="Stock Quantity" className="form-input" />
                        {errors.stock && <p className='form-error'>{errors.stock.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input {...register("unit", { required: "Unit is required (e.g., 500g, 1 pack)" })} placeholder="Product Unit" className="form-input" />
                        {errors.unit && <p className='form-error'>{errors.unit.message}</p>}
                        <input {...register("discount", { valueAsNumber: true })} type="number" placeholder="Discount (%)" className="form-input" />
                    </div>

                    <div className='grid gap-2'>
                        <label className='font-medium'>Product Images</label>
                        <label htmlFor='productImage' className='bg-slate-50 h-32 border-2 border-dashed rounded-lg flex justify-center items-center cursor-pointer text-slate-500 hover:border-green-500 hover:text-green-500'>
                            {imageLoading ? <Loading /> : <div className='text-center'><FaCloudUploadAlt size={40} /><p>Click to Upload</p></div>}
                        </label>
                        <input type='file' id='productImage' className='hidden' accept='image/*' onChange={handleUploadImage} />
                        <Controller name="image" control={control} rules={{ validate: value => value.length > 0 || "At least one image is required" }}
                            render={({ field: { value } }) => (
                                <div className='flex flex-wrap gap-4 mt-2'>
                                    {value.map((img, index) => (
                                        <div key={index} className='h-24 w-24 relative group'>
                                            <img src={img} alt={`product-preview-${index}`} className='w-full h-full object-cover rounded-lg' />
                                            <button type="button" onClick={() => handleDeleteImage(index)} className='absolute -top-2 -right-2 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity'>
                                                <IoClose />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                        {errors.image && <p className='form-error'>{errors.image.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <select {...register("category", { required: "Please select a category" })} className="form-input">
                            <option value="">Select Category</option>
                            {allCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                        {errors.category && <p className='form-error'>{errors.category.message}</p>}
                        <select {...register("subCategory", { required: "Please select a sub-category" })} className="form-input">
                            <option value="">Select Sub-Category</option>
                            {allSubCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                        </select>
                        {errors.subCategory && <p className='form-error'>{errors.subCategory.message}</p>}
                    </div>
                    
                    <button type="submit" disabled={status === 'loading'} className="form-button">
                        {status === 'loading' ? 'Uploading...' : 'Upload Product'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadProduct;


