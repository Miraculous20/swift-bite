import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInNaira } from '../utils/DisplayPriceInNaira';
import Divider from '../components/Divider';
import image1 from "/src/assets/images/minute_delivery.png";
import image2 from "/src/assets/images/Best_Prices_Offers.png";
import image3 from "/src/assets/images/Wide_Assortment.png";
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from '../components/AddToCartButton';

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];
  const [product, setProduct] = useState({
    name: "",
    image: [],
    price: 0,
    discount: 0,
    unit: "",
    description: "",
    stock: 0,
    more_details: {}
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef();

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      });

      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails, params]);

  const handleScrollRight = () => {
    imageContainerRef.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainerRef.current.scrollLeft -= 100;
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  const renderImageDots = () => (
    <div className='flex items-center justify-center gap-3 my-2'>
      {product.image.map((_, index) => (
        <button
          key={`dot-${index}`}
          className={`w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === currentImageIndex ? 'bg-slate-300' : 'bg-slate-200'}`}
          onClick={() => handleImageSelect(index)}
          aria-label={`View image ${index + 1}`}
        />
      ))}
    </div>
  );

  const renderPriceSection = () => {
    const discountedPrice = pricewithDiscount(product.price, product.discount);
    return (
      <div>
        <p className=''>Price</p> 
        <div className='flex items-center gap-2 lg:gap-4'>
          <div className='px-4 py-2 border border-green-600 rounded bg-green-50 w-fit'>
            <p className='text-lg font-semibold lg:text-xl'>
              {DisplayPriceInNaira(discountedPrice)}
            </p>
          </div>
          {product.discount > 0 && (
            <>
              <p className='line-through'>{DisplayPriceInNaira(product.price)}</p>
              <p className="font-bold text-green-600 lg:text-2xl">
                {product.discount}% <span className='text-base text-neutral-500'>Discount</span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderProductDetails = () => (
    <div className='grid gap-3 my-4'>
      <div>
        <p className='font-semibold'>Description</p>
        <p className='text-base'>{product.description}</p>
      </div>
      <div>
        <p className='font-semibold'>Unit</p>
        <p className='text-base'>{product.unit}</p>
      </div>
      {product?.more_details && Object.entries(product.more_details).map(([key, value]) => (
        <div key={key}>
          <p className='font-semibold'>{key}</p>
          <p className='text-base'>{value}</p>
        </div>
      ))}
    </div>
  );

  const renderFeatures = () => (
    <div>
      <h2 className='font-semibold'>Why shop from Swift-Bite?</h2>
      <div className='my-4 space-y-4'>
        {[
          { img: image1, title: 'Superfast Delivery within Uyo Metropolis 🚴', 
            desc: 'Get your order delivered to your doorstep from eateries near you.' },
          { img: image2, title: 'Best Prices & Offers', 
            desc: 'Best price offers directly from your favourite eateries.' },
          { img: image3, title: 'Wide Assortment', 
            desc: 'Choose from 5000+ products across food, cafe, bakery & other categories.' }
        ].map((feature, index) => (
          <div key={index} className='flex items-center gap-4'>
            <img src={feature.img} alt={feature.title} className='w-20 h-20' />
            <div className='text-sm'>
              <div className='font-semibold'>{feature.title}</div>
              <p>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className='container grid gap-6 p-4 mx-auto lg:grid-cols-2'>
      {/* Product Images Section */}
      <div>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          {product.image.length > 0 ? (
            <img
              src={product.image[currentImageIndex]}
              alt={product.name}
              className='object-scale-down w-full h-full'
            />
          ) : (
            <div className='flex items-center justify-center w-full h-full bg-gray-100'>
              <span>No image available</span>
            </div>
          )}
        </div>

        {renderImageDots()}

        <div className='relative mt-4'>
          <div 
            ref={imageContainerRef} 
            className='flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory'
          >
            {product.image.map((img, index) => (
              <div 
                key={`thumbnail-${index}`}
                className={`w-20 h-20 min-w-20 cursor-pointer shadow-md snap-start ${index === currentImageIndex ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => handleImageSelect(index)}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className='object-scale-down w-full h-full'
                />
              </div>
            ))}
          </div>

          {product.image.length > 4 && (
            <div className='absolute justify-between hidden w-full px-2 -translate-y-1/2 lg:flex top-1/2'>
              <button 
                onClick={handleScrollLeft}
                className='z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100'
                aria-label='Scroll thumbnails left'
              >
                <FaAngleLeft/>
              </button>
              <button 
                onClick={handleScrollRight}
                className='z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100'
                aria-label='Scroll thumbnails right'
              >
                <FaAngleRight/>
              </button>
            </div>
          )}
        </div>

        <div className='hidden lg:block'>
          {renderProductDetails()}
        </div>
      </div>

      {/* Product Info Section */}
      <div className='p-4 space-y-4 lg:pl-7'>
        <p className='px-2 text-sm font-semibold text-green-800 bg-green-200 rounded-full w-fit'>Fast Delivery</p>
        <h1 className='text-2xl font-semibold lg:text-3xl'>{product.name}</h1>
        <p className='text-gray-600'>{product.unit}</p>
        <Divider/>

        {renderPriceSection()}

        {product.stock === 0 ? (
          <p className='my-2 text-lg font-semibold text-red-500'>Out of Stock</p>
        ) : (
          <div className='my-4'>
            <AddToCartButton data={product}/>
          </div>
        )}

        {renderFeatures()}
        <div className='lg:hidden'>
          {renderProductDetails()}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
