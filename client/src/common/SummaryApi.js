export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const SummaryApi = {
  // --- User Endpoints ---
  register: { url: '/users/register', method: 'post' },
  login: { url: '/users/login', method: 'post' },
  logout: { url: '/users/logout', method: 'get' },
  userDetails: { url: '/users/details', method: 'get' },
  updateUser: { url: '/users/details', method: 'put' },
  uploadAvatar: { url: '/users/avatar', method: 'put' },
  forgotPassword: { url: '/users/forgot-password', method: 'post' },
  verifyOtp: { url: '/users/verify-otp', method: 'post' },
  resetPassword: { url: '/users/reset-password', method: 'post' },
  
  // --- Eatery Endpoints ---
  getAllEateries: { url: '/eateries', method: 'get' },
  getEateryMenu: { url: '/eateries/menu', method: 'get' }, // will be /eateries/menu/:eateryId

  // --- Agent Endpoints ---
  agentRegister: { url: '/agents/register', method: 'post' },
  agentLogin: { url: '/agents/login', method: 'post' },
  agentLogout: { url: '/agents/logout', method: 'get' },
  agentDetails: { url: '/agents/details', method: 'get' },
  getDeliveryJobs: { url: '/agents/jobs', method: 'get' },
  getDeliveryHistory: { url: '/agents/history', method: 'get' },
  acceptDeliveryJob: { url: '/agents/jobs/accept', method: 'post' }, // will be /agents/jobs/accept/:jobId
  updateLocation: { url: '/agents/location', method: 'post' },

  // --- Product (Menu Item) Endpoints ---
  getProducts: { url: '/products', method: 'get' }, 
  getProductDetails: { url: '/products', method: 'get' }, 
  createProduct: { url: '/products', method: 'post' },
  updateProduct: { url: '/products', method: 'put' }, 
  deleteProduct: { url: '/products', method: 'delete' }, 
  getProductByCategory: { url: '/products/by-category', method: 'post' },
  searchProduct: { url: '/products/search', method: 'get' },

  // --- Category Endpoints ---
  getCategory: { url: '/categories', method: 'get' },
  addCategory: { url: '/categories', method: 'post' },
  updateCategory: { url: '/categories', method: 'put' }, 
  deleteCategory: { url: '/categories', method: 'delete' }, 
  
  // --- Sub-Category Endpoints ---
  getSubCategory: { url: '/subcategories', method: 'get' },
  createSubCategory: { url: '/subcategories', method: 'post' },
  updateSubCategory: { url: '/subcategories', method: 'put' },
  deleteSubCategory: { url: '/subcategories', method: 'delete' }, 

  // --- Cart Endpoints ---
  getCartItem: { url: '/cart', method: 'get' },
  addToCart: { url: '/cart', method: 'post' },
  updateCartItemQty: { url: '/cart', method: 'patch' }, 
  deleteCartItem: { url: '/cart', method: 'delete' }, 

  // --- Address Endpoints ---
  getAddress: { url: '/addresses', method: 'get' },
  createAddress: { url: '/addresses', method: 'post' },
  updateAddress: { url: '/addresses', method: 'put' }, 
  deleteAddress: { url: '/addresses', method: 'delete' }, 

  // --- Order Endpoints ---
  getOrderItems: { url: '/orders', method: 'get' },
  createCheckoutSession: { url: '/orders/checkout', method: 'post' },
  createCodOrder: { url: '/orders/cash-on-delivery', method: 'post' },
  getOrderDetails: { url: '/orders', method: 'get' }, // For tracking, will be /orders/:orderId
};

export default SummaryApi;