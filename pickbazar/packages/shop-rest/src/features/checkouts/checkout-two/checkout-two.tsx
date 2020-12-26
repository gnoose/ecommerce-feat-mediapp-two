import React, { useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Button } from 'components/button/button';
import { CURRENCY } from 'utils/constant';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import { USERADDRESSES, COUNTRIES, CHECKOUT, BASKETS } from 'endpoints';
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  CouponCode,
  RemoveCoupon,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text, 
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
} from './checkout-two.style';

import { NoCartBag } from 'assets/icons/NoCartBag';
import Sticky from 'react-stickynode';
import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'contexts/cart/use-cart';
import { useLocale } from 'contexts/language/language.provider';
import { useWindowSize } from 'utils/useWindowSize';
import Coupon from 'features/coupon/coupon';
import Schedules from 'features/schedule/schedule';
import Address from 'features/address/address';
import { Cookies } from 'react-cookie';
import Payment from 'features/payment/payment';
import { CubeGrid } from 'styled-loaders-react';


// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, title, name, unit, price, salePrice } = product;
  const displayPrice = price;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : title} {unit ? `| ${unit}` : ''}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

// const action = Action
const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [setaddress, setAddress] = useState();
  const [paymentOptions, setPaymentOptions] = useState();
  const { state,   dispatch } = useContext(ProfileContext);
  const { isRtl } = useLocale();
  let [persons, setItem] = useState([]);
  
 
  const {
    items,
    removeCoupon,
    coupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateMprice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const { address, contact, card, schedules } = state;
  const [productDetails, setProductDetails] = useState({'data': null});
  const [addressValid, setAddressValid] = React.useState("")
  const size = useWindowSize();
  useEffect(() => {
    fetchData();
    fetchAdressData();
  }, []);
  const cookie = new Cookies();

  const fetchData = () => {
    const config = {
      headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
    };
    axios.get(BASKETS, config)
    .then(res => {
      if (res.data.results.length > 0){
        setItem(res.data.results[0].url);
        setProductDetails({'data': res.data.results[0]});
        setLoading(false)
      }
    })
  };

  const fetchAdressData = () => {
    const config = {
      headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
    };
    axios.get(USERADDRESSES, config)
      .then(res => {
        const persons = res.data.results;
        dispatch({ type: 'GOT_ALL_ADDRESS', payload: persons });
      }).catch(err => {
        console.log("Error occured while fetchAdressData");
       })
  };

  const setAddressvalue = (event) => {
    setAddress(event.target)
  };

  const handleSubmit = async () => {
    setLoading(true);
      const config = {
        headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
      };
      if(address.length >0){
        var primaryAddress  = address[0];
        if(address.length>0){
          primaryAddress =address.filter(addr => addr.is_default_for_shipping === true)
        }
        if(primaryAddress.length === 0)
        {
          setAddressValid("invalid")
        }
        let payload = {
          "returnurl": window.location.origin,
          "basket": persons,
          "paymentoption": paymentOptions,
          "shipping_method_code": "no-shipping-required",
          "shipping_address": {
            "id": primaryAddress[0].id,
            "first_name": primaryAddress[0].first_name,
            "country": COUNTRIES + 'IN/',
            "postcode":primaryAddress[0].postcode,
            "line1":primaryAddress[0].line1,
            "phone_number":primaryAddress[0].phone_number
          }
        }

      setAddressValid("valid")
        axios.post(CHECKOUT, payload, config)
        .then(response =>{
          cookie.set('orderid', response.data.orderId);
          cookie.set('cartid', response.data.number);
          Router.push(response.data.payment_url);
          // Router.push('/shop');
        });
      clearCart();
    }
    else{
      setAddressValid("invalid")
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      calculatePrice() > 0 
    ) {
      setIsValid(true);
    }
  }, [state]);

  useEffect(() => {
    return () => {
      if (isRestaurant) {
        toggleRestaurant();
        clearCart();
      }
    };
  }, []);

  return (
    (loading===true) ? <CubeGrid color="#009E7F" size="60px"/> :
    <form>
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {/* DeliveryAddress */}
            <InformationBox>
              <Address
                increment={true}
                flexStart={true}
                buttonProps={{
                  variant: 'text',
                  type: 'button',
                  className: 'addButton',
                }}
                icon={true}
              />
            </InformationBox>

            {/* DeliverySchedule */}
            <InformationBox>
              <DeliverySchedule>
                <Schedules increment={true} />
              </DeliverySchedule>
              <FormattedMessage id='orderDelivery' />
            </InformationBox>

            {/* Contact number */}
            {/* <InformationBox >
              <Contact
                increment={true}
                flexStart={true}
                buttonProps={{
                  variant: 'text',
                  type: 'button',
                  className: 'addButton',
                }}
                icon={true}
              />
            </InformationBox> */}

            {/* PaymentOption */}
            <InformationBox
              className='paymentBox'
              style={{ paddingBottom: 30 }}
              onChange={e => {
                setAddressvalue(e.target)
              }}
            >
              <Payment deviceType={deviceType} increment={true} setPaymentOptions={setPaymentOptions}/>

              {/* Coupon start */}
              {coupon ? (
                <CouponBoxWrapper>
                  <CouponCode>
                    <FormattedMessage id='couponApplied' />
                    <span>{coupon.code}</span>

                    <RemoveCoupon
                      onClick={(e) => {
                        e.preventDefault();
                        removeCoupon();
                        setHasCoupon(false);
                      }}
                    >
                      <FormattedMessage id='removeCoupon' />
                    </RemoveCoupon>
                  </CouponCode>
                </CouponBoxWrapper>
              ) : (
                <CouponBoxWrapper>
                  {!hasCoupon ? (
                    <HaveCoupon onClick={() => setHasCoupon((prev) => !prev)}>
                      <FormattedMessage
                        id='specialCode'
                        defaultMessage='Have a special code?'
                      />
                    </HaveCoupon>
                  ) : (
                    <>
                      <CouponInputBox>
                        <Coupon errorMsgFixed={true} className='normalCoupon' />
                      </CouponInputBox>
                    </>
                  )}
                </CouponBoxWrapper>
              )}

              <TermConditionText>
                <FormattedMessage
                  id='termAndConditionHelper'
                  defaultMessage='By making this purchase you agree to our'
                />
                <Link href='/terms'>
                  <TermConditionLink>
                    <FormattedMessage
                      id='termAndCondition'
                      defaultMessage='terms and conditions.'
                    />
                  </TermConditionLink>
                </Link>
              </TermConditionText>

              {/* CheckoutSubmit */}
              <CheckoutSubmit>
              {(addressValid === "invalid") ?<div style={{marginBottom: 20, color: "red"}}>
                  <FormattedMessage
                    id='errorCheckoutAddressText'
                    defaultMessage='Please add/select address'
                  />
                </div> : null}
                <Button
                  type='button'
                  onClick={handleSubmit}
                  size='big'
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  <FormattedMessage
                    id='processCheckout'
                    defaultMessage='Proceed to Checkout'
                  />
                </Button>
              </CheckoutSubmit>
            </InformationBox>
          </CheckoutInformation>

          <CartWrapper>
            <Sticky
              enabled={size.width >= 768 ? true : false}
              top={120}
              innerZ={999}
            >
              <OrderInfo>
                <Title>
                  <FormattedMessage
                    id='cartTitle'
                    defaultMessage='Your Order'
                  />
                </Title>

                <Scrollbar className='checkout-scrollbar'>
                  <ItemsWrapper>
                    {productDetails.data && productDetails.data.total_products.length != 0 ? (
                      productDetails.data.total_products.map((item) => (
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
                      ))
                    ) : (
                      <>
                        <NoProductImg>
                          <NoCartBag />
                        </NoProductImg>

                        <NoProductMsg>
                          <FormattedMessage
                            id='loadingDetails'
                            defaultMessage='Loading cart details'
                          />
                        </NoProductMsg>
                      </>
                    )}
                  </ItemsWrapper>
                </Scrollbar>
                <CalculationWrapper>
                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='subTotal'
                        defaultMessage='Subtotal'
                      />
                    </Text>
                    {productDetails.data ?
                    (<Text>
                      {CURRENCY}
                      {productDetails.data.products_not_savings}
                    </Text>) : null }
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='intlOrderDetailsDelivery'
                        defaultMessage='Shipping'
                      />
                    </Text>
                    {productDetails.data ?
                    <Text>{CURRENCY}{productDetails.data.shipping_cost}</Text> : null}
                  </TextWrapper>


                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id='totalText' defaultMessage='Total' />{' '}
                      <Small> 
                        (
                        <FormattedMessage
                          id='vatText'
                          defaultMessage='Incl. VAT'
                        />
                        )
                      </Small>
                    </Bold>
                    {productDetails.data ?
                    (<Bold>
                      {CURRENCY}
                      {productDetails.data.total_cost}
                    </Bold>) : null}
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='discountText'
                        defaultMessage='Discount'
                      />
                    </Text>
                    {productDetails.data ?
                    (<Text>
                      {CURRENCY}
                      {productDetails.data.voucher_savings}
                    </Text>) : null}
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='sploff'
                        defaultMessage='Shipping'
                      />
                    </Text>
                    {productDetails.data ?
                    (<Text>
                      -{CURRENCY}
                      {productDetails.data.special_offer}
                    </Text>) : null}
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='Products Discount'
                        defaultMessage='Products Discount'
                      />
                    </Text>
                    {productDetails.data ?
                    (<Text>
                      -{CURRENCY}
                      {productDetails.data.products_savings}
                    </Text>) : null}
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      <FormattedMessage id='MtotalText' defaultMessage='Total' />{' '}
                      <Small> 
                        (
                        <FormattedMessage
                          id='vatText'
                          defaultMessage='Incl. VAT'
                        />
                        )
                      </Small>
                    </Bold>
                    {productDetails.data ?
                    (<Bold>
                      {CURRENCY}
                      {productDetails.data.total_incl_tax}
                    </Bold>) : null}
                  </TextWrapper>

                  <TextWrapper>
                    <Text>
                      <FormattedMessage
                        id='mySavings'
                        defaultMessage='Your Savings'
                      />
                    </Text>
                    {productDetails.data ?
                    (<Text>
                      {CURRENCY}
                      {productDetails.data.your_savings}
                    </Text>) : null}
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
      <div style={{ padding: '0 30px' , color: "black" , margin: '0 30px'}}>
    <h6> Policies: Returns Policy | Terms of use | Security | Privacy | Infringement  © Medsmitra.com <br /> </h6>
  </div>
    </form>
  );
};

export default CheckoutWithSidebar;
