import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa";
import { DisplayPriceInNaira } from '../utils/DisplayPriceInNaira';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from './AddToCartButton';
import { validURLConvert } from '../utils/validURLConvert';

const CardProduct = ({ data }) => {
    if (!data) return null; // Safety check

    const url = `/product/${validURLConvert(data.name)}-${data._id}`;

    return (
        <div className='flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl'>
            <div className='relative'>
                <Link to={url}>
                    <img 
                      src={data.image[0]} 
                      alt={data.name} 
                      className='object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110' 
                    />
                </Link>
                {data.discount > 0 && (
                    <div className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                        {data.discount}% OFF
                    </div>
                )}
            </div>
            
            <div className='flex flex-col flex-grow p-4'>
                <h3 className='text-lg font-bold text-gray-800 truncate'>{data.name}</h3>
                <p className='mt-1 text-sm text-gray-500 truncate'>{data.eateryName}</p>
                
                <div className='flex items-center gap-1 mt-2'>
                    <FaStar className='text-yellow-400' />
                    <span className='text-sm text-gray-600'>(4.5)</span>
                </div>

                <div className='flex items-baseline justify-between mt-4'>
                    <div className='flex items-baseline gap-2'>
                        <p className='text-xl font-extrabold text-gray-900'>
                            {DisplayPriceInNaira(pricewithDiscount(data.price, data.discount))}
                        </p>
                        {data.discount > 0 && (
                            <p className='text-sm text-gray-400 line-through'>
                                {DisplayPriceInNaira(data.price)}
                            </p>
                        )}
                    </div>
                    <AddToCartButton data={data} />
                </div>
            </div>
        </div>
    );
};

CardProduct.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    eateryName: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
  }).isRequired,
};

export default CardProduct;