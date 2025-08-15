import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ onConfirm, onCancel, message, title = "Confirm Action" }) => {
  return (
    <div 
      className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-black bg-opacity-50 p-4 flex justify-center items-center'
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className='bg-white w-full max-w-sm p-6 rounded-lg shadow-xl'>
        <div className='flex justify-between items-center gap-3 pb-3 border-b'>
          <h1 id="confirm-dialog-title" className='font-semibold text-lg'>{title}</h1>
          <button onClick={onCancel} aria-label="Close confirmation dialog">
            <IoClose size={25} className="text-slate-500 hover:text-red-600"/>
          </button>
        </div>
        
        <p className='my-6 text-slate-700'>{message || 'Are you sure you want to proceed?'}</p>
        
        <div className='flex items-center justify-end gap-4'>
          <button 
            onClick={onCancel} 
            className='px-6 py-2 border rounded-lg border-slate-300 text-slate-700 font-semibold hover:bg-slate-100'
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className='px-6 py-2 border rounded-lg border-red-600 bg-red-600 text-white font-semibold hover:bg-red-700'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmBox.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string,
  title: PropTypes.string,
};

export default ConfirmBox;