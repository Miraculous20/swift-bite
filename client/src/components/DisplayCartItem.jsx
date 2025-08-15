import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCaretRight } from "react-icons/fa";
import toast from 'react-hot-toast';

import AddToCartButton from './AddToCartButton';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import { DisplayPriceInNaira } from '../utils/DisplayPriceInNaira';
import imageEmpty from '../assets/images/empty_cart.webp';

import { selectUser } from '../store/userSlice';
import { 
  selectCartItems, 
  selectTotalQty, 
  selectTotalPrice, 
  selectTotalOriginalPrice 
} from '../store/cartSlice';

const DisplayCartItem = ({ close }) => {
    const cartItems = useSelector(selectCartItems);
    const user = useSelector(selectUser);
    const totalQty = useSelector(selectTotalQty);
    const totalPrice = useSelector(selectTotalPrice);
    const totalOriginalPrice = useSelector(selectTotalOriginalPrice);
    
    const navigate = useNavigate();

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout");
            if (close) close();
            return;
        }
        toast.error("Please login to proceed to checkout.");
    };

    const savings = totalOriginalPrice - totalPrice;

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-end bg-black bg-opacity-70'>
            <div className='flex flex-col w-full max-w-sm min-h-full bg-white'>
                <div className='sticky top-0 flex items-center justify-between gap-3 p-4 bg-white shadow-md'>
                    <h2 className='text-lg font-semibold'>My Cart ({totalQty})</h2>
                    <button onClick={close} className='text-2xl hover:text-red-500'>
                        <IoClose />
                    </button>
                </div>

                <div className='flex flex-col flex-grow gap-4 p-4 overflow-y-auto bg-slate-50'>
                    {cartItems.length > 0 ? (
                        <>
                            {savings > 0 && (
                                <div className='flex items-center justify-between px-4 py-2 font-semibold text-green-700 bg-green-100 rounded-lg'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInNaira(savings)}</p>
                                </div>
                            )}
                            
                            <div className='grid gap-5 p-4 bg-white rounded-lg'>
                                {cartItems.map((item) => (
                                    <div key={item?._id} className='flex w-full gap-4 pb-4 border-b last:border-b-0'>
                                        <div className='flex-shrink-0 w-20 h-20 overflow-hidden border rounded-lg bg-slate-100'>
                                            <img
                                                src={item?.productId?.image[0]}
                                                className='object-contain w-full h-full'
                                                alt={item?.productId?.name}
                                            />
                                        </div>
                                        <div className='flex flex-col w-full gap-1'>
                                            <h3 className='text-sm font-medium text-ellipsis line-clamp-2'>{item?.productId?.name}</h3>
                                            <p className='text-xs text-slate-500'>{item?.productId?.unit}</p>
                                            <p className='text-base font-semibold'>{DisplayPriceInNaira(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                            <div className='mt-auto'>
                                                <AddToCartButton data={item?.productId}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-center flex-grow text-center'>
                            <img src={imageEmpty} className='object-contain w-48 h-48' alt="Empty Cart"/>
                            <p className='mt-4 text-slate-500'>Your cart is empty.</p>
                            <Link onClick={close} to={"/"} className='block px-6 py-2 mt-4 font-semibold text-white bg-green-600 rounded-full hover:bg-green-700'>
                                Shop Now
                            </Link>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className='p-4 bg-white shadow-inner'>
                        {/* Bill Details Section */}
                        <div className="grid gap-2 mb-4 text-sm">
                            <h3 className='mb-2 text-base font-semibold'>Bill Details</h3>
                            <div className='flex justify-between'>
                                <p>Item Total</p>
                                <p className='font-medium'>{DisplayPriceInNaira(totalOriginalPrice)}</p>
                            </div>
                            {savings > 0 && (
                                <div className='flex justify-between text-green-600'>
                                    <p>Discount</p>
                                    <p className='font-medium'>- {DisplayPriceInNaira(savings)}</p>
                                </div>
                            )}
                            <div className='flex justify-between'>
                                <p>Delivery Charge</p>
                                <p className='font-medium text-green-600'>Free</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center justify-between gap-4 pt-2 mb-4 text-lg font-bold border-t'>
                            <p>Grand Total:</p>
                            <p>{DisplayPriceInNaira(totalPrice)}</p>
                        </div>
                        <button onClick={redirectToCheckoutPage} className='flex items-center justify-center w-full gap-2 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700'>
                            Proceed to Checkout
                            <span><FaCaretRight/></span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

DisplayCartItem.propTypes = {
  close: PropTypes.func.isRequired,
};

export default DisplayCartItem;
