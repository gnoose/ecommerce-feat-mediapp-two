import React, { useState,useEffect } from 'react';
import { ORDERS, ORDERSTATUS } from 'endpoints';
import axios from 'axios';
import { Cookies } from 'react-cookie';


export default function useOrders() {
  const [orderInfo, setOrderInfo] = useState([]);
  const [errorInfo, setErrorInfo] = useState(0);
  const [status, setStatus] = useState("")
  const cookie = new Cookies();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
  const config = {
    headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
  };
  if(orderInfo.length == 0){
    axios.get(ORDERS, config).then(res => {
      const order_data = res.data.results;
      setOrderInfo(order_data);
    }).catch(error => {
      const error_data = error.response.status;
      setErrorInfo(error_data)
    });
  }
  }
  const loading = !orderInfo;

  return {
    data: orderInfo,
    error: errorInfo,
    status: status,
  };
}
