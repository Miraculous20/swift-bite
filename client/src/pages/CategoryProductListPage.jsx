import { useParams, Link } from 'react-router-dom';
import { mockMenu } from '../data/mockData';
import CardProduct from '../components/CardProduct';
import NoData from '../components/NoData';
import Divider from '../components/Divider';
import { IoArrowBack } from "react-icons/io5";

const CategoryProductListPage = () => {
    const { categoryName } = useParams();

    // 1. Filter all menu items for the selected category
    const categoryProducts = mockMenu.filter(
        item => item.category.toLowerCase() === categoryName.toLowerCase()
    );

    // 2. Group the filtered products by eatery
    const productsByEatery = categoryProducts.reduce((acc, product) => {
        const eatery = product.eateryName;
        if (!acc[eatery]) {
            acc[eatery] = [];
        }
        acc[eatery].push(product);
        return acc;
    }, {});

    return (
        <section className="min-h-screen bg-slate-50">
            <div className="container p-4 mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/" className="p-2 text-xl rounded-full hover:bg-slate-100">
                        <IoArrowBack />
                    </Link>
                    <h1 className="text-3xl font-bold">
                        {categoryName}
                    </h1>
                </div>

                {categoryProducts.length === 0 && <NoData />}

                {Object.keys(productsByEatery).map(eateryName => (
                    <div key={eateryName} className="mb-8">
                        <h2 className="mb-4 text-2xl font-semibold">{eateryName}</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {productsByEatery[eateryName].map(item => (
                                <CardProduct key={item._id} data={item} />
                            ))}
                        </div>
                        <div className='mt-8'><Divider/></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryProductListPage;
