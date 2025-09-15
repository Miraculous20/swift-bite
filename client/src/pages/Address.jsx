import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddAddress from '../components/AddAddress';
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';


import { fetchAddresses, deleteAddress, selectAllAddresses } from '../store/addressSlice';
import ConfirmBox from '../components/ConfirmBox'; 

const Address = () => {
  const dispatch = useDispatch();
  const addressList = useSelector(selectAllAddresses);
  const { status } = useSelector(state => state.address);
  
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

 
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleEdit = (address) => {
    setDataToEdit(address);
    setOpenEditAddress(true);
  };

  
  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setOpenConfirmDelete(true);
  };

 
  const handleConfirmDelete = () => {
    if (idToDelete) {
      dispatch(deleteAddress(idToDelete)); 
      setOpenConfirmDelete(false);
      setIdToDelete(null);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between p-4 bg-white shadow-lg'>
        <h2 className='text-lg font-semibold'>My Addresses</h2>
        <button onClick={() => setOpenAddAddress(true)} className='px-4 py-2 font-semibold text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white'>
          Add New Address
        </button>
      </div>
      <div className='grid gap-4 p-4'>
        {status === 'loading' && !addressList.length && <p>Loading addresses...</p>}
        {addressList.map((address) => (
          <div key={address._id} className='flex items-start justify-between p-4 bg-white border rounded-lg'>
            <div>
              <p className="font-semibold">{address.address_line}</p>
              <p>{address.city}, {address.state}</p>
              <p>{address.country} - {address.pincode}</p>
              <p className="mt-2 text-slate-600">Mobile: {address.mobile}</p>
            </div>
            <div className='flex gap-4'>
              <button onClick={() => handleEdit(address)} className='text-blue-500 hover:text-blue-700' aria-label="Edit Address">
                <MdEdit size={22}/>
              </button>
              <button onClick={() => handleDeleteClick(address._id)} className='text-red-500 hover:text-red-700' aria-label="Delete Address">
                <MdDelete size={22}/>
              </button>
            </div>
          </div>
        ))}
        <div onClick={() => setOpenAddAddress(true)} className='flex items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer text-slate-500 hover:border-green-500 hover:text-green-500'>
          + Add a New Address
        </div>
      </div>

      {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
      {openEditAddress && <EditAddressDetails data={dataToEdit} close={() => setOpenEditAddress(false)} />}
      
     
      {openConfirmDelete && (
        <ConfirmBox 
          message="Are you sure you want to delete this address?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setOpenConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default Address;