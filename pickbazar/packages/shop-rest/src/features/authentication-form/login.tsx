import React, { useContext,useState } from 'react';
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Input,
  Divider,
} from './authentication-form.style';
import {CloseButton1} from 'features/carts/cart.style'
import { CloseIcon } from 'assets/icons/CloseIcon';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import { Input } from 'components/forms/input';
import { Col, Row } from 'react-styled-flexboxgrid';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { AUTH_URL, REGISTER, PHONEACCESS, PHONEVERIFY, GOOGLEAUTH, FBAUTH, BASKETS } from 'endpoints';
import { useCart } from 'contexts/cart/use-cart';

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

export default function SignInModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [showPhoneForm, setShowPhoneForm] = React.useState(true);
  const [phoneValid, setPhoneValid] = React.useState("");
  const cookies = new Cookies();
  const [resend, setResend] = useState(false);
  const hideOtp = true;
  const {INITIAL_STATE, items, clearCart, addItem, isUrlCart, addLoginItem} = useCart();

  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginMobile = preventDefault(() => {
    setShowPhoneForm(false)
    let pattern = new RegExp(/^[0-9\b]+$/);
    if (mobile && mobile.length === 10 && pattern.test(mobile)) {
      setPhoneValid("valid")
      let payload = { "mobile": `${mobile}` }
      axios.post(PHONEACCESS, payload).then(response => {
        if (response && response.status === 200) {
          const hideOtp = false;
        }
      });
    } else {
      setPhoneValid("invalid")
    }
  })

  const loginMobileR = preventDefault(() => {
    setShowPhoneForm(false)
    let pattern = new RegExp(/^[0-9\b]+$/);
    if (mobile && mobile.length === 10 && pattern.test(mobile)) {
      setPhoneValid("valid")
      let payload = { "mobile": `${mobile}` }
      axios.post(PHONEACCESS, payload).then(response => {
        if (response && response.status === 200) {
          const hideOtp = false;
        }
      });
    } else {
      setPhoneValid("invalid")
    }
    setResend(true);
  })

  const mobileToken = preventDefault(() => {
    let payload = { "mobile": `${mobile}`, "otp": `${otp}` }
    axios.post(PHONEVERIFY, payload).then(response => {
      cookies.set('access_token', response.data.access);
      console.log(response)
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      postLoginData();
      closeModal();
    }).catch(err => {
      setPhoneValid("invalid")
      console.log("Error while Login.....");
    });
  })

  async function postLoginData() {
    const config = {
      headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
    };
    let response = await axios.get(BASKETS, config);
    let basket = response.data.results;
    if (basket.length != 0){
      for (let row in basket){
        if (basket[row].products_info.length != 0){
          let product = basket[row].products_info;
          for (let row1 in product){
            let quantity_data = basket[row].total_products.find((element) => element.title===product[row1].title).quantity
            addLoginItem(product[row1], quantity_data);
          }
        }
      }
    }
  }

  const loginCallback = preventDefault(() => {
    if (typeof window !== 'undefined') {
      let payload = {
        "username": `${email}`,
        "password": `${password}`
      };
      axios.post(AUTH_URL, payload).then(response => {
        cookies.set('access_token', response.data.access);
        authDispatch({ type: 'SIGNIN_SUCCESS' });
        postLoginData();
        closeModal();
      }).catch(err => {
        console.log("Error while Login.....");
      });
    };
  })

  const fbResponse = async (accesstoken) => {
    let payload = {access_token : accesstoken.accessToken};
    let res = await axios.post(FBAUTH, payload);
    if (res.data.access_token) {
      cookies.set('access_token', res.data.access_token);
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      postLoginData();
      closeModal();
    }
  }

  const googleLogin = async (accesstoken) => {
    let payload = {access_token : accesstoken.accessToken};
    let res = await axios.post(GOOGLEAUTH, payload);
    if (res.data.access_token) {
      cookies.set('access_token', res.data.access_token);
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      postLoginData();
      closeModal();
    } else {
      console.log("Error while login with Google");
    }
  };

  // function loginCallback() {
  //   if (typeof window !== 'undefined') {
  //     let payload = {
  //       "username": `${email}`,
  //       "password": `${password}`
  //     };
  //     axios.post(AUTH_URL, payload).then(response => {
  //       cookies.set('access_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA0MDY0NjY2LCJqdGkiOiJkNGU4ZWNlNzE3OGI0YmE5ODA5MjE4YmUyMDc4YzllMCIsInVzZXJfaWQiOjIzfQ.hEeGBv874ScDLvKiMmbtjnFBZec5MYtuV5YFMF3gJfM');
  //       localStorage.setItem('access_token', response.data.access);
  //       authDispatch({ type: 'SIGNIN_SUCCESS' });
  //       // closeModal();
  //     }).catch(err => {
  //       console.log("Error while Login.....");
  //     });
  //   };
  // }
  return (
    <Wrapper>
        <CloseButton1 onClick={() => closeModal()}><CloseIcon/></CloseButton1>
      <Container>
        <Heading>
          <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back' />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id='loginText'
            defaultMessage='Login with your email &amp; password'
          />
        </SubHeading>
        {showPhoneForm == true ?
        <>
        <form onSubmit={loginMobile}>
          <Input
            type='text'
            placeholder = {intl.formatMessage({
              id: 'Mobile Number',
              defaultMessage: '',
            })}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <Button
            variant='primary'
            size='big'
            style={{ width: '100%' }}
            type='submit'
          >
            <FormattedMessage id='otpBtn' defaultMessage='Get OTP' />
          </Button>
        </form> 
        </>:<>
        {(phoneValid !== "invalid") ?  
          <form onSubmit={mobileToken}>
            {(resend === true) ?
      <div style={{color: '#009E7F', height: '30px'}}>
        <p> OTP has been resent</p>
      </div> : <div style={{color: '#009E7F', height: '30px'}}>
        <p> We have sent OTP to {mobile}</p>
      </div>}
             <Input
              type='text'
              placeholder={intl.formatMessage({
                id: 'otpPlaceholder',
                defaultMessage: 'OTP (6 characters)',
              })}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              height='48px'
              backgroundColor='#F7F7F7'
              mb='10px'
            />
            <Row style={{justifyContent: 'center'}}>
              <Col>
            <Button
              variant='primary'
              size='medium'
              style={{ width: '100%' ,display:'inline'}}
              type={hideOtp ? 'hidden' : 'submit'}
            >
              <FormattedMessage id='continueBtn' defaultMessage='Continue' />
            </Button>
            </Col>
            <Col>
            <Button
              variant='primary'
              size='medium'
              style={{ width: '100%' ,display:'inline'}}
              onClick={loginMobileR}             
            >
              <FormattedMessage id='resendotpBtn' defaultMessage='Resend OTP' />
            </Button>
            </Col>
            </Row>
          </form>
          : 
          <>
            <div style={{color: "red"}}>
              <FormattedMessage
                id='errorLoginText'
                defaultMessage='Please enter a valid mobile number.'
              />
            </div>
            <form onSubmit={loginMobile}>
              <Input
                type='text'
                placeholder = {intl.formatMessage({
                  id: 'Mobile number',
                  defaultMessage: '',
                })}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                height='48px'
                backgroundColor='#F7F7F7'
                mb='10px'
              />
              <Button
                variant='primary'
                size='big'
                style={{ width: '100%' }}
                type='submit'
              >
                <FormattedMessage id='otpBtn' defaultMessage='Get OTP' />
              </Button>
            </form> 
          </>
          }
          </>
        }
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        <SubHeading>
          <FormattedMessage 
            id="stayMessage" 
            defaultMessage='Stay in touch with us using'
          />
        </SubHeading>

        <Row style={{justifyContent: 'center'}}>
          <Col>
            <FacebookLogin
              appId="1051260815319911"
              autoLoad={false}
              fields="name,email,picture"
              callback={fbResponse}
              cssClass="btnFacebook"
              size='medium'
              icon="fa-facebook"
              textButton="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Facebook"
            >
            </FacebookLogin>
          </Col>
          <Col>
            <GoogleLogin
              clientId="718824517790-551s4201ut1hfc5c7t90bp7kp2f5iqpb.apps.googleusercontent.com"
              onSuccess={googleLogin}
              onFailure={googleLogin}
              className="btnGoogle"
              buttonText=""
            >
              <span>Google</span>
            </GoogleLogin>
          </Col>
        </Row>
      </Container>

      <OfferSection />
    </Wrapper>
  );
}
