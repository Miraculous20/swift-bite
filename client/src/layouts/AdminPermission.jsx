import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

const AdminPermission = ({ children }) => {
    const { userDetails, status } = useSelector(state => state.user);
    const location = useLocation();

    // 1. If the user data is still loading, show a loading indicator.
    if (status === 'loading' || status === 'idle') {
        return (
            <div className='w-full h-[80vh] flex justify-center items-center'>
                <Loading />
            </div>
        );
    }

    // 2. Once loading is complete, check the role.
    if (status === 'succeeded' && userDetails?.role === 'ADMIN') {
        return children;
    } else {
        // Redirect to login, passing the original location.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

AdminPermission.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminPermission;