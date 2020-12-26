import React, { useReducer,useState, useContext, createContext } from 'react';
import { reducer, cartItemsTotalPrice } from './cart.reducer';
import { useStorage } from 'utils/use-storage';
import axios from 'axios';
import { BASKETS, PRODUCTS, BASKET_ADD_PRODUCT } from 'endpoints';
import { Cookies } from 'react-cookie';
import { title } from 'process';
import { ProductInfo } from 'components/product-card/product-card.style';
import { CubeGrid } from 'styled-loaders-react';

const CartContext = createContext({} as any);
const INITIAL_STATE = {
  isOpen: false,
  items: [],
  isRestaurant: false,
  coupon: null,
};
const cookie = new Cookies();

const useCartActions = (initialCart = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialCart);
  const [loading, setLoading] = useState(false);

  const addItemHandler = (item, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity} });
    let product_url = item.url
    let payload = { "url": product_url, "quantity": "1" }
    if(!cookie.get('access_token')) {
    } else {
      const config = {
        headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
      }
      axios.post(BASKET_ADD_PRODUCT, payload,config)
      .then(response => {
        postLoginData(response.data);
      });
    }
  };

  async function postLoginData(productsInfo) {
    let basket = [];
    if (ProductInfo && productsInfo.products_info){
      basket = [productsInfo]
    } else {
      const config = {
        headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
      };
      let response = await axios.get(BASKETS, config);
      basket = response.data.results;
    }
    if (basket.length != 0){
      clearCartHandler();
      for (let row in basket){
        if (basket[row].products_info.length != 0){
          let product = basket[row].products_info;
          for (let row1 in product){
            let quantity = basket[row].total_products.find((element) => element.title===product[row1].title).quantity
            addLoginItemHandler(product[row1], quantity);
          }
        }
      }
    }
  }

  const addLoginItemHandler = (item, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = (item, quantity) => {
    // dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity:1 } });
    if (!cookie.get('access_token')) {
      console.log("No token found... Call Login Now");
    } else {
      const config = {
        headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
      };
      if (item.basket_id) {
        dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity:1 } });
        setLoading(true);
        axios.get(`${BASKETS}${item.basket_id}/lines/${item.line_id}/`, config).then(response => {
          let products = response.data
          if (products.quantity-1 === 0){
            axios.delete(`${BASKETS}${item.basket_id}/lines/${item.line_id}/`, config).then(res => {
              postLoginData(res.data);
              setLoading(false);
            })
          }
          else{
            dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity:1 } });
            setLoading(true);
            let payload = {
              "quantity": products.quantity-1,
              "line_reference": products.line_reference,
              "basket": products.basket,
              "product": products.product,
              "stockrecord": products.stockrecord
            }
            axios.put(`${BASKETS}${item.basket_id}/lines/${item.line_id}/`, payload, config).then(res => {
              postLoginData(res.data);
              setLoading(false);
            })
          }
        })
      }
      else{
       
        axios.get(BASKETS, config).then(response => {
          let total_product = response.data.results[0].total_products
          let line = total_product.find((element) => element.product === item.url).url
          axios.get('https' + line.slice(4), config).then(response => {
            let products = response.data
            if (!quantity && products.quantity-1 === 0){
              axios.delete('https' + line.slice(4), config).then(res => {
                postLoginData(res.data);
              })
            }
            else{
              dispatch({ type: 'REMOVE_ITEM', payload: { ...item, quantity:1 } });
              let payload = {}
              if (!quantity){
                payload = {
                  "quantity": products.quantity-1,
                  "line_reference": products.line_reference,
                  "basket": products.basket,
                  "product": products.product,
                  "stockrecord": products.stockrecord
                }
              }
              else{
                payload = {
                  "quantity": quantity,
                  "line_reference": products.line_reference,
                  "basket": products.basket,
                  "product": products.product,
                  "stockrecord": products.stockrecord
                }
              }
              axios.put('https' + line.slice(4), payload, config).then(res => {
                postLoginData(res.data);
              })
            }
          })
        })
      }
    }
  };
  const clearItemFromCartHandler = (item) => {
    dispatch({ type: 'CLEAR_ITEM_FROM_CART', payload: item });
    if (!cookie.get('access_token')) {
      console.log("No token found... Call Login Now");
    } else {
      const config = {
        headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
      };
      if(item.basket){
        axios.delete('https' + item.url.slice(4), config).then(res => {
        })
      }
      else{
        axios.delete(`${BASKETS}${item.basket_id}/lines/${item.line_id}/`, config).then(res => {
          postLoginData(res.data);
        })
      }
    }
  };

  const clearCartHandler = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const toggleCartHandler = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  const couponHandler = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };
  const removeCouponHandler = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };
  const rehydrateLocalState = (payload) => {
    dispatch({ type: 'REHYDRATE', payload });
  };
  const toggleRestaurant = () => {
    dispatch({ type: 'TOGGLE_RESTAURANT' });
  };
  const isInCartHandler = (id) => {
    return state.items?.some((item) => item.id === id);
  };
  const getItemHandler = (id) => {
    return state.items?.find((item) => item.id === id);
  };
  const isUrlCartHandler = (url) => {
    let products = []
    for(let item in state.items){
      if (!state.items[item].basket && state.items[item].url === url){
        products.push(true);
      }
      else if(state.items[item].product === url){
        products.push(true);
      }
      else {
        products.push(false);
      }
    }
    return products.some((val) => val===true)
  };
  const getCartItemsPrice = () => cartItemsTotalPrice(state.items).toFixed(2);
  const getCartItemsTotalPrice = () =>
    cartItemsTotalPrice(state.items, state.coupon).toFixed(2);

  const getDiscount = () => {
    const total = cartItemsTotalPrice(state.items);
    // if(total>1000 && total<2000){
    //   const discount = total*0.1
    //   return discount.toFixed(2);
    // }
    // else if(total>2000 && total<3000)
    // {
    //   const discount = total*0.15
    //   return discount.toFixed(2);
    // }
    // else{
      // const discount = total*0.2
      // return discount.toFixed(2);
      return 0;
    // }
  };
  const getTotal = () => {
    const total = cartItemsTotalPrice(state.items);
    const mtotal = total+50
    return mtotal.toFixed(2);
  };
  const getMTotal = () => {
    const total = cartItemsTotalPrice(state.items);
    // if(total>1000 && total<2000){
    //   const discount = total*0.1
    //   const mgtotal = (total)-discount
    //   return mgtotal.toFixed(2);
    // }
    // else if(total>2000 && total<3000)
    // {
    //   const discount = total*0.15
    //   const mgtotal = (total)-discount
    //   return mgtotal.toFixed(2);
    // }
    // else{
      const discount = 0
      const mgtotal = (total)-discount
      return mgtotal.toFixed(2);
    // }
  };
  const getItemsCount = state.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return {
    state,
    getItemsCount,
    rehydrateLocalState,
    addItemHandler,
    addLoginItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    isUrlCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    getCartItemsPrice,
    couponHandler,
    removeCouponHandler,
    getDiscount,
    toggleRestaurant,
    getTotal,
    getMTotal,
  };
};

