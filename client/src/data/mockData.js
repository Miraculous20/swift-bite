// --- Import All Your Local Menu Images Here ---
// Chicken Republic
import jumbopack from '../assets/images/menu.jpg';
import jollof from '../assets/images/menu1.jpg';
import salad from '../assets/images/menu2.webp';
import moimoi from '../assets/images/menu3.webp';
import spaghettiImg from '../assets/images/menu4.jpg';
import grillchicken from '../assets/images/menu5.webp';
import friedchicken from '../assets/images/menu6.jpg';
// Tan for Tantalizer
import pastry from '../assets/images/Tan 1.webp';
import afang from '../assets/images/Tan 2.jpg';
import egusi from '../assets/images/Tan 3.jpg';
import vegetable from '../assets/images/Tan 4.jpg';
import rice from '../assets/images/Tan 4.webp';
// KC for Kitchies Cafe
import sandwich from '../assets/images/KC.webp';
import chicken from '../assets/images/KC 2.webp';
// AM for De Amala Lounge
import amala from '../assets/images/AM 1.webp';
import ewedu from '../assets/images/AM 2.png';
import gbegiri from '../assets/images/AM.webp';

// --- Eatery Images ---
import eatery_1 from '../assets/images/eatery_1.jpg'; // Chicken Republic
import eatery_2 from '../assets/images/eatery_2.jpeg'; // De Amala Lounge
import eatery_3 from '../assets/images/eatery_3.webp'; // Kitchies Cafe
import eatery_4 from '../assets/images/eatery_4.webp'; // Tantalizer

// Mock Food Categories for the homepage
export const foodCategories = [
    { id: 1, name: 'Jumbopack', image: jumbopack },
    { id: 2, name: 'Jollof', image: jollof },
    { id: 3, name: 'Salad', image: salad },
    { id: 4, name: 'Moimoi', image: moimoi },
    { id: 5, name: 'Pasta', image: spaghettiImg },
    { id: 6, name: 'Rice', image: jollof },
];

// Mock Eateries for the homepage
export const mockEateries = [
    {
        _id: 'eatery001',
        name: 'Chicken Republic',
        imageUrl: eatery_1,
        cuisine: ['Nigerian', 'Jollof', 'Swallow', 'Moimoi', 'Chicken'],
        rating: 4.5,
        deliveryTimeMinutes: 25,
    },
    {
        _id: 'eatery002',
        name: 'De Amala Lounge',
        imageUrl: eatery_2,
        cuisine: ['Amala', 'Rice', 'Pastries'],
        rating: 4.8,
        deliveryTimeMinutes: 15,
    },
    {
        _id: 'eatery003',
        name: 'Kitchies Cafe',
        imageUrl: eatery_3,
        cuisine: ['Chicken', 'Salad', 'Soup'],
        rating: 4.2,
        deliveryTimeMinutes: 35,
    },
    {
        _id: 'eatery004',
        name: 'Tantalizer',
        imageUrl: eatery_4,
        cuisine: ['Egusi Soup', 'Afang Soup', 'Vegetable'],
        rating: 4.9,
        deliveryTimeMinutes: 40,
    },
];

