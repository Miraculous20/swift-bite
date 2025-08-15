import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';

const OtpVerification = () => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  // Validate email presence on component mount
  useEffect(() => {
    if (!location?.state?.email) {
      navigate('/forgot-password');
    }
  }, [location?.state?.email, navigate]);

  const isOtpValid = otpDigits.every(digit => digit);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: otpDigits.join(''),
          email: location?.state?.email
        }
      });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setOtpDigits(['', '', '', '', '', '']);
        navigate('/reset-password', {
          state: {
            data: response.data,
            email: location?.state?.email
          }
        });
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <h1 className="font-semibold text-lg mb-4">Enter OTP</h1>
        
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp-input-0" className="block mb-2">
              Enter Your OTP:
            </label>
            
            <div className="flex items-center justify-between gap-2 mt-3">
              {otpDigits.map((digit, index) => (
                <input
                  key={`otp-input-${index}`}
                  id={`otp-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none 
                    focus:border-primary-200 text-center font-semibold"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isOtpValid}
            className={`${
              isOtpValid 
                ? 'bg-green-800 hover:bg-green-700' 
                : 'bg-gray-500 cursor-not-allowed'
            } text-white py-2 rounded font-semibold my-3 tracking-wide transition-colors`}
          >
            Verify OTP
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-green-700 hover:text-green-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;