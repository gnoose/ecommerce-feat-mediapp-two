import React, { useState } from 'react';
import { ProductCard } from 'components/product-card/product-card-seven';
import styled from 'styled-components';
import css from '@styled-system/css';
import ErrorMessage from 'components/error-message/error-message';
// import { useQuery, NetworkStatus } from '@apollo/client';
// import { GET_PRODUCTS } from 'graphql/query/products.query';
import { useRouter } from 'next/router';
import { Button } from 'components/button/loadmore-button';
import { FormattedMessage } from 'react-intl';
import { Box } from 'components/box';
import useProducts from 'data/use-products';
import NoResultFound from 'components/no-result/no-result';
import LogoImage from 'assets/images/MedsmitraFinallogo.png';
import { openModal } from '@redq/reuse-modal';
import { SidebarWithCardMenu } from 'layouts/sidebar/sidebar-with-card-menu';
import { MainContentArea, ContentSection, SidebarSection, OfferSection } from 'assets/styles/pages.style';
// import { Button } from './button';
import dynamic from 'next/dynamic';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  CategoryInner, ImageWrapper, ItemCard, ItemCard1,
  SliderNav, Title,
} from '../../layouts/horizontalCategoryBrandMenu/horizontal-category-brand-menu.style';
import { ArrowNext } from '../../assets/icons/ArrowNext';
import { ArrowPrev } from '../../assets/icons/ArrowPrev';
import Image from '../image/image';
import { AddItemToCart } from '../add-item-to-cart';

const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));

const Grid = styled.div(
  css({
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(1, minmax(180px, 1fr))',

    '@media screen and (min-width: 480px)': {
      gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 740px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 991px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1200px)': {
      gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1400px)': {
      gridTemplateColumns: 'repeat(6, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1700px)': {
      gridTemplateColumns: 'repeat(7, minmax(180px, 1fr))',
    },
  })
);
interface Props {
  type: string;
  loadMore?: boolean;
  fetchLimit?: number;
  style?: any;
  isRelated?: boolean;
}

const PAGE_TYPE = 'furniture';

export const ProductGrid = ({
  style,
  type,
  loadMore = true,
  fetchLimit = 30,
  isRelated = false,
}: Props) => {
  const router = useRouter();
  const href = router.pathname;
  const [loading, setLoading] = useState(false);
  const { data, error , hasMore, fetchMore } = useProducts({
    type,
    text: router.query.text,
    category: router.query.category,
    offset: 0,
    limit: fetchLimit,
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <div><img src={LogoImage}></img></div>;

  if ((data === []) || (data.length === 0)) {
    router.push(href, href, { shallow: true });
   // return <NoResultFound />;
   openModal({
    show: true,
    overlayClassName: 'quick-view-overlay',
    closeOnClickOutside: false,
    component: NoResultFound,
    closeComponent: '',
    config: {
      enableResizing: false,
      disableDragging: true,
      className: 'quick-view-modal',
      width: 458,
      height: 'auto',
    },
  });

  return <></>;
  }

  const handleLoadMore = async () => {
    setLoading(true);
    await fetchMore(Number(data.length), fetchLimit, hasMore);
    setLoading(false);
  };
  const breakpoints = {
    320: {
      slidesPerView: 2,
    },

    520: {
      slidesPerView: 3,
    },

    620: {
      slidesPerView: 4,
    },

    820: {
      slidesPerView: 5,
    },

    1100: {
      slidesPerView: 6,
    },

    1280: {
      slidesPerView: 7,
    },
  };
  return (
    <section>
      {/* <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={type} />
          </SidebarSection> */}

        {(!isRelated) ?
          <Grid style={style}>
            {data.map((product, idx) => (
              <ProductCard data={product} key={product.id} />
            ))}
          </Grid>
          :
          (<CategoryInner>
            <Swiper
            id="category-card-menu"
            navigation={{
              nextEl: '.banner-slider-next',
              prevEl: '.banner-slider-prev',
            }}
            slidesPerView={6}
            spaceBetween={10}
          >
            {data.map((product, idx) => (
              <SwiperSlide key={idx} >
                <ProductCard data={product} key={product.id} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div>
            <SliderNav className="banner-slider-next">
              <ArrowNext />
            </SliderNav>
            <SliderNav className="banner-slider-prev">
              <ArrowPrev />
            </SliderNav>
          </div>
            </CategoryInner>
          )
        }

      {loadMore && hasMore && (
        <Box style={{ textAlign: 'center' }} mt={'2rem'}>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant='secondary'
            style={{
              fontSize: 14,
              display: 'inline-flex',
            }}
            border='1px solid #f1f1f1'
          >
            <FormattedMessage id='loadMoreButton' defaultMessage='Load More' />
          </Button>
        </Box>
      )}
    </section>
  );
};
