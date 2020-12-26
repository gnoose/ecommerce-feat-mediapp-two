import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import OrderReceivedWrapper, {
  OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
} from './order-received.style';
import { FormattedMessage } from 'react-intl';
import { ORDERSTATUS } from 'endpoints';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { CubeGrid } from 'styled-loaders-react';

type OrderReceivedProps = {};
// let value = JSON.parse(localStorage.getItem('order_data'))
const OrderReceived: React.FunctionComponent<OrderReceivedProps> = (props) => {
  useEffect(() => {
    orderStatus();
  }, []);
  const [myOrder, setMyOrder] = useState({'data': null})
  const cookie = new Cookies();
  const [loading, setLoading] = useState(true);

  const config = {
    headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
  };

  let orderid = cookie.get('orderid')
  let cartid = cookie.get('cartid')
  let payload = {"cartid": cartid, "orderId": orderid}
  
  async function orderStatus() {
    let res = await axios.post(ORDERSTATUS, payload, config)
    setMyOrder({"data": res.data.order_details})
    cookie.set('status', res.data.orderStatus)
    setLoading(false);
  }

  return (
    (loading===true) ? <CubeGrid color="#009E7F" size="60px"/> :
    <OrderReceivedWrapper>
      <OrderReceivedContainer>
        <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
          </a>
        </Link>

        <OrderInfo>
          <BlockTitle>
            <FormattedMessage
              id="orderReceivedText"
              defaultMessage="Order Received"
            />
          </BlockTitle>

          {(myOrder.data != null && myOrder.data.status === 'failed') ?
                (
                <Text style={{color:'#FF0000'}}>
                <FormattedMessage
                  id="orderReceivedFailed"
                  defaultMessage="Either you cancelled your order or your payment have been declined by the bank, please try again"
                />
              </Text>
              ) : (
                <Text style={{color:'#009E7F'}}>
                <FormattedMessage
                  id="orderReceivedSuccess"
                  defaultMessage="Thank you. Your order has been received"
                />
              </Text>
                )
              }

          <InfoBlockWrapper>
            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="orderNumberText"
                  defaultMessage="Order Number"
                />
              </Text>
              {(myOrder.data != null) ?
              <Text>{myOrder.data.number}</Text> : null
              }
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="orderDateText" defaultMessage="Date" />
              </Text>
              {(myOrder.data != null) ?
              <Text>{myOrder.data.date_placed}</Text> :null
              }
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
              {(myOrder.data != null) ?
                 <Text>₹{myOrder.data.amount}</Text> : null
              }
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="OrderStatus"
                  defaultMessage="OrderStatus"
                />
              </Text>
              {(myOrder.data != null && (myOrder.data.status === 'COD' || myOrder.data.status === 'paid')) ?
                <Text>Success</Text> : <Text>Failure</Text>
              }
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
              {(myOrder.data != null && myOrder.data.status === 'COD') ?
                <Text>COD</Text> : "Internet Banking"
              }
            </InfoBlock>
          </InfoBlockWrapper>
        </OrderInfo>

        <OrderDetails>
          <BlockTitle>
            <FormattedMessage
              id="orderDetailsText"
              defaultMessage="Order Details"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="totalItemText"
                  defaultMessage="Total Item"
                />
              </Text>
            </ListTitle>
            <ListDes>
            {(myOrder.data != null) ?
            (<Text>{myOrder.data.products.length}</Text>) : (null)
            }
            </ListDes>
          </ListItem>

          {/* <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="orderTimeText"
                  defaultMessage="Order Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>1.00pm 10/12/19</Text>
            </ListDes>
          </ListItem> */}

          {/* <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryTimeText"
                  defaultMessage="Delivery Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
        <Text>{value['deliveryTime']}</Text>
            </ListDes>
          </ListItem> */}

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryLocationText"
                  defaultMessage="Delivery Location"
                />
              </Text>
            </ListTitle>
            <ListDes>
            {(myOrder.data != null) ?
              (<Text>
                {myOrder.data.shipping_address.line1} , {myOrder.data.shipping_address.postcode}
                {myOrder.data.shipping_address.state} , INDIA 
              </Text>) : (null)
            }
            </ListDes>
          </ListItem>
        </OrderDetails>

        <TotalAmount>
          <BlockTitle>
            <FormattedMessage
              id="totalAmountText"
              defaultMessage="Total Amount"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="subTotal" defaultMessage="Sub total" />
              </Text>
            </ListTitle>
            <ListDes>
            {(myOrder.data != null) ?
              <Text>₹{myOrder.data.amount}</Text> : null
            }
            </ListDes>
          </ListItem>

          {/* <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>Cash On Delivery</Text>
            </ListDes>
          </ListItem> */}

          {/* <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymentMethodName"
                  defaultMessage="Delivery Charge"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>10</Text>
            </ListDes>
          </ListItem> */}

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
            </ListTitle>
            <ListDes>
            {(myOrder.data != null) ?
              <Text>₹{myOrder.data.amount}</Text> : null
            }
            </ListDes>
          </ListItem>
        </TotalAmount>
      </OrderReceivedContainer>
    </OrderReceivedWrapper>
  );
};

export default OrderReceived;
