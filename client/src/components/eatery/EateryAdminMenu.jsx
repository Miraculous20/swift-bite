import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutEateryAdmin, selectEateryAdmin } from '../../store/eateryAdminSlice';
import Divider from '../Divider';

const EateryAdminMenu = ({ close }) => {
   const eateryAdmin = useSelector(selectEateryAdmin);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
        dispatch(logoutEateryAdmin()).then(() => {
            if (close) close();
            navigate("/");
        });
   };

  return (
    <div>
        <div className='font-semibold'>{eateryAdmin?.eateryName}</div>
        <div className='text-sm text-ellipsis line-clamp-1'>
          Welcome, {eateryAdmin?.name}
        </div>
        <Divider/>
        <div className='grid gap-1 text-sm'>
            <Link onClick={close} to={"/eatery/dashboard"} className='px-2 py-1 rounded hover:bg-slate-100'>Dashboard</Link>
            <Link onClick={close} to={"/eatery/dashboard/products"} className='px-2 py-1 rounded hover:bg-slate-100'>Manage Menu</Link>
            <Link onClick={close} to={"/eatery/dashboard/orders"} className='px-2 py-1 rounded hover:bg-slate-100'>Incoming Orders</Link>
            <Link onClick={close} to={"/eatery/dashboard/profile"} className='px-2 py-1 rounded hover:bg-slate-100'>Eatery Profile</Link>
            <button onClick={handleLogout} className='w-full px-2 py-1 text-left rounded hover:bg-slate-100'>
              Log Out
            </button>
        </div>
    </div>
  );
};

EateryAdminMenu.propTypes = {
  close: PropTypes.func.isRequired,
};

export default EateryAdminMenu;