import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { MdTimer } from "react-icons/md";

const EateryCard = ({ eateryData }) => {
    if (!eateryData) return null;

    return (
        <Link to={`/eatery/${eateryData._id}`} className='flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1'>
            <div className='w-full h-40 overflow-hidden rounded-t-lg'>
                <img 
                    src={eateryData.imageUrl}
                    alt={eateryData.name}
                    className='object-cover w-full h-full'
                />
            </div>
            
            <div className='flex flex-col flex-grow p-3'>
                <h3 className='text-lg font-bold truncate'>
                    {eateryData.name}
                </h3>
                
                <p className='mt-1 text-sm text-slate-500 truncate'>{eateryData.cuisine.join(', ')}</p>

                <div className='flex items-center justify-between gap-3 mt-auto pt-2 text-sm text-slate-600'>
                    <div className='flex items-center gap-1 font-semibold'>
                        <FaStar className='text-green-500' />
                        <span>{eateryData.rating.toFixed(1)}</span>
                    </div>
                    <div className='flex items-center gap-1 font-semibold'>
                         <MdTimer />
                        <span>{eateryData.deliveryTimeMinutes} min</span>
                    </div>
                    <p className={`font-semibold px-2 py-0.5 rounded-full text-xs ${eateryData.isKosher ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        {eateryData.isKosher ? 'Kosher' : 'Non-Kosher'}
                    </p>
                </div>
            </div>
        </Link>
    );
};

EateryCard.propTypes = {
  eateryData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    cuisine: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    deliveryTimeMinutes: PropTypes.number.isRequired,
    isKosher: PropTypes.bool
  }).isRequired,
};

export default EateryCard;