// Mock Menu Items
export const mockMenu = [
    // Chicken Republic's Menu 
    { _id: 'prod001', name: 'Jumbopack', image: [jumbopack], unit: '1 bowl', price: 3500, discount: 10, stock: 15, category: 'Jumbopack', eateryId: 'eatery001', eateryName: 'Chicken Republic' },
    { _id: 'prod002', name: 'Smoky Jollof Rice', image: [jollof], unit: '1 plate', price: 4500, discount: 15, stock: 30, category: 'Jollof', eateryId: 'eatery001', eateryName: 'Chicken Republic' },
    { _id: 'prod003', name: 'Classic Salad', image: [salad], unit: '1 bowl', price: 3000, discount: 0, stock: 12, category: 'Salad', eateryId: 'eatery001', eateryName: 'Chicken Republic' },
    { _id: 'prod004', name: 'Moimoi', image: [moimoi], unit: '1 wrap', price: 1000, discount: 0, stock: 30, category: 'Moimoi', eateryId: 'eatery001', eateryName: 'Chicken Republic' },
    { _id: 'prod005', name: 'Spaghetti', image: [spaghettiImg], unit: '1 plate', price: 3500, discount: 5, stock: 20, category: 'Pasta', eateryId: 'eatery001', eateryName: 'Chicken Republic' },
    { _id: 'prod006', name: 'friedchicken', image: [friedchicken], unit: '1 plate', price: 3500, discount: 0, stock: 20, category: 'Pasta', eateryId: 'eatery001', eateryName: 'Chicken Republic' },
    { _id: 'prod007', name: 'grillchicken', image: [grillchicken], unit: '1 plate', price: 5500, discount: 0, stock: 20, category: 'Pasta', eateryId: 'eatery001', eateryName: 'Chicken Republic' },

    // De Amala Lounge's Menu
    { _id: 'prod006', name: 'Amala', image: [amala], unit: '1 wrap', price: 1500, discount: 0, stock: 20, category: 'Amala', eateryId: 'eatery002', eateryName: 'De Amala Lounge' },
    { _id: 'prod007', name: 'Ewedu', image: [ewedu], unit: '1 bowl', price: 1000, discount: 0, stock: 15, category: 'Soup', eateryId: 'eatery002', eateryName: 'De Amala Lounge' },
    { _id: 'prod008', name: 'Gbegiri', image: [gbegiri], unit: '1 bowl', price: 1000, discount: 0, stock: 10, category: 'Soup', eateryId: 'eatery002', eateryName: 'De Amala Lounge' },
    { _id: 'prod009', name: 'Pastry', image: [pastry], unit: '1 piece', price: 800, discount: 0, stock: 25, category: 'Pastries', eateryId: 'eatery002', eateryName: 'De Amala Lounge' },

    // Kitchies Cafe's Menu
    { _id: 'prod010', name: 'Club Sandwich', image: [sandwich], unit: '1 serving', price: 2500, discount: 0, stock: 10, category: 'Sandwich', eateryId: 'eatery003', eateryName: 'Kitchies Cafe' },
    { _id: 'prod011', name: 'Chicken Wings', image: [chicken], unit: '6 pieces', price: 3500, discount: 0, stock: 16, category: 'Chicken', eateryId: 'eatery003', eateryName: 'Kitchies Cafe' },

    // Tantalizer's Menu
    { _id: 'prod012', name: 'Egusi Soup', image: [egusi], unit: '1 bowl', price: 2000, discount: 0, stock: 20, category: 'Soup', eateryId: 'eatery004', eateryName: 'Tantalizer' },
    { _id: 'prod013', name: 'Afang Soup', image: [afang], unit: '1 bowl', price: 2000, discount: 0, stock: 18, category: 'Soup', eateryId: 'eatery004', eateryName: 'Tantalizer' },
    { _id: 'prod014', name: 'Vegetable Soup', image: [vegetable], unit: '1 bowl', price: 2000, discount: 0, stock: 15, category: 'Soup', eateryId: 'eatery004', eateryName: 'Tantalizer' },
    { _id: 'prod015', name: 'White Rice', image: [rice], unit: '1 plate', price: 1500, discount: 0, stock: 22, category: 'Rice', eateryId: 'eatery004', eateryName: 'Tantalizer' },
];

// Mock Data for User's "My Orders" page
export const mockOrders = [
    {
        _id: 'ord1',
        orderId: 'ORD-TRACK-001',
        orderDate: '2025-08-10T10:00:00Z',
        totalAmount: 7200,
        status: 'Out for Delivery',
        products: [{ productId: mockMenu[0], quantity: 2 }]
    },
    {
        _id: 'ord2',
        orderId: 'ORD-PAST-002',
        orderDate: '2025-08-09T15:30:00Z',
        totalAmount: 4000,
        status: 'Delivered',
        products: [{ productId: mockMenu[5], quantity: 1 }]
    }
];

// Mock Data for a single active order for the tracking page
export const activeOrderDetails = {
    orderId: 'ORD-TRACK-001',
    status: 'Out for Delivery',
    etaMinutes: 12,
    eatery: {
        name: 'Chicken Republic',
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
    { _id: 'job001', orderId: 'ORD-101', eateryName: 'Chicken Republic', customerAddress: '123 Lekki Rd', status: 'Pending' },
    { _id: 'job002', orderId: 'ORD-102', eateryName: 'De Amala Lounge', customerAddress: '456 VI Close', status: 'Pending' }
];

export const acceptedJobsData = [
    { _id: 'job003', orderId: 'ORD-103', eateryName: 'Tantalizer', customerAddress: '789 Ikoyi Drive', status: 'In Progress' }
];