export const CartProvider = ({ children }) => {
  const {
    state,
    rehydrateLocalState,
    getItemsCount,
    addItemHandler,
    addLoginItemHandler,
    removeItemHandler,
    clearItemFromCartHandler,
    clearCartHandler,
    isInCartHandler,
    isUrlCartHandler,
    getItemHandler,
    toggleCartHandler,
    getCartItemsTotalPrice,
    couponHandler,
    removeCouponHandler,
    getCartItemsPrice,
    getDiscount,
    toggleRestaurant,
    getTotal,
    getMTotal,
  } = useCartActions();
  const { rehydrated, error } = useStorage(state, rehydrateLocalState);

  return (
    <CartContext.Provider
      value={{
        isOpen: state.isOpen,
        items: state.items,
        coupon: state.coupon,
        isRestaurant: state.isRestaurant,
        cartItemsCount: state.items?.length,
        itemsCount: getItemsCount,
        addItem: addItemHandler,
        addLoginItem: addLoginItemHandler,
        removeItem: removeItemHandler,
        removeItemFromCart: clearItemFromCartHandler,
        clearCart: clearCartHandler,
        isInCart: isInCartHandler,
        isUrlCart: isUrlCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        calculatePrice: getTotal,
        calculateMprice: getMTotal,
        calculateSubTotalPrice: getCartItemsPrice,
        applyCoupon: couponHandler,
        removeCoupon: removeCouponHandler,
        calculateDiscount: getDiscount,
        toggleRestaurant,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
