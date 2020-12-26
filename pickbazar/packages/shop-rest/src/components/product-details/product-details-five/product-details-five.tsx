import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'components/button/button';
import {
  ProductPriceWrapperDisPercent,
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaTitle,
  MetaSingle,
  MetaItem,
  RelatedItems,
} from './product-details-five.style';
import { CartIcon } from 'assets/icons/CartIcon';
import ReadMore from 'components/truncate/truncate';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import { CURRENCY } from 'utils/constant';
import { FormattedMessage } from 'react-intl';
import { useLocale } from 'contexts/language/language.provider';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from 'components/counter/counter';
import { ProductGrid } from 'components/product-grid/product-grid-two';
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

  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <>
      <ProductDetailsWrapper className='product-card' dir='ltr'>
        {!isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? 'rtl' : 'ltr'}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.title}</ProductTitle>
          </ProductTitlePriceWrapper>


          <ProductPriceWrapperDisPercent>
            MRP{product.discountInPercent ? (
            <SalePrice>
              {CURRENCY}
              {product.price}
            </SalePrice>
          ) : null}
          </ProductPriceWrapperDisPercent>
          <ProductPriceWrapper>
            <ProductPrice>
              {CURRENCY}
              {product.salePrice ? product.salePrice : product.price}
            </ProductPrice>
            {product.discountInPercent ? (
              <Discount>{product.discountInPercent}% OFF</Discount>
            ) : null}
          </ProductPriceWrapper>

          <ProductDescription>
            <ReadMore character={600}>{product.description}</ReadMore>
          </ProductDescription>

          <ProductCartWrapper>
            <ProductCartBtn>
              {!isInCart(data.id) ? (
                <Button
                  className='cart-button'
                  variant='primary'
                  size='big'
                  onClick={handleAddClick}
                >
                  <CartIcon mr={2} />
                  <ButtonText>
                    <FormattedMessage
                      id='addToCartButton'
                      defaultMessage='Add to cart'
                    />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={getItem(data.id).quantity}
                  url={getItem(data.id).url}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                  className='card-counter'
                  variant='altHorizontal'
                />
              )}
            </ProductCartBtn>
          </ProductCartWrapper>

          <ProductMeta>
            <MetaTitle>Tags:</MetaTitle>
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  href={`/${product.type.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  <a>
                    <MetaItem>{item.title}</MetaItem>
                  </a>
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta>
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
        <h2>
          <FormattedMessage
            id='intlRelatedItems'
            defaultMessage='Related Items'
          />
        </h2>

        <ProductGrid
          type={product.type.toLowerCase()}
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
