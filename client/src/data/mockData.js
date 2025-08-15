// --- Import All Your Local Menu Images Here ---
import saladImg from '../assets/images/food_23.png';
import wrapImg from '../assets/images/food_7.png';
import cheesecakeImg from '../assets/images/food_18.png';
import sandwichImg from '../assets/images/food_13.png';
import spaghettiImg from '../assets/images/food_29.png';
import jollofImg from '../assets/images/food_5.png';
import salad2Img from '../assets/images/food_22.png';
import sandwich2Img from '../assets/images/food_15.png';
import bakedPastaImg from '../assets/images/food_25.png';
import fusilliImg from '../assets/images/food_26.png';

// --- Eatery Images ---
const eateryImage1 = 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600';
const eateryImage2 = 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600';
const eateryImage3 = 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600';
const eateryImage4 = 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600';


// Mock Food Categories for the homepage
export const foodCategories = [
    { id: 1, name: 'Salad', image: saladImg },
    { id: 2, name: 'Rolls', image: wrapImg },
    { id: 3, name: 'Desserts', image: cheesecakeImg },
    { id: 4, name: 'Sandwich', image: sandwichImg },
    { id: 5, name: 'Pasta', image: spaghettiImg },
    { id: 6, name: 'Rice', image: jollofImg },
];

// Mock Eateries for the homepage
export const mockEateries = [
    {
        _id: 'eatery001', name: 'The Bukka Hut', imageUrl: eateryImage1,
        cuisine: ['Nigerian', 'Jollof', 'Swallow'], rating: 4.5, deliveryTimeMinutes: 25, isKosher: false,
    },
    {
        _id: 'eatery002', name: 'Vintage Cafe', imageUrl: eateryImage2,
        cuisine: ['Cafe', 'Coffee', 'Pastries'], rating: 4.8, deliveryTimeMinutes: 15, isKosher: true,
    },
    {
        _id: 'eatery003', name: 'The Grill House', imageUrl: eateryImage3,
        cuisine: ['Grill', 'Burgers', 'Steak'], rating: 4.2, deliveryTimeMinutes: 35, isKosher: false,
    },
    {
        _id: 'eatery004', name: 'Uyo Fine Dining', imageUrl: eateryImage4,
        cuisine: ['Continental', 'Fine Dining'], rating: 4.9, deliveryTimeMinutes: 40, isKosher: true,
    }
];

// Mock Menu Items
export const mockMenu = [
    // The Bukka Hut's Menu
    { _id: 'prod001', name: 'Caesar Salad', image: [saladImg], unit: '1 bowl', price: 3500, discount: 10, stock: 15, category: 'Salad', eateryId: 'eatery001', eateryName: 'The Bukka Hut' },
    { _id: 'prod002', name: 'Smoky Jollof Rice', image: [jollofImg], unit: '1 plate', price: 4500, discount: 15, stock: 30, category: 'Rice', eateryId: 'eatery001', eateryName: 'The Bukka Hut' },
    
    // Vintage Cafe's Menu
    { _id: 'prod003', name: 'Strawberry Cheesecake', image: [cheesecakeImg], unit: '1 slice', price: 4000, discount: 0, stock: 10, category: 'Desserts', eateryId: 'eatery002', eateryName: 'Vintage Cafe' },
    { _id: 'prod004', name: 'Chickpea Salad Sandwich', image: [sandwich2Img], unit: '1 serving', price: 2800, discount: 0, stock: 8, category: 'Sandwich', eateryId: 'eatery002', eateryName: 'Vintage Cafe' },
    { _id: 'prod005', name: 'Baked Mac & Cheese', image: [bakedPastaImg], unit: '1 portion', price: 3800, discount: 0, stock: 5, category: 'Pasta', eateryId: 'eatery002', eateryName: 'Vintage Cafe' },

    // The Grill House's Menu
    { _id: 'prod006', name: 'Chicken Shawarma Wrap', image: [wrapImg], unit: '1 piece', price: 2500, discount: 0, stock: 20, category: 'Rolls', eateryId: 'eatery003', eateryName: 'The Grill House' },
    { _id: 'prod007', name: 'Club Sandwich with Fries', image: [sandwichImg], unit: '4 triangles', price: 3000, discount: 5, stock: 0, category: 'Sandwich', eateryId: 'eatery003', eateryName: 'The Grill House' },
    
    // Uyo Fine Dining's Menu
    { _id: 'prod008', name: 'Spaghetti with Prosciutto', image: [spaghettiImg], unit: '1 serving', price: 5500, discount: 0, stock: 7, category: 'Pasta', eateryId: 'eatery004', eateryName: 'Uyo Fine Dining' },
    { _id: 'prod009', name: 'Fusilli in Tomato Sauce', image: [fusilliImg], unit: '1 serving', price: 4800, discount: 0, stock: 12, category: 'Pasta', eateryId: 'eatery004', eateryName: 'Uyo Fine Dining' },
    { _id: 'prod011', name: 'Roasted Cauliflower Salad', image: [salad2Img], unit: '1 large bowl', price: 4000, discount: 0, stock: 11, category: 'Salad', eateryId: 'eatery004', eateryName: 'Uyo Fine Dining' },
];


// Mock Data for User's "My Orders" page
export const mockOrders = [
    {
        _id: 'ord1', orderId: 'ORD-TRACK-001', orderDate: '2025-08-10T10:00:00Z', totalAmount: 7200, status: 'Out for Delivery',
        products: [{ productId: mockMenu[0], quantity: 2 }]
    },
    {
        _id: 'ord2', orderId: 'ORD-PAST-002', orderDate: '2025-08-09T15:30:00Z', totalAmount: 4000, status: 'Delivered',
        products: [{ productId: mockMenu[2], quantity: 1 }]
    }
];

// Mock Data for a single active order for the tracking page
export const activeOrderDetails = {
    orderId: 'ORD-TRACK-001',
    status: 'Out for Delivery',
    etaMinutes: 12,
    eatery: {
        name: 'The Bukka Hut',
        location: { lat: 5.0381, lng: 7.9224 } 
    },
    customer: {
        address: 'Your Location, Uyo',
        location: { lat: 5.0210, lng: 7.9133 } 
    },
    agent: {
        name: '',
        phone: '',
        location: { lat: 5.0305, lng: 7.9185 } 
    }
};

// Mock Data for Agent Dashboard
export const availableJobsData = [
    { _id: 'job001', orderId: 'ORD-101', eateryName: 'The Bukka Hut', customerAddress: '123 Lekki Rd', status: 'Pending' },
    { _id: 'job002', orderId: 'ORD-102', eateryName: 'Vintage Cafe', customerAddress: '456 VI Close', status: 'Pending' }
];

export const acceptedJobsData = [
    { _id: 'job003', orderId: 'ORD-103', eateryName: 'The Grill House', customerAddress: '789 Ikoyi Drive', status: 'In Progress' }
];