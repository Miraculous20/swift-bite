import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEateryMenu, selectEateryMenu, selectEateryStatus } from '../store/eaterySlice';
import CardProduct from '../components/CardProduct';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import { IoArrowBack } from "react-icons/io5";

const EateryMenuPage = () => {
    const { eateryId } = useParams();
    const dispatch = useDispatch();
    const menuItems = useSelector(selectEateryMenu);
    const status = useSelector(selectEateryStatus);
    const error = useSelector((state) => state.eatery.error);
    
    // This selector finds the specific eatery's details from the list we already fetched on the homepage.
    const eateryDetails = useSelector(state => state.eatery.eateries.find(e => e._id === eateryId));

    useEffect(() => {
        if (eateryId) {
            dispatch(fetchEateryMenu(eateryId));
        }
    }, [eateryId, dispatch]);

    // Filter menu items that belong to the current eatery
    const filteredMenuItems = menuItems.filter(item => item.eateryId === eateryId);

    return (
        <section className="min-h-screen bg-white">
            <div className="container p-4 mx-auto">
                <div className="flex items-center gap-4 mb-6">
                     <Link to="/" className="p-2 text-xl rounded-full hover:bg-slate-100">
                        <IoArrowBack />
                    </Link>
                    <h1 className="text-3xl font-bold">
                        {eateryDetails ? `${eateryDetails.name}'s Menu` : 'Menu'}
                    </h1>
                </div>

                {status === 'loading' && <div className="flex items-center justify-center p-8"><Loading /></div>}
                {status === 'failed' && <p className="text-center text-red-500">Error: {error?.message || 'Failed to load menu.'}</p>}
                {status === 'succeeded' && filteredMenuItems.length === 0 && <NoData />}

                {status === 'succeeded' && filteredMenuItems.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredMenuItems.map((item) => (
                            <div key={item._id} className={item.stock === 0 ? 'opacity-60 pointer-events-none' : ''}>
                                <CardProduct data={item} />
                                {item.stock === 0 && (
                                    <div className="relative p-2 -mt-10 font-semibold text-center text-white bg-red-600 rounded-b-lg shadow-lg">
                                        Out of Stock
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EateryMenuPage;