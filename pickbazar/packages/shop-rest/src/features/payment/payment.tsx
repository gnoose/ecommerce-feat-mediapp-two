import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import useUser from 'data/use-user';
import PaymentGroup from 'components/payment-group/payment-group';
import StripePaymentForm from './stripe-form';
import { useCart } from 'contexts/cart/use-cart';
import { CardHeader } from 'components/card-header/card-header';
interface Props {
  deviceType: any;
  increment?: boolean;
  setPaymentOptions?: any;
}

const Payment = ({ deviceType, increment = false, setPaymentOptions}: Props) => {
  const { deletePaymentCard } = useUser();
  const { calculatePrice } = useCart();

  const {
    state: { card },
    dispatch,
  } = useContext(ProfileContext);

  const handlePaymentOptions = async (item) => {
    setPaymentOptions(item.target.value);
  };
  const handleOnDelete = async (item) => {
    dispatch({ type: 'DELETE_CARD', payload: item.id });
    await deletePaymentCard(item.id);
  };
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id="selectPaymentText"
          defaultMessage="Select Payment Option"
        />
      </CardHeader>
      <PaymentGroup
        name="payment"
        deviceType={deviceType}
        items={card}
        onDelete={(item) => handleOnDelete(item)}
        onChange={(item) => handlePaymentOptions(item)}
        handleAddNewCard={() => {
          handleModal(
            StripePaymentForm,
            { totalPrice: calculatePrice() },
            'add-address-modal stripe-modal'
          );
        }}
      />
    </>
  );
};

export default Payment;
