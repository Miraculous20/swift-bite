import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectEateryAdmin, selectEateryAdminStatus } from '../store/eateryAdminSlice';
import Loading from '../components/Loading';

const EateryAdminPermission = ({ children }) => {
    const eateryAdminDetails = useSelector(selectEateryAdmin);
    const status = useSelector(selectEateryAdminStatus);
    const location = useLocation();

    // Show a loading indicator while checking the session
    if (status === 'loading' || status === 'idle') {
        return (
            <div className='w-full h-[80vh] flex justify-center items-center'>
                <Loading />
            </div>
        );
    }

    // If the check is complete and an eatery admin is logged in, show the content
    if (status === 'succeeded' && eateryAdminDetails?._id) {
        return children;
    } else {
        // Otherwise, redirect to the eatery login page
        return <Navigate to="/eatery/login" state={{ from: location }} replace />;
    }
};

EateryAdminPermission.propTypes = {
    children: PropTypes.node.isRequired,
};

export default EateryAdminPermission;