import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import PropTypes from 'prop-types';

// --- CORRECTED IMPORTS ---
import { selectUser, uploadAvatar } from '../store/userSlice';

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector(selectUser);
    const { status } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        dispatch(uploadAvatar(formData)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                close(); // Close the modal on success
            }
        });
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60'>
            <div className='flex flex-col items-center justify-center w-full max-w-sm p-6 bg-white rounded-lg shadow-xl'>
                <button onClick={close} className='block ml-auto text-slate-500 w-fit hover:text-red-500'>
                    <IoClose size={25}/>
                </button>
                <div className='flex items-center justify-center w-24 h-24 mb-4 overflow-hidden rounded-full bg-slate-200'>
                    {user?.avatar ? (
                        <img 
                            alt={user.name}
                            src={user.avatar}
                            className='object-cover w-full h-full'
                        />
                    ) : (
                        <FaRegUserCircle size={80} className="text-slate-400"/>
                    )}
                </div>
                
                <label htmlFor='uploadProfile' className="w-full text-center cursor-pointer form-button">
                    {status === 'loading' ? "Uploading..." : "Upload New Photo"}
                </label>
                <input 
                    onChange={handleUploadAvatarImage} 
                    type='file' 
                    id='uploadProfile' 
                    className='hidden'
                    accept="image/*"
                />
            </div>
        </section>
    );
};

UserProfileAvatarEdit.propTypes = {
  close: PropTypes.func.isRequired,
};

export default UserProfileAvatarEdit;
