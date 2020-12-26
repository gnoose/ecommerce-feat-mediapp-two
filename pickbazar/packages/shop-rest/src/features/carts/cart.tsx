
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  NoProductImg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
} from './cart.style';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { ShoppingBagLarge } from 'assets/icons/ShoppingBagLarge';
import { NoCartBag } from 'assets/icons/NoCartBag';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import { useCart } from 'contexts/cart/use-cart';
import { CartItem } from 'components/cart-item/cart-item';
import Coupon from 'features/coupon/coupon';
import { BASKETS } from 'endpoints';
import axios from 'axios';
import { AuthContext } from 'contexts/auth/auth.context';
import { Button } from 'components/button/button';
import AuthenticationForm from 'features/authentication-form';
import { openModal ,closeModal} from '@redq/reuse-modal';
import { Cookies } from 'react-cookie';
import { CubeGrid } from 'styled-loaders-react';
import styled from 'styled-components';


type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
};

const CartsBannar = styled.div`
  float: left;
  width: 100%;
  padding: 5px 25px;
  border-bottom: 2px solid #ccc;
  color: #ccc;
  font-weight: 500;
  align-items: center;
`;

const CartsBannarItem = styled.div`
  float: left;
  width: 45%;
`;

const CartsBannarQuantity = styled.div`
  float: left;
  width: 20%;
`;

const CartsBannarPrice = styled.div`
  float: left;
  width: 15%;
`;

const CartsBannarSubtotal = styled.div`
  float: left;
  width: 20%;
`;

const Clearify = styled.div`
  clear: both;
`;



const Cart: React.FC<CartPropsType> = ({
  style,
  className,
  onCloseBtnClick,
  scrollbarHeight,
}) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculateSubTotalPrice,
    isUrlCart,
    clearCart
  } = useCart();
  const [hasCoupon, setCoupon] = useState(false);
  const [itemValid, setItemValid] = React.useState("")

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);
  const { isRtl } = useLocale();
  // let [item, setItem] = useState([]);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const cookie = new Cookies();

  // async function fetchData () {
  //   if (!cookie.get('access_token')) {
  //     console.log("No token found... Call Login Now");
  //   } else {
  //     const config = {
  //       headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
  //     };
  //     let res = await axios.get(BASKETS, config)
  //     let basket = res.data.results;
  //     if (basket.length != 0) {
  //       let products = basket[0].total_products
  //       for (let row in products){
  //         if (!isUrlCart(products[row].product)) {
  //           items.push(products[row])
  //         }
  //       }
  //       // items.push(...basket[0].total_products);
  //     }
  //   }
  // };
  const handleCheckout = () => {
    setItemValid("invalid")
  };
  const CloseComponent = () => {
    return <button onClick={() => closeModal()}>close </button>;
  };
  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });
    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: false,
      component: AuthenticationForm,
      closeComponent: CloseComponent,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };
  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <h4>{"Shopping Cart "}</h4><span>{" ( "}</span>
          <ShoppingBagLarge width='19px' height='24px' />
          <span>
            {cartItemsCount}
            &nbsp;
            {cartItemsCount > 1 ? (
              <FormattedMessage id='cartItems' defaultMessage='items' />
            ) : (
                <FormattedMessage id='cartItem' defaultMessage='item' />
              )}
          </span>
          <span>{" )"}</span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick}>
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

      <Scrollbar className='cart-scrollbar'>
        <ItemWrapper className='items-wrapper'>
          <CartsBannar>
            <CartsBannarItem>{"Item"}</CartsBannarItem>
            <CartsBannarQuantity>{"Quantity"}</CartsBannarQuantity>
            <CartsBannarPrice>{"Price"}</CartsBannarPrice>
            <CartsBannarSubtotal>{"Sub Total"}</CartsBannarSubtotal>
          </CartsBannar>
          <Clearify></Clearify>
          {!!cartItemsCount ? (
            items.map((item, id) => (
              <CartItem
                key={`cartItem-${id}`}
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            ))
          ) : (
              <>
                <NoProductImg>
                  <NoCartBag />
                </NoProductImg>
                <NoProductMsg>
                  <FormattedMessage
                    id='noProductFound'
                    defaultMessage='No products found'
                  />
                </NoProductMsg>
              </>
            )}
        </ItemWrapper>
      </Scrollbar>

      <CheckoutButtonWrapper>
        <PromoCode>
        {!isAuthenticated ? (
          <Button variant="primary" onClick={handleJoin}>
            <FormattedMessage
              id='specialCode'
              defaultMessage='Have a special code?'
            />
          </Button>) :
          (
            <>
            {!coupon?.discountInPercent ? (
            <>
              {!hasCoupon ? (
                <button onClick={() => setCoupon((prev) => !prev)}>
                  <FormattedMessage
                    id='specialCode'
                    defaultMessage='Have a special code?'
                  />
                </button>
              ) : (
                  <CouponBoxWrapper>
                    <Coupon
                      disabled={!items.length}
                      style={{
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06)',
                      }}
                    />
                  </CouponBoxWrapper>
                )}
            </>
          ) : (
              <CouponCode>
                <FormattedMessage
                  id='couponApplied'
                  defaultMessage='Coupon Applied'
                />
                <span>{coupon.code}</span>
              </CouponCode>
            )}
            </>
            )}
        </PromoCode>
        {!isAuthenticated ? (
          <Button variant="primary" onClick={handleJoin}>
            <Title>
              <FormattedMessage id="nav.checkout" defaultMessage="Checkout" /></Title>
            <PriceBox>
              {CURRENCY}
              {calculateSubTotalPrice()}
            </PriceBox>
          </Button>) :
          (<>
            {(cartItemsCount !== 0) ?
              <Link href='/checkout'>
                <CheckoutButton onClick={onCloseBtnClick}>
                  <>
                    <Title>
                      <FormattedMessage
                        id='nav.checkout'
                        defaultMessage='Checkout'
                      />
                    </Title>
                    <PriceBox margin-left='200px'>
                      {CURRENCY}
                      {calculateSubTotalPrice()}
                    </PriceBox>
                  </>
                </CheckoutButton>
              </Link>
            :
             (
              <>
                {(itemValid === "invalid") ?
                  <div style={{marginLeft: 150,marginBottom: 20, color: "red"}}>
                    <FormattedMessage
                      id='errorCheckoutText'
                      defaultMessage='Your cart is empty.'
                    />
                  </div> : null}
                  <CheckoutButton onClick={handleCheckout} >
                    <>
                      <Title>
                        <FormattedMessage id='nav.checkout' defaultMessage='Checkout' />
                      </Title>
                      <PriceBox>
                        {CURRENCY}
                        {calculateSubTotalPrice()}
                      </PriceBox>
                    </>
                  </CheckoutButton>
                </>
              )}
          </>)
        }
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default Cart;
