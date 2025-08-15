import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import toast from 'react-hot-toast';

import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import { selectUser, setUserDetails } from '../store/userSlice';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';

const Profile = () => {
    // FIX 1: Use the correct selector to get 'userDetails' directly.
    const userDetails = useSelector(selectUser);
    const dispatch = useDispatch();

    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // FIX 2: Set initial form data from 'userDetails'.
        if (userDetails) {
            setData({
                name: userDetails.name || "",
                email: userDetails.email || "",
                mobile: userDetails.mobile || "",
            });
        }
    }, [userDetails]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await Axios({
                ...SummaryApi.updateUser,
                data: data,
            });
            
            toast.success(response.data.message);
            if (response.data.success) {
                // Dispatch action to update the user details in Redux store
                dispatch(setUserDetails(response.data.data));
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <div className='flex items-center gap-4'>
                <div className='flex items-center justify-center w-24 h-24 overflow-hidden rounded-full bg-slate-200 drop-shadow-sm'>
                    {/* FIX 3: Read the avatar URL from userDetails.avatar */}
                    {userDetails?.avatar ? (
                        <img 
                          alt={userDetails.name}
                          src={userDetails.avatar}
                          className='object-cover w-full h-full'
                        />
                    ) : (
                        <FaRegUserCircle size={80} className="text-slate-400"/>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">{userDetails?.name}</h2>
                    <p className="text-slate-500">{userDetails?.role}</p>
                    <button onClick={() => setProfileAvatarEdit(true)} className='px-4 py-1 mt-3 text-sm font-semibold text-green-700 border border-green-700 rounded-full hover:bg-green-100'>
                        Edit Avatar
                    </button>
                </div>
            </div>
            
            {openProfileAvatarEdit && (
                <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
            )}

            <form className='grid gap-4 my-8' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Name:</label>
                    <input
                        type='text'
                        placeholder='Enter your name' 
                        className='form-input'
                        value={data.name}
                        name='name'
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className='grid'>
                    <label>Email:</label>
                    <input
                        type='email'
                        placeholder='Enter your email' 
                        className='form-input bg-slate-200' // Make email read-only
                        value={data.email}
                        readOnly
                    />
                </div>
                <div className='grid'>
                    <label>Mobile:</label>
                    <input
                        type='text'
                        placeholder='Enter your mobile number' 
                        className='form-input'
                        value={data.mobile}
                        name='mobile'
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit" className='max-w-xs form-button'>
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default Profile;