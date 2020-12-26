import React from 'react';
import { FormattedMessage } from 'react-intl';
import Carousel from 'components/carousel/carousel';
import PaymentCard from '../payment-card/payment-card';
import { Plus } from 'assets/icons/PlusMinus';
import { Button } from 'components/button/button';
import {
  Header,
  PaymentCardList,
  IconWrapper,
  SavedCard,
  OtherPayOption,
} from './payment-group.style';
import data from 'features/checkouts/data';

interface PaymentCardType {
  id: number | string;
  type: string;
  lastFourDigit: string;
  name: string;
}

interface PaymentOptionType {
  showCard?: boolean;
  addedCard?: PaymentCardType[];
  mobileWallet?: boolean;
  cashOnDelivery?: boolean;
}

interface PaymentGroupProps {
  id?: any;
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  name: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  value?: string;
  onChange: Function;
  items: any;
  onDelete: any;
  handleAddNewCard: any;
}

const PaymentGroup: React.FunctionComponent<PaymentGroupProps> = ({
  items,
  deviceType,
  className,
  name,
  onChange,
  onDelete,
  handleAddNewCard,
}) => {
  // Handle onChange Func
  const handleChange = (item: any) => {
    onChange(item);
  };
  return (
    <>
      <OtherPayOption>
        <label
          htmlFor="net-banking"
          key="${name}-mobile-wa"
          className="other-pay-radio"
        >
          <input
            type="radio"
            id="net-banking"
            name={name}
            value="net-banking"
            onChange={handleChange}
          />
          <span>Payment Gateway</span>
        </label>
        <label
          htmlFor="cash-on-delivery"
          key="${name}-cash"
          className="other-pay-radio cash-on-delivery"
        >
          <input
            type="radio"
            id="cash-on-delivery"
            name={name}
            value="COD"
            onChange={handleChange}
          />
          <span>Cash On Delivery</span>
        </label>
      </OtherPayOption>
    </>
  );
};

export default PaymentGroup;