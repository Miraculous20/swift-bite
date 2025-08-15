import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FoodCategoryCard = ({ category }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <Link 
            to={`/category/${category.name}`} 
            className="flex flex-col items-center flex-shrink-0 gap-2 text-center group w-28"
            onClick={() => setIsActive(!isActive)} // This is for visual effect only
        >
            <img 
                src={category.image} 
                alt={category.name}
                className={`w-20 h-20 object-cover rounded-full cursor-pointer transition-all duration-300 ${isActive ? 'border-4 border-orange-500 p-0.5' : ''}`}
            />
            <p className="font-semibold text-gray-700 group-hover:text-orange-500">{category.name}</p>
        </Link>
    );
};

FoodCategoryCard.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default FoodCategoryCard;
