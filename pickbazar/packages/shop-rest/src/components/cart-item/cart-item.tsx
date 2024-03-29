import React from 'react';
import { Counter } from 'components/counter/counter';
import { CloseIcon } from 'assets/icons/CloseIcon';
import { CURRENCY } from 'utils/constant';
import {
  CartsBannarSubtotal,
  CartsBannarPrice,
  CartsBannarQuantity,
  CartsBannarItem,
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from './cart-item.style';

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const { title, image, price, salePrice, unit, quantity, url } = data;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <ItemBox>
      <CartsBannarItem>
        <Image src={image} />
        <Name>{title}</Name>
      </CartsBannarItem>
      <CartsBannarQuantity>
        <Counter
          value={quantity}
          url = {url}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          variant="altHorizontal"
        />
      </CartsBannarQuantity>
      <CartsBannarPrice>
        <Price>
          {CURRENCY}
          {displayPrice}
        </Price>
      </CartsBannarPrice>
      <CartsBannarSubtotal>
        <Total>
          {CURRENCY}
          {(quantity * displayPrice).toFixed(2)}
        </Total>
        <RemoveButton onClick={onRemove}>
          <CloseIcon />
        </RemoveButton>
      </CartsBannarSubtotal>
    </ItemBox>
  );
};
