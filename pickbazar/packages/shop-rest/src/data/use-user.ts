import useSWR from 'swr';
import React, { useState,useEffect } from 'react';
import {PROFILE} from 'endpoints'
import axios from 'axios'
import { Cookies } from 'react-cookie';

const fetcher = (url) => fetch(url).then((res) => res.json());
const cookie = new Cookies();
// const end_point_url = '/'

export default function useUser() {
  const [user, setUser] = useState(0);
//const { data, mutate, error } = useSWR(PROFILE, fetcher);
useEffect(() => {
  fetchData();
}, []);  
const fetchData = () => {
  const config = {
    headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
  };
  if (config.headers.Authorization !== "Bearer undefined" && !user){
    let userdata = cookie.get('userdata')
    if(userdata){
      setUser(userdata);
    }
  }
}
  const addOrUpdateContactNumber = async (contact) => {
    console.log(contact, 'contact');
    // return await fetch(end_point_url,{method: 'POST', body: contact });
  };
  const addOrUpdateAddress = async (address) => {
    console.log(address, 'address');

    // return await fetch(end_point_url,{method: 'POST', body: address });
  };
  const addOrUpdatePaymentCard = async (payment_card) => {
    console.log(payment_card, 'payment_card');

    // return await fetch(end_point_url,{method: 'POST', body: payment_card });
  };
  const deleteContactNumber = async (contactId) => {
    console.log(contactId, 'contactId');

    // return await fetch(end_point_url,{method: 'POST', body: contactId });
  };
  const deleteAddress = async (addressId) => {
    console.log(addressId, 'addressId');

    // return await fetch(end_point_url,{method: 'POST', body: addressId });
  };
  const deletePaymentCard = async (cardId) => {
    console.log(cardId, 'cardId');

    // return await fetch(end_point_url,{method: 'POST', body: cardId });
  };

  return {
    // loggedOut,
    user: user,
  //  mutate,
  //  error,
    addOrUpdateContactNumber,
    addOrUpdateAddress,
    addOrUpdatePaymentCard,
    deleteContactNumber,
    deleteAddress,
    deletePaymentCard,
  };
}
