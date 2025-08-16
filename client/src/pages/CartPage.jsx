import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaCaretRight } from "react-icons/fa";
import toast from 'react-hot-toast';
import emptyCartImage from '../assets/images/empty_cart.webp';
import AddToCartButton from '../components/AddToCartButton';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import { DisplayPriceInNaira } from '../utils/DisplayPriceInNaira';
import { selectUser } from '../store/userSlice';
import { selectCartItems, selectTotalQty, selectTotalPrice, selectTotalOriginalPrice } from '../store/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(selectCartItems);
    const user = useSelector(selectUser);
    const totalQty = useSelector(selectTotalQty);
    const totalPrice = useSelector(selectTotalPrice);
    const totalOriginalPrice = useSelector(selectTotalOriginalPrice);
    
    const navigate = useNavigate();

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout");
            return;
        }
        toast.error("Please login to proceed to checkout.");
        navigate("/CheckoutPage");
    };

    const savings = totalOriginalPrice - totalPrice;

    if (totalQty === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-[calc(100vh-160px)] text-center'>
                <img src={emptyCartImage} alt="empty_cart" className="w-40 mx-auto mb-4"/>
                <h2 className="mt-6 text-2xl font-semibold">Your Cart is Empty</h2>
                <p className='mt-2 text-slate-500'>Looks like you haven&apos;t added anything to your cart yet.</p>
                <Link to={"/"} className='block px-6 py-2 mt-6 font-semibold text-white bg-green-600 rounded-full hover:bg-green-700'>
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <section className='bg-slate-50 min-h-[calc(100vh-160px)]'>
            <div className='container grid grid-cols-1 gap-8 p-4 mx-auto lg:grid-cols-3'>
                {/* Left Side: Cart Items */}
                <div className='lg:col-span-2'>
                    <h2 className='mb-6 text-xl font-bold'>My Cart ({totalQty})</h2>
                    <div className='grid gap-5 p-4 bg-white rounded-lg shadow-md'>
                        {cartItems.map((item) => (
                            <div key={item?._id} className='flex w-full gap-4 pb-4 border-b last:border-b-0'>
                                <div className='flex-shrink-0 w-24 h-24 overflow-hidden border rounded-lg bg-slate-100'>
                                    <img
                                        src={item?.productId?.image[0]}
                                        className='object-contain w-full h-full'
                                        alt={item?.productId?.name}
                                    />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <h3 className='font-semibold text-ellipsis line-clamp-2'>{item?.productId?.name}</h3>
                                    <p className='text-sm text-slate-500'>{item?.productId?.unit}</p>
                                    <p className='text-lg font-bold'>{DisplayPriceInNaira(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                    <div className='mt-auto'>
                                        <AddToCartButton data={item?.productId}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className='self-start w-full max-w-md p-6 bg-white rounded-lg shadow-md lg:col-span-1'>
                    <h2 className='pb-4 text-xl font-bold border-b'>Order Summary</h2>
                    <div className="grid gap-2 my-4 text-sm">
                        <div className='flex justify-between'><p>Item Total</p><p className='font-medium'>{DisplayPriceInNaira(totalOriginalPrice)}</p></div>
                        {savings > 0 && (<div className='flex justify-between text-green-600'><p>Discount</p><p className='font-medium'>- {DisplayPriceInNaira(savings)}</p></div>)}
                        <div className='flex justify-between'><p>Delivery Charge</p><p className='font-medium text-green-600'>₦500</p></div>
                    </div>
                    <div className='flex items-center justify-between pt-4 mb-4 text-lg font-bold border-t'>
                        <p>Grand Total:</p><p>{DisplayPriceInNaira(totalPrice)}</p>
                    </div>
                    <button onClick={redirectToCheckoutPage} className='flex items-center justify-center w-full gap-2 py-3 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700'>
                        Proceed to Checkout
                        <span><FaCaretRight/></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CartPage;