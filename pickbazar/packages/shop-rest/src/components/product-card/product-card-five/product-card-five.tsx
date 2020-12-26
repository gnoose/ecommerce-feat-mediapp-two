import React from 'react';
import Image from 'components/image/image';
import { PlusOutline } from 'assets/icons/PlusOutline';
import {
  CardWrapper,
  ImageWrapper,
  InfoWrapper,
  Title,
  Price,
  Unit,
  CartButton,
  Counter,
} from './product-card-five.style';
import { useCart } from 'contexts/cart/use-cart';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { BASKET_ADD_PRODUCT, PRODUCTS } from 'endpoints';
import { url } from 'inspector';

type ProductCardProps = {
  title: string;
  image: any;
  weight: string;
  currency?: string;
  description?: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  data?: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const cookies = new Cookies();

  const handleAddClick = (e) => {
    let product_url = `${PRODUCTS}${data.id}/`
    let payload = { "url": product_url, "quantity": "1" }
    const config = {
      headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
    }
    axios.post(BASKET_ADD_PRODUCT, payload,config)
    .then(response => console.log(response));
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  return (
    <CardWrapper onClick={onClick} className="medicine-card">
      <ImageWrapper className={isInCart(data?.id) && 'overlay'}>
        <Image
          url={image}
          className="product-image"
          style={{ position: 'relative' }}
          alt={title}
        />

        {!isInCart(data?.id) ? (
          <CartButton className="cart-button" onClick={handleAddClick}>
            <PlusOutline />
          </CartButton>
        ) : (
          <Counter
            value={getItem(data?.id).quantity}
            url={getItem(data?.id).url}
            onDecrement={handleRemoveClick}
            onIncrement={handleAddClick}
          />
        )}
      </ImageWrapper>
      <InfoWrapper>
        <Price>
          {currency}
          {price}
        </Price>

        <Title>{title}</Title>
        <Unit>{weight}</Unit>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ProductCard;
