import { useState, useEffect } from 'react';
// FIX: The import has been corrected to 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

import AddAddress from '../components/AddAddress';
import { DisplayPriceInNaira } from '../utils/DisplayPriceInNaira';
import { selectAllAddresses, fetchAddresses } from '../store/addressSlice';
import { selectCartItems, selectTotalPrice, selectTotalOriginalPrice, selectTotalQty } from '../store/cartSlice';
import { createCodOrder, createCheckoutSession } from '../store/orderSlice';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);
    const addresses = useSelector(selectAllAddresses);
    const totalPrice = useSelector(selectTotalPrice);
    const totalQty = useSelector(selectTotalQty);
    const totalOriginalPrice = useSelector(selectTotalOriginalPrice);
    const { status: orderStatus } = useSelector(state => state.order);

    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [openAddAddress, setOpenAddAddress] = useState(false);

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            setSelectedAddressId(addresses[0]._id);
        }
    }, [addresses, selectedAddressId]);

    const handlePayment = async (paymentType) => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        const orderData = {
            addressId: selectedAddressId,
            products: cartItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            })),
            totalAmount: totalPrice,
        };

        if (paymentType === 'cod') {
            dispatch(createCodOrder(orderData)).then(result => {
                if (result.meta.requestStatus === 'fulfilled') {
                    navigate('/success', { state: { text: "Order Placed" } });
                }
            });
        }

        if (paymentType === 'online') {
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
            const stripePromise = loadStripe(stripePublicKey);
            
            const result = await dispatch(createCheckoutSession());
            if (result.meta.requestStatus === 'fulfilled') {
                const session = result.payload;
                (await stripePromise).redirectToCheckout({ sessionId: session.id });
            }
        }
    };
    
    const savings = totalOriginalPrice - totalPrice;

    return (
        <section className='bg-slate-50 min-h-[calc(100vh-160px)]'>
            <div className='container grid grid-cols-1 gap-8 p-4 mx-auto lg:grid-cols-2'>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-xl font-bold'>Select Delivery Address</h2>
                    <div className='grid gap-4 p-4 bg-white rounded-lg shadow-md'>
                        {addresses.map((address) => (
                            <label htmlFor={address._id} key={address._id} className='flex gap-4 p-4 border rounded-lg cursor-pointer hover:border-green-500'>
                                <input id={address._id} type='radio' value={address._id} checked={selectedAddressId === address._id} onChange={(e) => setSelectedAddressId(e.target.value)} name='address' />
                                <div>
                                    <p className="font-semibold">{address.address_line}, {address.lga}</p>
                                    <p>{address.city}, {address.state} - {address.pincode}</p>
                                    <p className="mt-1 text-slate-600">Mobile: {address.mobile}</p>
                                </div>
                            </label>
                        ))}
                        <button onClick={() => setOpenAddAddress(true)} className='flex items-center justify-center h-20 border-2 border-dashed rounded-lg text-slate-500 hover:border-green-500 hover:text-green-500'>
                            + Add a New Address
                        </button>
                    </div>
                </div>

                <div className='self-start w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
                    <h2 className='pb-4 text-xl font-bold border-b'>Order Summary</h2>
                    <div className="grid gap-2 my-4 text-sm">
                        <div className='flex justify-between'><p>Items ({totalQty})</p><p className='font-medium'>{DisplayPriceInNaira(totalOriginalPrice)}</p></div>
                        {savings > 0 && (<div className='flex justify-between text-green-600'><p>Discount</p><p className='font-medium'>- {DisplayPriceInNaira(savings)}</p></div>)}
                        <div className='flex justify-between'><p>Delivery</p><p className='font-medium text-green-600'>Free</p></div>
                    </div>
                    <div className='flex items-center justify-between pt-4 mb-4 text-lg font-bold border-t'>
                        <p>Total Amount:</p><p>{DisplayPriceInNaira(totalPrice)}</p>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <button className='form-button' onClick={() => handlePayment('online')} disabled={orderStatus === 'loading'}>
                            {orderStatus === 'loading' ? 'Processing...' : 'Pay Online'}
                        </button>
                        <button className='w-full py-3 font-semibold text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-600 hover:text-white' onClick={() => handlePayment('cod')} disabled={orderStatus === 'loading'}>
                            {orderStatus === 'loading' ? 'Processing...' : 'Cash on Delivery'}
                        </button>
                    </div>
                </div>
            </div>
            {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
        </section>
    );
};

export default CheckoutPage;