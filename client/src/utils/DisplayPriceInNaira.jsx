// src/utils/DisplayPriceInNaira.jsx
import PropTypes from 'prop-types';

export const DisplayPriceInNaira = (amount) => {
  const validAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(validAmount);
};

DisplayPriceInNaira.propTypes = {
  amount: PropTypes.number
};