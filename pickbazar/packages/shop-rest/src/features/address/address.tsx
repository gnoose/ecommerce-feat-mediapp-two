import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';
import { Button } from 'components/button/button';
import UpdateAddress from 'components/address-card/address-card';
import { handleModal } from 'features/checkouts/checkout-modal';
import { ProfileContext } from 'contexts/profile/profile.context';
import useUser from 'data/use-user';
import { CardHeaderAddress, CardHeader } from 'components/card-header/card-header';
import { ButtonGroup } from 'components/button-group/button-group';
import { Box } from 'components/box';
import { Plus } from 'assets/icons/PlusMinus';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { USERADDRESSES } from 'endpoints';
import cookies from 'next-cookies';

interface Props {
  increment?: boolean;
  icon?: boolean;
  buttonProps?: any;
  flexStart?: boolean;
}

const Address = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: 'big',
    variant: 'outlined',
    type: 'button',
    className: 'add-button',
  },
}: Props) => {
  const { deleteAddress } = useUser();
  // let [item, setItem] = useState([]);
  useEffect(() => {
   fetchAdressData();
  }, []);
  const cookie = new Cookies();
  const config = {
    headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
  };
  const fetchAdressData = () => {
    axios.get(USERADDRESSES, config)
      .then(res => {
        const userAddress = res.data.results;
         
        dispatch({ type: 'GOT_ALL_ADDRESS', payload: userAddress });
      })
  };
  const {
    state: { address },
    dispatch,
  } = useContext(ProfileContext);

  const [ selected, setSelected] = useState("")
   
  const handleSetPrimaryAddress = async (item) => {
    console.log("handleSetPrimaryAddress--");
    setSelected("selected")
    dispatch({
      type: 'SET_PRIMARY_ADDRESS',
      payload: item.id.toString(),
    })
  };

  const handleOnDelete = async (item) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: item.id });
    await deleteAddress(item.id);
    axios.delete(`${USERADDRESSES}${item.id}/`, config)
      .then(res => {
      })
  };
  
  return (
    <>
      {/* <CardHeaderAddress increment={increment}>
        <FormattedMessage
          id='checkoutDeliveryAddress'
          defaultMessage='Select Your Delivery Address'
        />
      </CardHeaderAddress>  */}
      <>
        {(() => {
          if (address && address.length >0) {
            return  (
            <ButtonGroup flexStart={flexStart}>
                {(selected === "selected") ?
                  <CardHeader increment={increment}>
                    <FormattedMessage
                      id='checkoutDeliveryAddress'
                      defaultMessage='Select Your Delivery Address'
                    />
                  </CardHeader>
                  :
                  <CardHeaderAddress increment={increment}>
                    <FormattedMessage
                      id='checkoutDeliveryAddress'
                      defaultMessage='Select Your Delivery Address'
                    />
                  </CardHeaderAddress>
                }
            <RadioGroup
              items={address}
              component={(item: any) => (
                <RadioCard
                  id={item.id}
                  key={item.id}
                  title={item.first_name}
                  content={item.line1+ " " +item.phone_number+ " " +item.postcode}
                  name='address'
                //  checked={item.type === 'primary'}   
                  checked={item.is_default_for_shipping}  
                  onChange={() => handleSetPrimaryAddress(item)}              
                  onEdit={() => handleModal(UpdateAddress, item)}
                  onDelete={() => handleOnDelete(item)}
                />
              )}
              secondaryComponent={
                <Button
                  {...buttonProps}
                  onClick={() => handleModal(UpdateAddress, 'add-address-modal')}
                  style={{ borderStyle: 'dashed' }}
                >
                  {icon && (
                    <Box>
                      <Plus width='6px' margin-right ='right'/>
                    </Box>
                  )}
                  <FormattedMessage
                    id='addAddressBtn'
                    defaultMessage='Add Address'
                  />
                </Button>
              }
            />
          </ButtonGroup>)
          }
            else {
              return(
                <ButtonGroup flexStart={flexStart}>
                  <CardHeaderAddress increment={increment}>
                    <FormattedMessage
                      id='checkoutDeliveryAddress'
                      defaultMessage='Select Your Delivery Address'
                    />
                  </CardHeaderAddress>
                  <Button
                    {...buttonProps}
                    onClick={() => handleModal(UpdateAddress, 'add-address-modal')}
                    style={{ borderStyle: 'dashed' }}
                  >
                    {icon && (
                      <Box>
                        <Plus width='6px' />
                      </Box>
                    )}
                    <FormattedMessage
                      id='addAddressBtn'
                      defaultMessage='Add Address'
                    />
                  </Button>
                </ButtonGroup>
              )
          }
        })()}
    </>
    </>
  );
};

export default Address;
