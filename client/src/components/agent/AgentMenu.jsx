import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutAgent, selectAgent } from '../../store/agentSlice';
import Divider from '../Divider';

const AgentMenu = ({ close }) => {
   const agent = useSelector(selectAgent);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
        dispatch(logoutAgent()).then(() => {
            if (close) close();
            navigate("/");
        });
   };

  return (
    <div>
        <div className='font-semibold'>Agent Account</div>
        <div className='text-sm text-ellipsis line-clamp-1'>
          {agent?.name}
        </div>
        <Divider/>
        <div className='grid gap-1 text-sm'>
            <Link onClick={close} to={"/agent/dashboard"} className='px-2 py-1 rounded hover:bg-slate-100'>Dashboard</Link>
            <button onClick={handleLogout} className='w-full px-2 py-1 text-left rounded hover:bg-slate-100'>
              Log Out
            </button>
        </div>
    </div>
  );
};

AgentMenu.propTypes = {
  close: PropTypes.func.isRequired,
};

export default AgentMenu;