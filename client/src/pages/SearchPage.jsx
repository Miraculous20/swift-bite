import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardLoading from '../components/CardLoading';
import CardProduct from '../components/CardProduct';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import noDataImage from '/src/assets/images/nothing here.webp';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const location = useLocation();
  const searchQuery = location?.search?.slice(3) || '';
  const loadingPlaceholders = Array(10).fill(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchQuery,
          page: currentPage,
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setProducts(prevProducts => 
          currentPage === 1 
            ? responseData.data 
            : [...prevProducts, ...responseData.data]
        );
        setTotalPages(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const loadMoreProducts = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const hasMoreProducts = currentPage < totalPages;
  const noProductsFound = !isLoading && products.length === 0;

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="font-semibold text-lg mb-4">
          Search Results: {products.length}
        </h2>

        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={hasMoreProducts}
          loader={null}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4">
            {products.map((product) => (
              <CardProduct 
                key={`${product._id}-search`}
                data={product} 
              />
            ))}

            {isLoading && loadingPlaceholders.map((_, index) => (
              <CardLoading key={`loading-${index}`} />
            ))}
          </div>
        </InfiniteScroll>

        {noProductsFound && (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src={noDataImage}
              alt="No products found"
              className="w-64 h-64 object-contain"
            />
            <p className="font-semibold text-gray-600 mt-4">
              No products match your search
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;