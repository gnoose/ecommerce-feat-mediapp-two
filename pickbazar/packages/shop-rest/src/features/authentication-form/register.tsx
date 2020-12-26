import React, { useContext } from 'react';
import Link from 'next/link';
import { Input } from 'components/forms/input';
import axios from 'axios';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Input,
  Divider,
  LinkButton,
} from './authentication-form.style';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { REGISTER } from 'endpoints'

export default function SignOutModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const Signup = () => {
    let payload = { "username": `${email}`, "password": `${password}`}
    axios.post(REGISTER, payload)
    .then(response => 
    alert('User Registered Successfully'));
  }
  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id='signUpText'
            defaultMessage='Every fill is required in sign up'
          />
        </SubHeading>
        <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder={intl.formatMessage({
            id: 'emailAddressPlaceholder',
            defaultMessage: 'Email Address or Contact No.',
          })}
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
        />
        <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
          type='text'
          placeholder={intl.formatMessage({
            id: 'passwordPlaceholder',
            defaultMessage: 'Password (min 6 characters)',
          })}
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
        />
        <HelperText style={{ padding: '20px 0 30px' }}>
          <FormattedMessage
            id='signUpText'
            defaultMessage="By signing up, you agree to MedsMitra's"
          />
          &nbsp;
          <Link href='/'>
            <a>
              <FormattedMessage
                id='termsConditionText'
                defaultMessage='Terms &amp; Condition'
              />
            </a>
          </Link>
        </HelperText>
        <Button variant='primary' size='big' width='100%' type='submit' onClick={Signup}>
          <FormattedMessage id='continueBtn' defaultMessage='Continue' />
        </Button>
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>
        <Button
          variant='primary'
          size='big'
          style={{
            width: '100%',
            backgroundColor: '#4267b2',
            marginBottom: 10,
          }}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id='continueFacebookBtn'
            defaultMessage='Continue with Facebook'
          />
        </Button>
        <Button
          variant='primary'
          size='big'
          style={{ width: '100%', backgroundColor: '#4285f4' }}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id='continueGoogleBtn'
            defaultMessage='Continue with Google'
          />
        </Button>
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='alreadyHaveAccount'
            defaultMessage='Already have an account?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
