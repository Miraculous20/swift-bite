import { useDispatch, useSelector } from 'react-redux'; 
import PropTypes from 'prop-types';
import { addItemToCart, updateItemQuantity, deleteCartItem, selectCartItems } from '../store/cartSlice';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from 'react';

const AddToCartButton = ({ data }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const [itemInCart, setItemInCart] = useState(null);

    useEffect(() => {
       
        const foundItem = cartItems.find(item => {
            if (typeof item.productId === 'object' && item.productId !== null) {
                return item.productId._id === data._id;
            }
            return item.productId === data._id;
        });
        setItemInCart(foundItem);
    }, [cartItems, data._id]);

    const handleAddItem = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addItemToCart(data._id));
    };

    const handleIncreaseQty = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(updateItemQuantity({ cartItemId: itemInCart._id, quantity: itemInCart.quantity + 1 }));
    };

    const handleDecreaseQty = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (itemInCart.quantity === 1) {
            dispatch(deleteCartItem(itemInCart._id));
        } else {
            dispatch(updateItemQuantity({ cartItemId: itemInCart._id, quantity: itemInCart.quantity - 1 }));
        }
    };

    return (
        <div className='flex items-center'>
            {itemInCart ? (
                <div className='flex items-center justify-between w-24 bg-white border rounded-full shadow-sm h-9'>
                    <button onClick={handleDecreaseQty} className='flex items-center justify-center w-8 h-8 rounded-l-full hover:bg-slate-100' aria-label="Decrease quantity">
                        <FaMinus size={12} />
                    </button>
                    <span className='text-sm font-semibold'>{itemInCart.quantity}</span>
                    <button onClick={handleIncreaseQty} className='flex items-center justify-center w-8 h-8 rounded-r-full hover:bg-slate-100' aria-label="Increase quantity">
                        <FaPlus size={12} />
                    </button>
                </div>
            ) : (
                <button onClick={handleAddItem} className='px-4 py-2 text-sm font-bold text-green-700 transition-colors bg-green-100 rounded-full hover:bg-green-600 hover:text-white'>
                    Add
                </button>
            )}
        </div>
    );
};

AddToCartButton.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddToCartButton;
