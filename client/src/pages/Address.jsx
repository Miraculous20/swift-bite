import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddAddress from '../components/AddAddress';
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';

// --- CORRECTED IMPORTS: Use the new Thunks and selectors ---
import { fetchAddresses, deleteAddress, selectAllAddresses } from '../store/addressSlice';
import ConfirmBox from '../components/ConfirmBox'; // Using the reusable ConfirmBox

const Address = () => {
  const dispatch = useDispatch();
  const addressList = useSelector(selectAllAddresses);
  const { status } = useSelector(state => state.address);
  
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  // Fetch addresses when the component mounts
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleEdit = (address) => {
    setDataToEdit(address);
    setOpenEditAddress(true);
  };

  // When the user clicks the delete icon, set the ID and open the confirmation box
  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setOpenConfirmDelete(true);
  };

  // This function is called when the user confirms the deletion
  const handleConfirmDelete = () => {
    if (idToDelete) {
      dispatch(deleteAddress(idToDelete)); // Dispatch the thunk with the ID
      setOpenConfirmDelete(false);
      setIdToDelete(null);
    }
  };

  return (
    <div>
      <div className='bg-white shadow-lg p-4 flex justify-between items-center'>
        <h2 className='font-semibold text-lg'>My Addresses</h2>
        <button onClick={() => setOpenAddAddress(true)} className='border border-green-600 text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-green-600 hover:text-white'>
          Add New Address
        </button>
      </div>
      <div className='p-4 grid gap-4'>
        {status === 'loading' && !addressList.length && <p>Loading addresses...</p>}
        {addressList.map((address) => (
          <div key={address._id} className='border rounded-lg p-4 flex justify-between items-start bg-white'>
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
        <div onClick={() => setOpenAddAddress(true)} className='h-24 border-2 border-dashed rounded-lg flex justify-center items-center cursor-pointer text-slate-500 hover:border-green-500 hover:text-green-500'>
          + Add a New Address
        </div>
      </div>

      {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
      {openEditAddress && <EditAddressDetails data={dataToEdit} close={() => setOpenEditAddress(false)} />}
      
      {/* Reusable Confirmation Box */}
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
