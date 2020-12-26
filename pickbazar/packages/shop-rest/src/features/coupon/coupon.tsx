import React, { useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { CouponBoxWrapper, Error } from './coupon.style';
import { Input } from 'components/forms/input';
import { Button } from 'components/button/button';
// import useCoupon from 'data/use-coupon';
import { useCart } from 'contexts/cart/use-cart';
import { BASKETS,VOUCHER } from 'endpoints'
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { openModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';

type CouponProps = {
  disabled?: any;
  className?: string;
  style?: any;
  errorMsgFixed?: boolean;
};

const Coupon: React.FC<CouponProps> = ({
  disabled,
  className,
  style,
  errorMsgFixed = false,
  ...props
}) => {
  const intl = useIntl();
  const [basket,setBasket] = useState([]);
  // const { verifyCoupon } = useCoupon();
  const { applyCoupon } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const cookie = new Cookies();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);
  
  const handleApplyCoupon = async () => {
    const config = {
      headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
    };
    let baskets = '';
    axios.get(BASKETS, config).then(res => {
      baskets = res.data.results[0].url; 
      let payload = {
        "url": baskets,
        "vouchercode": {code}.code
      }
      axios.post(VOUCHER, payload, config)
        .then(response =>
          console.log(response.data)
        ).catch(error => {
          // if(error.status==406){
            setError("Voucher code is not valid");
          // }
          })
        });
  };
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCode(e.currentTarget.value);
  };


  return (
    <>
      <CouponBoxWrapper
        className={className ? className : 'boxedCoupon'}
        style={style}
      >
        <Input
          onChange={handleOnChange}
          value={code}
          placeholder={intl.formatMessage({
            id: 'couponPlaceholder',
            defaultMessage: 'Enter Coupon Here',
          })}
          {...props}
        />
        <Button
          type='button'
          onClick={handleApplyCoupon}
          disabled={disabled}
          padding='0 30px'
        >
          <FormattedMessage id='voucherApply' defaultMessage='Apply' />
        </Button>
      </CouponBoxWrapper>
      {error && (
        <Error errorMsgFixed={errorMsgFixed}>
          <FormattedMessage id='couponError' defaultMessage={error} />
        </Error>
      )}
    </>
  );
};

export default Coupon;
