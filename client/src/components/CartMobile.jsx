import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartShopping, FaCaretRight } from "react-icons/fa6";

// --- Import the correct Redux selectors and currency formatter ---
import { selectTotalQty, selectTotalPrice } from '../store/cartSlice';
import { DisplayPriceInNaira } from '../utils/DisplayPriceInNaira';

const CartMobileLink = () => {
    // --- Get all data directly from the Redux store ---
    const totalQty = useSelector(selectTotalQty);
    const totalPrice = useSelector(selectTotalPrice);

    // Only render the component if there are items in the cart
    if (totalQty === 0) {
        return null;
    }

    return (
        <div className='sticky z-30 p-2 bottom-4 lg:hidden'>
            <div className='flex items-center justify-between gap-3 px-4 py-2 text-white bg-green-600 rounded-lg shadow-lg'>
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <FaCartShopping size={24}/>
                        <span className='absolute flex items-center justify-center w-5 h-5 text-xs bg-red-500 rounded-full -top-2 -right-2'>
                            {totalQty}
                        </span>
                    </div>
                    <div className='text-sm font-semibold'>
                        <p>{totalQty} Item{totalQty > 1 ? 's' : ''}</p>
                        <p>{DisplayPriceInNaira(totalPrice)}</p>
                    </div>
                </div>

                <Link to={"/cart"} className='flex items-center gap-1 font-bold'>
                    <span>View Cart</span>
                    <FaCaretRight/>
                </Link>
            </div>
        </div>
    );
};

export default CartMobileLink;
