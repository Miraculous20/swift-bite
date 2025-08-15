import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logoImage from '../assets/images/logo.png'; // This import is now used

const Footer = () => {
    return (
        <footer id="footer" className="px-4 pt-16 pb-8 text-white bg-gray-800 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {/* Left Section */}
                <div className="flex flex-col items-start gap-4">
                    {/* FIX 1: Used the imported 'logo' variable */}
                   <img src={logoImage} alt="Swift-Bite logo" className="w-40" />
                    {/* FIX 2: Replaced the apostrophe with &apos; */}
                    <p className="text-gray-300">Your go-to for quick, delicious meals delivered right to your doorstep. Experience the best of Uyo&apos;s cuisine with Swift-Bite.</p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="p-2 border border-white rounded-full hover:bg-orange-500" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" className="p-2 border border-white rounded-full hover:bg-orange-500" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" className="p-2 border border-white rounded-full hover:bg-orange-500" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Center Section */}
                <div className="md:mx-auto">
                    <h3 className="text-2xl font-bold">COMPANY</h3>
                    <ul className="mt-4 space-y-2 text-gray-300">
                        <li className="hover:text-orange-500"><a href="/">Home</a></li>
                        <li className="hover:text-orange-500"><a href="/#about-us">About us</a></li>
                        <li className="hover:text-orange-500"><a href="#">Delivery</a></li>
                        <li className="hover:text-orange-500"><a href="#">Privacy policy</a></li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="md:mx-auto">
                    <h3 className="text-2xl font-bold">GET IN TOUCH</h3>
                    <ul className="mt-4 space-y-2 text-gray-300">
                        <li>+234-901-893-2036</li>
                        <li>swiftbite1@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr className="my-8 border-gray-600" />
            <p className="text-center text-gray-400">Copyright 2025 © Swift-Bite - All Right Reserved.</p>
        </footer>
    );
};

export default Footer;