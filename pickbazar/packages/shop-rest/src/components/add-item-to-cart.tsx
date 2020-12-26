import React, {useContext} from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from './counter/counter';
import { variant as _variant } from 'styled-system';
import { Box } from './box';
import { Cookies } from 'react-cookie';
import AuthenticationForm from 'features/authentication-form';
import { openModal,closeModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import * as ShoppingCart from '../assets/images/shopping-cart.svg';

const Icon = styled.span<any>(
  _variant({
    variants: {
      full: {
        px: 3,
        height: 36,
        backgroundColor: '#e6e6e6',
        transition: '0.35s ease-in-out',
        display: 'flex',
        alignItems: 'center',
      },
    },
  })
);

const Button = styled.button<any>(
  css({
    height: 36,
    borderRadius: 6,
    transition: '0.35s ease-in-out',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#e6e6e6',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'primary.regular',
      borderColor: 'primary.regular',
      color: '#fff',
    },
  }),
  _variant({
    variants: {
      full: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        padding: 0,
        border: 'none',
        overflow: 'hidden',
        ':hover': {
          backgroundColor: 'primary.hover',
          borderColor: 'primary.hover',
          color: '#fff',
          [Icon]: {
            backgroundColor: 'primary.regular',
            color: '#fff',
          },
        },
      },
    },
  })
);

interface Props {
  data?: any;
  variant?: string;
  buttonText?: string;
}

export const AddItemToCart = ({ data, variant, buttonText }: Props) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const cookies = new Cookies();
  const handleAddClick = (e) => {
    e.stopPropagation();
    if (!cookies.get("access_token")){
      handleJoin();
    }
    else{
      addItem(data);
    }
  };

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
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
    data.products ? (
        !isInCart(data.products) ? (
          <Button
            aria-label="add item to cart"
            onClick={handleAddClick}
            variant={variant}
          >
            {!!buttonText && <Box flexGrow={1}>{buttonText}</Box>}
            <Icon variant={variant}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
              >
                <path
                  data-name="Path 9"
                  d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z"
                  transform="translate(-137.782 -137.783)"
                  fill="currentColor"
                />
              </svg>
            </Icon>
          </Button>
        ) : (
          <Counter
            value={getItem(data.products).quantity}
            url={getItem(data.products).url}
            onDecrement={handleRemoveClick}
            onIncrement={handleAddClick}
            className='card-counter'
            variant='altHorizontal'
          />
        )) :
      !isInCart(data.id) ? (
        <Button
          aria-label="add item to cart"
          onClick={handleAddClick}
          variant={variant}
        >
          {!!buttonText && <Box flexGrow={1}>{buttonText}</Box>}
          <Icon variant={variant}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path
                data-name="Path 9"
                d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z"
                transform="translate(-137.782 -137.783)"
                fill="currentColor"
              />
            </svg>
          </Icon>
        </Button>
      ) : (
        <Counter
          value={getItem(data.id).quantity}
          url={getItem(data.id).url}
          onDecrement={handleRemoveClick}
          onIncrement={handleAddClick}
          className='card-counter'
          variant='altHorizontal'
        />
      )
  );
};
