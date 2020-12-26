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
}

const PAGE_TYPE = 'furniture';

export const ProductGrid = ({
  style,
  type,
  loadMore = true,
  fetchLimit = 30,
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
  
  return (
    <section>
      {/* <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={type} />
          </SidebarSection> */}
      <Grid style={style}>
        {data.map((product, idx) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </Grid>

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
