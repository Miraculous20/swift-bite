import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';
import PropTypes from 'prop-types';

// Step 1: Import the correct logoutUser thunk and the user selector
import { logoutUser, selectUser } from '../store/userSlice';

const UserMenu = ({ close }) => {
   const user = useSelector(selectUser);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Step 2: Update the handleLogout function to dispatch the thunk
   const handleLogout = () => {
        dispatch(logoutUser()).then(() => {
            // This will run after the logout is complete
            if (close) {
              close();
            }
            navigate("/");
        });
   };

   const handleClose = () => {
      if (close) {
        close();
      }
   };

  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='flex items-center gap-2 text-sm'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>
            {user?.name || user?.mobile} 
            <span className='font-medium text-red-600'>{user?.role === "ADMIN" ? " (Admin)" : "" }</span>
          </span>
          <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-green-600'>
            <HiOutlineExternalLink size={15}/>
          </Link>
        </div>

        <Divider/>

        <div className='grid gap-1 text-sm'>
            {isAdmin(user?.role) && (
              <>
                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 py-1 rounded hover:bg-slate-100'>Category</Link>
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 py-1 rounded hover:bg-slate-100'>Sub Category</Link>
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 py-1 rounded hover:bg-slate-100'>Upload Product</Link>
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 py-1 rounded hover:bg-slate-100'>All Products</Link>
              </>
            )}

            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 py-1 rounded hover:bg-slate-100'>My Orders</Link>
            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 py-1 rounded hover:bg-slate-100'>Saved Address</Link>

            <button onClick={handleLogout} className='w-full px-2 py-1 text-left rounded hover:bg-slate-100'>
              Log Out
            </button>
        </div>
    </div>
  );
};

UserMenu.propTypes = {
  close: PropTypes.func.isRequired,
};

export default UserMenu;
