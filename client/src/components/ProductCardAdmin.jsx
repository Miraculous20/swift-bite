import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/productSlice';
import EditProductAdmin from './EditProductAdmin';
import ConfirmBox from './ConfirmBox'; // Corrected import spelling

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(data._id));
    setOpenDeleteConfirm(false);
  };

  return (
    <div className='w-full max-w-xs p-4 bg-white rounded-lg shadow-md'>
      <div className='w-32 h-32 mx-auto'>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className='object-contain w-full h-full'
        />
      </div>
      <p className='h-12 mt-4 font-semibold text-ellipsis line-clamp-2'>{data?.name}</p>
      <p className='text-sm text-slate-500'>{data?.unit}</p>
      <div className='grid grid-cols-2 gap-3 mt-4'>
        <button 
          onClick={() => setEditOpen(true)} 
          className='px-2 py-1 text-sm text-green-800 transition-colors bg-green-100 border border-green-600 rounded-md hover:bg-green-600 hover:text-white'
        >
          Edit
        </button>
        <button 
          onClick={() => setOpenDeleteConfirm(true)} 
          className='px-2 py-1 text-sm text-red-600 transition-colors bg-red-100 border border-red-600 rounded-md hover:bg-red-600 hover:text-white'
        >
          Delete
        </button>
      </div>

      {/* Reusable Edit Modal */}
      {editOpen && (
        <EditProductAdmin 
          data={data} 
          close={() => setEditOpen(false)}
          fetchProductData={fetchProductData}
        />
      )}

      {/* Reusable Confirm Modal */}
      {openDeleteConfirm && (
        <ConfirmBox
          title="Delete Product"
          message={`Are you sure you want to permanently delete "${data.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setOpenDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

ProductCardAdmin.propTypes = {
  data: PropTypes.object.isRequired,
  fetchProductData: PropTypes.func.isRequired,
};

export default ProductCardAdmin;
