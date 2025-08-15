import { useEffect, useState, useCallback } from 'react';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const Product = () => {
  // The unused 'productData' state has been removed.
  const [page] = useState(1);

  const fetchProductData = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        // The unused 'setProductData' call has been removed.
        console.log("Product page data:", responseData.data); // Kept for debugging purposes
      }

    } catch (error) {
      AxiosToastError(error);
    }
  }, [page]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <div>
      {/* This is a placeholder page */}
      Product Page
    </div>
  );
};

export default Product;
