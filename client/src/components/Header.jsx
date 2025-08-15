import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch, FaShoppingBag, FaBars } from "react-icons/fa";
import logoImage from '../assets/images/logo.png';
import { selectUser } from '../store/userSlice';
import { selectAgent } from '../store/agentSlice';
import { selectEateryAdmin } from '../store/eateryAdminSlice';
import { selectTotalQty } from '../store/cartSlice';

const Header = () => {
    const [menu, setMenu] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const totalCartItems = useSelector(selectTotalQty);
    const user = useSelector(selectUser);
    const agent = useSelector(selectAgent);
    const eateryAdmin = useSelector(selectEateryAdmin);
    const navigate = useNavigate();

    const getAccountLink = () => {
        if (eateryAdmin) return "/eatery/dashboard";
        if (agent) return "/agent/dashboard";
        if (user) return "/dashboard/profile";
        return "/login";
    };

    const isLoggedIn = user || agent || eateryAdmin;

    return (
        <header className='sticky top-0 z-50 flex items-center justify-between w-full p-4 bg-white shadow-sm md:px-8 lg:px-16'>
              <Link to="/"><img src={logoImage} alt="Swift-Bite logo" className='w-32 md:w-36' /></Link>
            
            <nav className='items-center hidden gap-8 md:flex'>
                <Link to="/" onClick={() => setMenu("home")} className={`pb-1.5 ${menu === "home" ? "border-b-2 border-orange-500" : ""}`}>Home</Link>
                <a href='/#explore-menu' onClick={() => setMenu("menu")} className={`pb-1.5 ${menu === "menu" ? "border-b-2 border-orange-500" : ""}`}>Menu</a>
                {/* FIX: Changed to a Link component */}
                <Link to="/about" onClick={() => setMenu("about-us")} className={`pb-1.5 ${menu === "about-us" ? "border-b-2 border-orange-500" : ""}`}>About Us</Link>
                <a href='/#footer' onClick={() => setMenu("contact-us")} className={`pb-1.5 ${menu === "contact-us" ? "border-b-2 border-orange-500" : ""}`}>Contact us</a>
            </nav>

            <div className='flex items-center gap-4 md:gap-6'>
                <FaSearch className='cursor-pointer' size={22} />
                <div className='relative'>
                    <Link to="/cart"><FaShoppingBag className='cursor-pointer' size={24} /></Link>
                    {totalCartItems > 0 && <div className='absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-orange-500 rounded-full -top-1 -right-1'>{totalCartItems}</div>}
                </div>
                
                {/* NEW: Eatery Partner Link */}
                <Link to="/eatery/register" className='hidden text-sm font-semibold text-gray-600 lg:block hover:text-orange-500'>
                    For Eateries
                </Link>

                <button onClick={() => navigate(getAccountLink())} className='hidden px-6 py-2 text-sm font-semibold text-white transition-colors bg-orange-500 border border-orange-500 rounded-full md:block hover:bg-orange-600'>
                    {isLoggedIn ? "My Account" : "Sign In"}
                </button>
                <button className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <FaBars size={22} />
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='absolute top-full left-0 w-full bg-white shadow-lg md:hidden'>
                    <nav className='flex flex-col items-center gap-4 p-4'>
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <a href='/#explore-menu' onClick={() => setMobileMenuOpen(false)}>Menu</a>
                        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                        <a href='/#footer' onClick={() => setMobileMenuOpen(false)}>Contact us</a>
                        <Link to="/eatery/register" onClick={() => setMobileMenuOpen(false)}>For Eateries</Link>
                        <button onClick={() => { navigate(getAccountLink()); setMobileMenuOpen(false); }} className='w-full px-6 py-2 mt-2 text-sm font-semibold text-white transition-colors bg-orange-500 border border-orange-500 rounded-full hover:bg-orange-600'>
                            {isLoggedIn ? "My Account" : "Sign In"}
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;