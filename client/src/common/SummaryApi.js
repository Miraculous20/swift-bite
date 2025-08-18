
const SummaryApi = {
  // --- User Endpoints ---
  register: { url: '/api/users/register', method: 'post' },
  login: { url: '/api/users/login', method: 'post' },
  logout: { url: '/api/users/logout', method: 'get' },
  userDetails: { url: '/api/users/details', method: 'get' },
  updateUser: { url: '/api/users/details', method: 'put' },
  uploadAvatar: { url: '/api/users/avatar', method: 'put' }, 
  forgotPassword: { url: '/api/users/forgot-password', method: 'post' },
  verifyOtp: { url: '/api/users/verify-otp', method: 'post' },
  resetPassword: { url: '/api/users/reset-password', method: 'post' },
  
  // --- Eatery Endpoints ---
  getAllEateries: { url: '/api/eateries', method: 'get' },
  getEateryMenu: { url: '/api/eateries/menu', method: 'get' },

  // --- Agent Endpoints ---
  agentRegister: { url: '/api/agents/register', method: 'post' },
  agentLogin: { url: '/api/agents/login', method: 'post' },
  agentLogout: { url: '/api/agents/logout', method: 'get' },
  agentDetails: { url: '/api/agents/details', method: 'get' },
  getDeliveryJobs: { url: '/api/agents/jobs', method: 'get' },
  getDeliveryHistory: { url: '/api/agents/history', method: 'get' },
  acceptDeliveryJob: { url: '/api/agents/jobs/accept', method: 'post' },
  updateLocation: { url: '/api/agents/location', method: 'post' },

  // --- Product (Menu Item) Endpoints ---
  getProducts: { url: '/api/products', method: 'get' }, 
  getProductDetails: { url: '/api/products', method: 'get' }, 
  createProduct: { url: '/api/products', method: 'post' },
  updateProduct: { url: '/api/products', method: 'put' }, 
  deleteProduct: { url: '/api/products', method: 'delete' }, 
  getProductByCategory: { url: '/api/products/by-category', method: 'post' },
  searchProduct: { url: '/api/products/search', method: 'get' },

  // --- Category Endpoints ---
  getCategory: { url: '/api/categories', method: 'get' },
  addCategory: { url: '/api/categories', method: 'post' },
  updateCategory: { url: '/api/categories', method: 'put' }, 
  deleteCategory: { url: '/api/categories', method: 'delete' }, 
  
  // --- Sub-Category Endpoints ---
  getSubCategory: { url: '/api/subcategories', method: 'get' },
  createSubCategory: { url: '/api/subcategories', method: 'post' },
  updateSubCategory: { url: '/api/subcategories', method: 'put' },
  deleteSubCategory: { url: '/api/subcategories', method: 'delete' }, 

  // --- Cart Endpoints ---
  getCartItem: { url: '/api/cart', method: 'get' },
  addToCart: { url: '/api/cart', method: 'post' },
  updateCartItemQty: { url: '/api/cart', method: 'patch' }, 
  deleteCartItem: { url: '/api/cart', method: 'delete' }, 

  // --- Address Endpoints ---
  getAddress: { url: '/api/addresses', method: 'get' },
  createAddress: { url: '/api/addresses', method: 'post' },
  updateAddress: { url: '/api/addresses', method: 'put' }, 
  deleteAddress: { url: '/api/addresses', method: 'delete' }, 

  // --- Order Endpoints ---
  getOrderItems: { url: '/api/orders', method: 'get' },
  createCheckoutSession: { url: '/api/orders/checkout-session', method: 'post' },
  createCodOrder: { url: '/api/orders/cash-on-delivery', method: 'post' },
  getOrderDetails: { url: '/api/orders', method: 'get' },
};

export default SummaryApi;
