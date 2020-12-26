import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  FeedbackWrapper,
  FeedbackMessage,
  OrderTitle,
  OrderErrorTitle,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from './order.style';
import OrderDetails from './order-details/order-details';
import OrderCard from './order-card/order-card';
import OrderCardMobile from './order-card/order-card-mobile';
import useComponentSize from 'utils/useComponentSize';
import { FormattedMessage } from 'react-intl';
import useOrders from 'data/use-orders';
import ErrorMessage from 'components/error-message/error-message';
import { CURRENCY } from 'utils/constant';
import { useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import { Input } from 'components/forms/input';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import { FEEDBACK } from 'endpoints';
import { Button } from 'components/button/button';
import { useCart } from 'contexts/cart/use-cart';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { CubeGrid } from 'styled-loaders-react';


const progressData = ['Order Received', 'Order On The Way', 'Order Delivered'];

// interface FormValues {
//   id?: number | null;
//   name?: string;
//   info?: string;
//   pincode?: string;
//   phonenumber?: string;
// }

const orderTableColumns = [
  {
    title: <FormattedMessage id='cartItems' defaultMessage='Items' />,
    dataIndex: '',
    key: 'items',
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.image} alt={record.title} />
          </ImageWrapper>

          <ItemDetails>
            <ItemName>{record.title}</ItemName>
            <ItemSize>{record.weight}</ItemSize>
            <ItemPrice>{CURRENCY}{record.price}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id='intlTableColTitle2' defaultMessage='Quantity' />
    ),
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
    width: 100,
  },
  {
    title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price' />,
    dataIndex: '',
    key: 'price',
    align: 'right',
    width: 100,
    render: (text, record) => {
    return <p>{CURRENCY}{record.total}</p>;
    },
  },
];

const OrdersContent: React.FC<{}> = () => {
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
  const { data, error, status } = useOrders();
  const [selection, setSelection] = useState(null);
  const intl = useIntl();
  const [rating, setRating] = React.useState(0);
  const [comments, setComments] = React.useState('');
  const [ selected, setSelected] = useState("");
  const [message, setMessage] = useState(false);
  const cookies = new Cookies();
  const {clearCart, items} = useCart();
  let order_status = cookies.get("status")
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    if (data){
      setLoading(false);
    }
    if (data?.length) {
      setSelection(data[0]);
    }
  }, [data?.length]);

  const changeRating = async ( newRating, name ) => {
    setRating(newRating)
  };
  
  const handleSave = async () => {
  const config = {
    headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
  };

  let payload = { "rating": `${rating}`, "comments": `${comments}` }

  const feedback = [
    axios.post(FEEDBACK, payload, config)
      .then(response =>{
        setMessage(true)
         console.log('feedback is save'+response)
        })
      .catch(err => {
        //TODO display a error message 
        console.error("Error occured while saving address");
        if (err.response) {
          // client received an error response (5xx, 4xx)
        } else if (err.request) {
          // client never received a response, or request never left
        } else {
          // anything else  
        }
        })
      ]
    };  

  if (error) return <ErrorMessage message={error} />;
  if (!data) return <CubeGrid color="#009E7F" size="60px"/>;

  return (
    (loading===true) ? <CubeGrid color="#009E7F" size="60px"/> :
    <div>
      <Row> 
        <OrderBox>
          <Col>
            <DesktopView>
              <OrderListWrapper style={{ height: size.height }}>
                <Title style={{ padding: '0 20px' }}>
                  <FormattedMessage
                    id='intlOrderPageTitle'
                    defaultMessage='My Order'
                  />
                </Title>

                <Scrollbar className='order-scrollbar'>
                  <OrderList>
                    {data.length !== 0 ? (
                      data.map((current: any) => (
                        <OrderCard
                          key={current.id}
                          orderId={current.id}
                          className={current.id === selection?.id ? 'active' : ''}
                          status={progressData[current.status - 1]}
                          date={current.date}
                          deliveryTime={current.deliveryTime}
                          amount={current.amount}
                          onClick={() => setSelection(current)}
                        />
                      ))
                    ) : (
                      <NoOrderFound>
                        <FormattedMessage
                          id='intlNoOrderFound'
                          defaultMessage='No order found'
                        />
                      </NoOrderFound>
                    )}
                  </OrderList>
                </Scrollbar>
              </OrderListWrapper>
              <OrderDetailsWrapper ref={targetRef}>
                <Title style={{ padding: '0 20px' }}>
                  <FormattedMessage
                    id='orderDetailsText'
                    defaultMessage='Order Details'
                  />
                </Title>
                {selection && (
                  <OrderDetails
                    progressStatus={selection.status}
                    progressData={progressData}
                    address={selection.deliveryAddress}
                    subtotal={selection.subtotal}
                    discount={selection.discount}
                    deliveryFee={selection.deliveryFee}
                    grandTotal={selection.amount}
                    tableData={selection.products}
                    columns={orderTableColumns}
                  />
                )}
              </OrderDetailsWrapper>
            </DesktopView>

            <MobileView>
              <OrderList>
                <OrderCardMobile
                  orders={data}
                  // className={order && order.id === active ? 'active' : ''}
                  progressData={progressData}
                  columns={orderTableColumns}
                  onClick={setSelection}
                />
              </OrderList>
            </MobileView>
          </Col>
          <Col>
          {message == false ? 
            <FeedbackWrapper>
              <Title style={{ padding: '0 20px' }}>
                <FormattedMessage
                  id='intlfeedbackPageTitle'
                  defaultMessage='Feedback'
                />
              </Title>
              <div>Rating</div>
                <StarRatings
                  rating={rating}
                  starRatedColor="#009E7F"
                  starHoverColor="#009E7F"
                  changeRating={(e) => setRating(e)}
                  numberOfStars={5}
                  name='rating'
                  starDimension={30}
                />
              <div>Comments</div>
              <Input
                type='text'
                placeholder={intl.formatMessage({
                  id: 'comments',
                  defaultMessage: 'comments',
                })}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
                height='48px'
                backgroundColor='#F7F7F7'
                mb='10px'
              />
              <Button size='medium' style={{ width: '50%' }} onClick={handleSave}>
                <FormattedMessage id='feedbackSaveBtn' defaultMessage='Submit' />
              </Button>
            </FeedbackWrapper> : <FeedbackMessage>
            <FormattedMessage
              id='feedbackReceived'
            />
            <br />
            <FormattedMessage
              id='feedbackReceivedShopping'
            />
              {/* <h5> Thanks for your valuable Feedback,<br></br> Keep shopping with us.</h5> */}
            </FeedbackMessage>
          }
          </Col>
      </OrderBox>
    </Row>
    </div>
  );
};

export default OrdersContent;
