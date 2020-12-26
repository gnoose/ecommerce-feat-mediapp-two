import React from 'react';
import Link from 'next/link';
import { AddItemToCart } from 'components/add-item-to-cart';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from 'components/box';
import { ItemCard1 } from '../../layouts/horizontal-category-menu/horizontal-category-card-menu.style';

const Card = styled.div({
  backgroundColor: '#fff',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 6,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '0',
  cursor: 'pointer',
  transition: '0.25s ease-in-out',
  '&:hover': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-5px)',
  },
});

const ImageWrapper = styled.div(
  css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: ['190px', '210px'],

    img: {
      display: 'block',
      maxHeight: '80%',
      maxWidth: '80%',
      width: 'auto',
      height: 'auto',
    },
  })
);

const Image = styled.img({
  maxWidth: '100%',
  maxHeight: '100%',
  height: 'auto',
});

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

const CounterWrapper = styled.div<any>(
  css({
    position: 'absolute',
    zIndex: 1,
    top: '10px',
    right: '10px',
  })
);

const Title = styled.h2({
  marginBottom: 10,
  color: '#999',
  fontSize: 14,
  fontWeight: 'normal',
});

const PriceWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Price = styled.span(
  css({
    color: 'text.bold',
    fontSize: 18,
    fontWeight: 'semiBold',
    lineHeight: 1,
  })
);

const SalePrice = styled.span(
  css({
    color: 'text.regular',
    fontSize: 15,
    lineHeight: 1,
    fontWeight: 'regular',
    padding: '0 5px',
    overflow: 'hidden',
    position: 'relative',
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',

    ':before': {
      content: '""',
      width: '100%',
      height: 1,
      display: 'inline-block',
      backgroundColor: 'text.regular',
      position: 'absolute',
      top: '50%',
      left: 0,
    },
  })
);

interface Props {
  data: any;
}

export const ProductCard = ({ data }: Props) => {
  const { title, image, price, salePrice, slug, discountInPercent, id , url} = data;
  const slugup = slug+":"+id;
  return (
    <Link href={{
      pathname: '/products/[slug]',
      query: { slug: slug, url: url},
      }}>
      <Card>
        <ImageWrapper>
          <Image src={image} alt={title} />
        </ImageWrapper>

        <Box px={20} pb={20}>
          <Title>{title}</Title>
          {/*<span className={'yellow-star'} style={{width: '59.181818%'}} data-reactid={"170"}></span>*/}
          <PriceWrapper>
            <Price>₹{salePrice ? salePrice : price}</Price>
            {discountInPercent ? <SalePrice>₹{price}</SalePrice> : null}
            {discountInPercent ? (
              <Discount>{discountInPercent}% OFF</Discount>
            ) : null}
          </PriceWrapper>
          <ItemCard1>
            <AddItemToCart data={data} variant="full" buttonText="Add" />
          </ItemCard1>
        </Box>
      </Card>
    </Link>
  );
};
