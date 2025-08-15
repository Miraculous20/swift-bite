import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars } from "react-icons/fa";

// Import selectors for all roles
import { selectUser } from '../store/userSlice';
import { selectAgent } from '../store/agentSlice';
import { selectEateryAdmin } from '../store/eateryAdminSlice';

// Import all possible menu components
import UserMenu from '../components/UserMenu';
import AgentMenu from '../components/agent/AgentMenu';
import EateryAdminMenu from '../components/eatery/EateryAdminMenu'; // <-- IMPORT NEW MENU

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Get details for all possible roles from the store
    const user = useSelector(selectUser);
    const agent = useSelector(selectAgent);
    const eateryAdmin = useSelector(selectEateryAdmin);

    // Determine the active role and the corresponding menu component
    let MenuComponent = null;
    if (user) {
        MenuComponent = UserMenu;
    } else if (agent) {
        MenuComponent = AgentMenu;
    } else if (eateryAdmin) {
        MenuComponent = EateryAdminMenu;
    }

    return (
        <section className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto p-3 lg:grid lg:grid-cols-[250px,1fr] gap-4'>
                
                <div className='lg:hidden flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Dashboard</h2>
                    <button onClick={() => setIsMenuOpen(true)} className='p-2'>
                        <FaBars size={20} />
                    </button>
                </div>

                {/* Desktop Sidebar */}
                <aside className='py-4 sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto hidden lg:block border-r bg-white rounded-lg shadow-sm'>
                    {MenuComponent && <MenuComponent close={() => {}} />}
                </aside>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className='lg:hidden fixed inset-0 z-40'>
                        <div 
                            className='absolute inset-0 bg-black bg-opacity-50'
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                        <aside className='absolute top-0 left-0 h-full w-64 bg-white shadow-xl p-4 z-50'>
                           {MenuComponent && <MenuComponent close={() => setIsMenuOpen(false)} />}
                        </aside>
                    </div>
                )}

                {/* Main Content */}
                <main className='bg-white min-h-[75vh] p-4 rounded-lg shadow-sm'>
                    <Outlet />
                </main>
            </div>
        </section>
    );
};

export default Dashboard;