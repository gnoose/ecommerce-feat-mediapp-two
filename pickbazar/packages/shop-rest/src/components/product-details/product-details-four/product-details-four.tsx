import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import { Button } from 'components/button/button';
import {
  ProductPriceValue,
  ProductPriceWrapperDisPercent,
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductDescription,
  ProductDosage,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  Subheading,
  SalePrice,
  ProductCartBtn,
  ImagePart,
  MetaTitle,
  MetaSingle,
  MetaItem,
  RelatedItems,
} from './product-details-four.style';
import { CartIcon } from 'assets/icons/CartIcon';
import ReadMore from 'components/truncate/truncate';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import { ProductGrid } from 'components/product-grid/product-grid';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { BASKET_ADD_PRODUCT, PRODUCTS } from 'endpoints';
import AuthenticationForm from 'features/authentication-form';
import { openModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import styled from 'styled-components';
import css from '@styled-system/css';

type ProductDetailsProps = {
  product: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const cookies = new Cookies();

const Discount = styled.div(
  css({
    // position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: '#51c9a6',
    color: '#fff',
    overflow: 'hidden',
    padding: '0.25rem 0.5rem',
    fontSize: 10.5,
    // borderRadius: 6,
    pointerEvents: 'none',
  })
);

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const data = product;

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    // let product_url = `${PRODUCTS}${data.id}/`
    // let payload = { "url": product_url, "quantity": "1" }
    // if(!cookies.get('access_token')){
    //   console.log("No login found")
    // }
    // else{
    //   const config = {
    //     headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
    //   }
    //   axios.post(BASKET_ADD_PRODUCT, payload,config)
    //   .then(response => console.log(response));
    // }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });
    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: false,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <>
      <ProductDetailsWrapper className='product-card' dir='ltr'>
      <ImagePart>
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        <div style={{marginTop: '-60px',zIndex: 1,position: 'absolute',left: '300px',}}>
          <ProductDescription>
          <ProductCartBtn>
              {!isInCart(data.id) ? (
              <>
              {!isAuthenticated ? (
                <Button
                className='cart-button'
                variant='primary'
                style={{float: 'right'}}
                size='big'
                onClick={handleJoin}
              >
                {/* <CartIcon mr={2} /> */}
                <ButtonText>
                  <FormattedMessage
                    id='addToCartButton'
                    defaultMessage='Add to Cart'
                  />
                </ButtonText>
              </Button>
              ) : (
                <Button
                  className='cart-button'
                  variant='primary'
                  size='big'
                  style={{float: 'right'}}
                  onClick={handleAddClick}
                >
                  {/* <CartIcon mr={2} /> */}
                  <ButtonText>
                    <FormattedMessage
                      id='addToCartButton'
                      defaultMessage='Add to Cart'
                    />
                  </ButtonText>
                </Button>
              )}
               </>
              ) :
              (
                <div style={{float: 'right'}}>
                <Counter
                  value={getItem(data.id).quantity}
                  url={getItem(data.id).url}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                  className='card-counter'
                  variant='altHorizontal'
                />
                </div>
              )}
            </ProductCartBtn>
          </ProductDescription>
        </div>
      </ImagePart>

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductDescription>
          <ProductTitle>{product.title}</ProductTitle>
            <ReadMore character={600}>{product.description}</ReadMore>
            <br/>
            <ProductPriceWrapperDisPercent>
              MRP{product.discountInPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {product.price}
                </SalePrice>
              ) : null}
            </ProductPriceWrapperDisPercent>
          <ProductPriceWrapper>
            <ProductPriceValue>
              {CURRENCY}
              {product.salePrice ? product.salePrice : product.price}
            </ProductPriceValue>
            {product.discountInPercent ? (
              <Discount>{product.discountInPercent}% OFF</Discount>
            ) : null}
          </ProductPriceWrapper>
            <Row>
              <Col>
            <ProductPrice>Weight/Quantity :  </ProductPrice>
            </Col>
            <Col>
            <Subheading>{product.weight}</Subheading>
            </Col>
            </Row>
            <Row>
            <Col>
            <ProductPrice>Dosage :  </ProductPrice>
            </Col>
            <Col>
            <Subheading>{product.dosage}</Subheading>
            </Col>
            </Row>
            <ProductPrice>Disclaimer</ProductPrice>
            <ReadMore character={600}>{product.disclaimer}</ReadMore><br />
            {/* <MetaTitle>Tags:</MetaTitle> */}
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  href={`/${product.type}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  <a>
                    <MetaItem>Tags: {item.title}</MetaItem>
                  </a>
                </Link>
              ))}
            </MetaSingle>
          </ProductDescription>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>
      <RelatedItems>
        <h3>
          <FormattedMessage
            id='intlRelatedItems'
            defaultMessage='Related Items'
          />
        </h3>

        <ProductGrid
          type={product["categories"][0].name}
          loadMore={false}
          fetchLimit={5}
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        />
      </RelatedItems>
    </>
  );
};

export default ProductDetails;
