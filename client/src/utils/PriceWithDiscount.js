// src/utils/PriceWithDiscount.js
export const pricewithDiscount = (price, dis = 0) => {
    const validPrice = Number(price) || 0;
    const validDiscount = Number(dis) || 0;
    const discountAmount = (validPrice * validDiscount) / 100;
    return validPrice - discountAmount;
}