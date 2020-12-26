import React, { useState, useRef } from 'react';
import { ProductCard } from 'components/product-card/product-card-seven';
import styled from 'styled-components';
import css from '@styled-system/css';
import ErrorMessage from 'components/error-message/error-message';
import { useRouter } from 'next/router';
import { Button } from 'components/button/loadmore-button';
import { FormattedMessage } from 'react-intl';
import { Box } from 'components/box';
import useProducts from 'data/use-products';
import NoResultFound from 'components/no-result/no-result';
import LogoImage from 'assets/images/MedsmitraFinallogo.png';
import { openModal } from '@redq/reuse-modal';
import { CubeGrid } from 'styled-loaders-react';

const Grid = styled.div(
  css({
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',

    '@media screen and (min-width: 630px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 991px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1200px)': {
      gridTemplateColumns: 'repeat(5, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1700px)': {
      gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))',
    },

    '@media screen and (min-width: 1900px)': {
      gridTemplateColumns: 'repeat(6, minmax(240px, 1fr))',
    },
  })
);

interface Props {
  type: string;
  loadMore?: boolean;
  fetchLimit?: number;
  style?: any;
}

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-100);

export const ProductGrid = ({
  style,
  type,
  loadMore = true,
  fetchLimit = 30,
}: Props) => {
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
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
  if (!data){
    return <CubeGrid color="#009E7F" size="60px"/>;
  }

  if ((data === []) || (data.length === 0)) {
    router.push(href, href, { shallow: true });
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
  }

  const handleLoadMore = async () => {
    setLoading(true);
    await fetchMore(Number(data.length), fetchLimit, hasMore);
    setLoading(false);
  };

  return (
    <div ref={myRef}>
      {(loading===true) ? <CubeGrid color="#009E7F" size="60px"/> :
      <>
      <div style={{width: '230px', zIndex: 9,position:'absolute',background: '#fff', color: '#505050',}}>
        <div style={{borderBottom: '1px solid #F4F4F4', padding: '15px'}}>
          <h2 style={{fontSize: '18px', fontWeight: 400, margin: 0, }}>Filter By</h2>
        </div>
        <div>
          <div style={{marginBottom: '8px', paddingLeft: '20px' }}>
            <a><span style={{fontSize: '14px', fontWeight: 800, maxWidth: '84%', }}>Shop by Brand</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <a><span style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Baidyanath</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <a><span style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Dabur</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <a><span style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Sbl</span></a>
          </div>

        </div>
        <div>
          <div style={{marginBottom: '8px', paddingLeft: '20px' }}>
            <a><span style={{fontSize: '14px', fontWeight: 800, maxWidth: '84%', }}>Shop by Health Conditions</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <a><span style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Anaemia And Inflammation</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <a><span style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Cardiac Care</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <a><span style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Hair Care</span></a>
          </div>

        </div>
        <div>
          <div style={{marginBottom: '8px', paddingLeft: '20px' }}>
            <a><span style={{fontSize: '14px', fontWeight: 800, maxWidth: '84%', }}>Price</span></a>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <input type={"checkbox"} />
            <label style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Below 200</label>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <input type={"checkbox"} />
            <label style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>201 - 500</label>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <input type={"checkbox"} />
            <label style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>501 - 1000</label>
          </div>
          <div style={{marginBottom: '5px', paddingLeft: '30px' }}>
            <input type={"checkbox"} />
            <label style={{fontSize: '12px', fontWeight: 400, maxWidth: '84%', }}>Above 1000</label>
          </div>

        </div>
        <div>
          <button style={{background: '#fff', padding: '2px 4px', color: '#51C9A6', borderColor:'#51C9A6', marginLeft: '150px',}}>View All</button>
        </div>
      </div>

      <section style={{ margin: '0px 20px 0px 20px', paddingLeft: '230px',}}>
        <Grid style={style}>
          {data.map((product) => (
            <ProductCard data={product} key={product.id} />
          ))}
        </Grid>

        {loadMore && hasMore && (
          <Box style={{ textAlign: 'center' }} mt={'2rem'}>
            <Button
              onClick={() => {handleLoadMore(); setTimeout(executeScroll, 1000);}}
              loading={CubeGrid}
              variant="secondary"
              style={{
                fontSize: 14,
                display: 'inline-flex',
              }}
              border="1px solid #f1f1f1"
            >
              <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
            </Button>
          </Box>
        )}
      </section>
      </>
      }
    </div>
  );
};
