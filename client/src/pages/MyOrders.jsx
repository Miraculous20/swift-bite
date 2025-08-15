import { useState } from 'react';
import PropTypes from 'prop-types';

// --- Helper Components & Mocks (for a self-contained example) ---

// Icon Components
const PlusIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
);
PlusIcon.propTypes = { className: PropTypes.string };

const MinusIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path></svg>
);
MinusIcon.propTypes = { className: PropTypes.string };

const TrashIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);
TrashIcon.propTypes = { className: PropTypes.string };


// --- Mock Data ---
const initialCartItems = [
    { id: '1', name: 'Classic Beef Burger', price: 3500, quantity: 2, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', name: 'Smoky Jollof Rice', price: 4500, quantity: 1, image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '3', name: 'Crispy French Fries', price: 1500, quantity: 1, image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const DELIVERY_FEE = 500;

// --- Main Ordering Page Component ---

const OrderingPage = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleQuantityChange = (id, amount) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + DELIVERY_FEE;

    return (
        <div className="min-h-screen font-sans bg-gray-50">
            <div className="container px-4 py-8 mx-auto">
                <h1 className="mb-8 text-3xl font-bold text-gray-800">Your Order</h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column: Cart Items */}
                    <div className="p-6 space-y-6 bg-white shadow-md lg:col-span-2 rounded-xl">
                        <h2 className="text-xl font-semibold text-gray-700">Items in Cart ({cartItems.length})</h2>
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                                    <img src={item.image} alt={item.name} className="object-cover w-20 h-20 rounded-lg" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="font-bold text-orange-500">₦{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => handleQuantityChange(item.id, -1)} className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-300 rounded-full hover:bg-gray-100">
                                            <MinusIcon className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <span className="text-lg font-bold">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, 1)} className="flex items-center justify-center w-8 h-8 transition-colors border border-gray-300 rounded-full hover:bg-gray-100">
                                            <PlusIcon className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <p className="w-24 text-lg font-bold text-right">₦{(item.price * item.quantity).toLocaleString()}</p>
                                    <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 transition-colors hover:text-red-500">
                                        <TrashIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-gray-500">Your cart is empty.</p>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky p-6 bg-white shadow-md rounded-xl top-8">
                            <h2 className="mb-6 text-xl font-semibold text-gray-700">Order Summary</h2>
                            <div className="space-y-4 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="font-medium">₦{DELIVERY_FEE.toLocaleString()}</span>
                                </div>
                                <div className="my-4 border-t border-gray-200"></div>
                                <div className="flex justify-between text-lg font-bold text-gray-800">
                                    <span>Total</span>
                                    <span>₦{total.toLocaleString()}</span>
                                </div>
                            </div>
                            <button className="w-full py-3 mt-8 text-lg font-bold text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderingPage;
