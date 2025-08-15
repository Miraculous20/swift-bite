import { useSelector } from 'react-redux';
import FoodCategoryCard from '../components/FoodCategoryCard';
import CardProduct from '../components/CardProduct';
import EateryCard from '../components/EateryCard';
import { selectAllCategories } from '../store/productSlice';
import { selectAllEateries } from '../store/eaterySlice';
import { mockMenu } from '../data/mockData';
import headerBgImage from '../assets/images/header_img.png';

const Home = () => {
    const foodCategories = useSelector(selectAllCategories);
    const allEateries = useSelector(selectAllEateries);
    const topDishes = mockMenu.slice(0, 8); // Display 8 top dishes

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-cover bg-center text-white" style={{ backgroundImage: `url(${headerBgImage})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-4xl px-4 mx-auto md:px-8 lg:px-16">
                    <h1 className="text-4xl font-bold md:text-6xl">Order your favourite food here</h1>
                    <p className="max-w-lg mt-4 text-lg">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients to satisfy your cravings.</p>
                    <a href="#explore-menu" className="px-6 py-3 mt-6 font-semibold text-black transition-colors bg-white rounded-full hover:bg-gray-200">View Menu</a>
                </div>
            </section>

            {/* Explore Menu Section */}
            <section id="explore-menu" className="px-4 py-12 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold">Explore our Menu</h2>
                <p className="mt-2 text-gray-600">Choose from a diverse menu featuring a delectable array of dishes.</p>
                <div className="flex justify-between gap-4 mt-8 overflow-x-auto scrollbar-none">
                    {foodCategories.map((category) => (
                        <FoodCategoryCard key={category._id} category={category} />
                    ))}
                </div>
            </section>

            {/* Eateries Near You Section */}
             <section id="top-eateries" className="px-4 py-12 bg-gray-50 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold">Eateries Near You</h2>
                 <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    {allEateries.map((eatery) => (
                        <EateryCard key={eatery._id} eateryData={eatery} />
                    ))}
                </div>
            </section>

            {/* Top Dishes Section */}
            <section id="top-dishes" className="px-4 py-12 md:px-8 lg:px-16">
                <h2 className="text-3xl font-bold">Top Dishes Near You</h2>
                <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    {topDishes.map((item) => (
                        <CardProduct key={item._id} data={item} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;