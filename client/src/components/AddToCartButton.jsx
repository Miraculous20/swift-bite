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
        const foundItem = cartItems.find(item => item.productId?._id === data._id);
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
                <div className='flex items-center justify-between w-24 h-9 border rounded-full bg-white shadow-sm'>
                    <button onClick={handleDecreaseQty} className='w-8 h-8 flex justify-center items-center hover:bg-slate-100 rounded-l-full' aria-label="Decrease quantity">
                        <FaMinus size={12} />
                    </button>
                    <span className='font-semibold text-sm'>{itemInCart.quantity}</span>
                    <button onClick={handleIncreaseQty} className='w-8 h-8 flex justify-center items-center hover:bg-slate-100 rounded-r-full' aria-label="Increase quantity">
                        <FaPlus size={12} />
                    </button>
                </div>
            ) : (
                <button onClick={handleAddItem} className='bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-4 py-2 rounded-full font-bold text-sm transition-colors'>
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