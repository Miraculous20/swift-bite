import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchAllCategories } from '../store/categorySlice'; 
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';
// utility imports
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios'; // Still needed for delete
import SummaryApi from '../common/SummaryApi'; // Still needed for delete

const CategoryPage = () => {
    // --- State for Modals and Actions (This remains the same) ---
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({ name: "", image: "" });
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({ _id: "" });
    
    // --- Redux State Integration ---
    const dispatch = useDispatch(); // CHANGED: Get the dispatch function

    // CHANGED: Select data and status directly from the Redux store
    const categoryData = useSelector((state) => state.categories.list);
    const categoryStatus = useSelector((state) => state.categories.status);
    const categoryError = useSelector((state) => state.categories.error);

    // REMOVED: The local loading and categoryData states are no longer needed
    // const [loading, setLoading] = useState(false)
    // const [categoryData, setCategoryData] = useState([])

    // REMOVED: The local fetchCategory function is now handled by Redux
    // const fetchCategory = async () => { ... }

    // CHANGED: This useEffect now dispatches the Redux action to fetch data
    useEffect(() => {
        // We only dispatch the action if the data hasn't been fetched yet
        if (categoryStatus === 'idle') {
            dispatch(fetchAllCategories());
        }
    }, [categoryStatus, dispatch]);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory,
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                // CHANGED: Instead of calling a local function, we re-dispatch the Redux action
                dispatch(fetchAllCategories()); 
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className=''>
            <div className='flex items-center justify-between p-2 bg-white shadow-md'>
                <h2 className='font-semibold'>Category</h2>
                <button onClick={() => setOpenUploadCategory(true)} className='px-3 py-1 text-sm border rounded border-primary-200 hover:bg-primary-200'>Add Category</button>
            </div>

            {/* CHANGED: Conditional rendering now uses the Redux status */}
            {categoryStatus === 'loading' && <Loading />}
            {categoryStatus === 'succeeded' && categoryData.length === 0 && <NoData />}
            {categoryStatus === 'failed' && <p className='p-4 text-center text-red-600'>Error: {categoryError?.message || 'Failed to load categories.'}</p>}
            
            <div className='grid grid-cols-2 gap-2 p-4 md:grid-cols-4 lg:grid-cols-6'>
                {/* We only map the data if the fetch has succeeded */}
                {categoryStatus === 'succeeded' && categoryData.map((category) => {
                    return (
                        <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                            <img 
                                alt={category.name}
                                src={category.image}
                                className='object-scale-down w-full'
                            />
                            <div className='flex items-center gap-2 h-9'>
                                <button onClick={() => {
                                    setOpenEdit(true);
                                    setEditData(category);
                                }} className='flex-1 py-1 font-medium text-green-600 bg-green-100 rounded hover:bg-green-200'>
                                    Edit
                                </button>
                                <button onClick={() => {
                                    setOpenConfirmBoxDelete(true);
                                    setDeleteCategory(category);
                                }} className='flex-1 py-1 font-medium text-red-600 bg-red-100 rounded hover:bg-red-200'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* All modals now get the Redux dispatch action passed to them to refetch data */}
            {openUploadCategory && (
                <UploadCategoryModel fetchData={() => dispatch(fetchAllCategories())} close={() => setOpenUploadCategory(false)} />
            )}
            {openEdit && (
                <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={() => dispatch(fetchAllCategories())} />
            )}
            {openConfimBoxDelete && (
                <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
            )}
        </section>
    );
};

export default CategoryPage;