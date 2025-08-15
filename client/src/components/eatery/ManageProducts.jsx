import { useState } from 'react'; // FIX: Removed 'useEffect'
import { useDispatch } from 'react-redux'; // FIX: Removed 'useSelector'
import { createColumnHelper } from '@tanstack/react-table';
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from 'react-hot-toast';

import { mockMenu } from '../../data/mockData';
import { deleteProduct } from '../../store/productSlice';
import DisplayTable from '../../components/DisplayTable';
import ProductFormModal from '../../components/eatery/ProductFormModal';
import ConfirmBox from '../../components/ConfirmBox';
import { DisplayPriceInNaira } from '../../utils/DisplayPriceInNaira';

const ManageProducts = () => {
    const dispatch = useDispatch();
    const products = mockMenu.filter(p => p.eateryId === 'eatery001');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    
    const handleOpenAddModal = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleOpenDeleteConfirm = (product) => {
        setProductToDelete(product);
        setIsConfirmOpen(true);
    };

    const handleDelete = () => {
        if (productToDelete) {
            dispatch(deleteProduct(productToDelete._id));
            toast.success(`"${productToDelete.name}" deleted successfully (simulated).`);
        }
        setIsConfirmOpen(false);
        setProductToDelete(null);
    };

    const columnHelper = createColumnHelper();
    const columns = [
        columnHelper.accessor('image', {
            header: 'Image',
            cell: info => <img src={info.getValue()[0]} alt="product" className="object-cover w-12 h-12 rounded-md" />
        }),
        columnHelper.accessor('name', { header: 'Name' }),
        columnHelper.accessor('price', { 
            header: 'Price',
            cell: info => DisplayPriceInNaira(info.getValue())
        }),
        columnHelper.accessor('stock', { header: 'Stock' }),
        columnHelper.accessor('category', { header: 'Category' }),
        columnHelper.accessor('_id', {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenEditModal(row.original)} className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FaEdit size={16} />
                    </button>
                    <button onClick={() => handleOpenDeleteConfirm(row.original)} className="text-red-500 hover:text-red-700" title="Delete">
                        <FaTrash size={16} />
                    </button>
                </div>
            )
        })
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Manage Your Menu Items</h1>
                <button onClick={handleOpenAddModal} className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                    <FaPlus /> Add New Product
                </button>
            </div>
            <p className="mb-6 text-slate-600">
                This is where you will add, edit, and delete products for your eatery.
            </p>

            <DisplayTable data={products} columns={columns} />

            {isModalOpen && (
                <ProductFormModal
                    close={() => setIsModalOpen(false)}
                    initialData={productToEdit}
                />
            )}
            
            {isConfirmOpen && (
                <ConfirmBox
                    title="Delete Product"
                    message={`Are you sure you want to permanently delete "${productToDelete?.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            )}
        </div>
    );
};

export default ManageProducts;