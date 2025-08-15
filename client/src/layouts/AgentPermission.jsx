import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectAgent, selectAgentStatus } from '../store/agentSlice';
import Loading from '../components/Loading';

const AgentPermission = ({ children }) => {
    const agentDetails = useSelector(selectAgent);
    const status = useSelector(selectAgentStatus);
    const location = useLocation();

    if (status === 'loading' || status === 'idle') {
        return (
            <div className='w-full h-[80vh] flex justify-center items-center'>
                <Loading />
            </div>
        );
    }

    if (status === 'succeeded' && agentDetails?._id) {
        return children;
    } else {
        // Redirect to login, but with a specific role in the state
        return <Navigate to="/login" state={{ from: location, role: 'agent' }} replace />;
    }
};

AgentPermission.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AgentPermission;