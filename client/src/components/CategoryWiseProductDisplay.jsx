import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is available in the environment
import PropTypes from 'prop-types';

// --- Mocked Dependencies ---
// In a real application, these would be in separate files.
// They are mocked here to make the component self-contained and runnable.

// Mock for Axios and API calls
const mockApiData = [
    { _id: 'prod1', name: 'Delicious Burger', category: 'Burgers', price: 1500, images: ['https://placehold.co/300x300/f97316/ffffff?text=Burger'] },
    { _id: 'prod2', name: 'Spicy Jollof Rice', category: 'Rice Dishes', price: 2500, images: ['https://placehold.co/300x300/f97316/ffffff?text=Jollof'] },
    { _id: 'prod3', name: 'Goat Meat Pepper Soup', category: 'Soups', price: 3000, images: ['https://placehold.co/300x300/f97316/ffffff?text=Pepper+Soup'] },
    { _id: 'prod4', name: 'Fresh Chapman', category: 'Drinks', price: 1000, images: ['https://placehold.co/300x300/f97316/ffffff?text=Chapman'] },
    { _id: 'prod5', name: 'Shawarma Wrap', category: 'Snacks', price: 2000, images: ['https://placehold.co/300x300/f97316/ffffff?text=Shawarma'] },
    { _id: 'prod6', name: 'Suya Platter', category: 'Grills', price: 4500, images: ['https://placehold.co/300x300/f97316/ffffff?text=Suya'] },
];

const Axios = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: {
                    success: true,
                    data: mockApiData,
                }
            });
        }, 1500); // Simulate network delay
    });
};

const SummaryApi = {
    getProductByCategory: { /* Mock endpoint config */ }
};

const AxiosToastError = (error) => {
    console.error("An API error occurred:", error);
};

// Mock for Redux's useSelector
const useMockSelector = () => {
    return [
        { _id: 'subcat1', name: 'Main Dishes', category: [{ _id: 'cat1' }] },
        { _id: 'subcat2', name: 'Side Dishes', category: [{ _id: 'cat1' }] },
        { _id: 'subcat3', name: 'Beverages', category: [{ _id: 'cat2' }] },
    ];
};

// Mock for utility function
const valideURLConvert = (text = '') => {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Mock for Icon components
const FaAngleLeft = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>;
const FaAngleRight = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8-12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg>;


// Mock for Card components
const CardLoading = () => (
    <div className="w-48 h-64 p-4 bg-gray-200 rounded-lg shadow-md animate-pulse">
        <div className="w-full h-32 mb-4 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
);

const CardProduct = ({ data }) => (
    <div className="flex-shrink-0 w-48 transition-shadow bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
        <Link to={`/product/${data._id}`}>
            <img src={data.images[0]} alt={data.name} className="object-cover w-full h-32 rounded-t-lg" />
            <div className="p-3">
                <h4 className="font-semibold text-gray-800 truncate">{data.name}</h4>
                <p className="text-sm text-gray-500">{data.category}</p>
                <p className="mt-2 font-bold text-orange-500">₦{data.price.toLocaleString()}</p>
            </div>
        </Link>
    </div>
);
CardProduct.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired
};


// --- Original Component (Now using mocked dependencies) ---

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const subCategoryData = useMockSelector(); // Using the mock selector
    const loadingCardNumber = new Array(6).fill(null);

    const fetchCategoryWiseProduct = useCallback(async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: { id }
            });
            const { data: responseData } = response;
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCategoryWiseProduct();
    }, [fetchCategoryWiseProduct]);

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200;
    };

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200;
    };

    const handleRedirectProductListpage = () => {
        const subcategory = subCategoryData.find(sub => 
            sub.category.some(c => c._id === id)
        );
        const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`;
        return url;
    };

    const redirectURL = handleRedirectProductListpage();

    return (
        <div className="py-8">
            <div className='container flex items-center justify-between gap-4 p-4 mx-auto'>
                <h3 className='text-xl font-semibold text-gray-800 md:text-2xl'>{name}</h3>
                <Link to={redirectURL} className='text-orange-500 transition-colors hover:text-orange-600'>See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='container flex gap-4 px-4 py-4 mx-auto overflow-x-scroll md:gap-6 lg:gap-8 scrollbar-none scroll-smooth' ref={containerRef}>
                    {loading && loadingCardNumber.map((_, index) => (
                        <CardLoading key={"CategorywiseProductDisplayLoading" + index} />
                    ))}
                    {!loading && data.map((p, index) => (
                        <CardProduct
                            data={p}
                            key={p._id + "CategorywiseProductDisplay" + index}
                        />
                    ))}
                </div>
                <div className='absolute left-0 right-0 items-center justify-between hidden w-full px-2 mx-auto pointer-events-none lg:flex'>
                    <button onClick={handleScrollLeft} className='z-10 p-2 text-lg text-gray-700 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-gray-100'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 p-2 text-lg text-gray-700 bg-white rounded-full shadow-lg pointer-events-auto hover:bg-gray-100'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

CategoryWiseProductDisplay.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};



// In a real app, you would export this component.
 export default CategoryWiseProductDisplay;

// For display in this environment, we might need to render it.
//const App = () => <CategoryWiseProductDisplay id="cat1" name="Popular Dishes" />;

