import React from 'react';
import { Plus, Minus } from 'assets/icons/PlusMinus';
import { CounterBox, CounterButton, CounterValue } from './counter.style';
import { Input } from 'components/forms/input';
import { useCart } from 'contexts/cart/use-cart';

interface Props {
  onDecrement: (e: Event) => void;
  onIncrement: (e: Event) => void;
  value: number;
  url: string;
  variant?: string;
  className?: string;
}

export const Counter: React.FC<Props> = ({
  onDecrement,
  onIncrement,
  value,
  url,
  variant,
  className,
}) => {
  const {
    removeItem,
  } = useCart();
  let [quantity, setQuantity] = React.useState(0);
  let qname = value;
  const handleChange = (e) => {
    qname = e.target.value;
    e.stopPropagation();
    setQuantity(qname);
    if(qname && qname !== 0){
      let item = {'url': url}
      removeItem(item, qname);
    }
  };
  const changeEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <CounterBox variant={variant} className={className} onClick={changeEvent}>
      <CounterButton onClick={onDecrement} variant={variant}>
        <Minus />
      </CounterButton>
      <Input
        type='number'
        name='name'
        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
        onKeyUp={ (evt) => evt.key === 'e' && evt.preventDefault() }
        value={quantity!==0 ? quantity : qname}
        onChange={handleChange}
        backgroundColor='transparent'
        height='30px'
        width='60px'
        border='0px'
        color={variant==="lightVertical" ? 'black' : 'white'}
      />
      <CounterButton onClick={onIncrement} variant={variant}>
        <Plus />
      </CounterButton>
    </CounterBox>
  );
};
