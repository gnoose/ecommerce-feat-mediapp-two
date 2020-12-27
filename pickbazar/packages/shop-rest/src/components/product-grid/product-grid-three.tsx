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
import { string } from 'yup';

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
  isLandingPage?: boolean;
}

const FilterDiv = styled.div({
  width: '230px',
  zIndex: 9,
  position:'absolute',
  background: '#fff',
  color: '#505050',
});
const FilterSection = styled.div({
  borderBottom: '1px solid #F4F4F4',
  padding: '15px',
  h2: {
    fontSize: '18px',
    fontWeight: 400,
    margin: 0,
  }
});

const FilterSectionBar = styled.div({
  marginBottom: '8px',
  paddingLeft: '20px',
  span: {
    fontSize: '14px',
    fontWeight: 800,
    maxWidth: '84%',
  },
});

const FilterSectionItem = styled.div({
  marginBottom: '5px',
  paddingLeft: '30px',
  span: {
    fontSize: '12px',
    fontWeight: 400,
    maxWidth: '84%',
    '&:hover': {
      fontWeight: 800,
      cursor: 'pointer',
    },
  },
  label: {
    fontSize: '12px',
    fontWeight: 400,
    maxWidth: '84%',
    '&:hover': {
      fontWeight: 800,
      cursor: 'pointer',
    },
  }
});



const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-100);

export const ProductGrid = ({
  style,
  type,
  loadMore = true,
  fetchLimit = 30,
  isLandingPage = false,
}: Props) => {
  const myRef = useRef(null)
  const executeScroll = () => scrollToRef(myRef)
  const router = useRouter();
  //---------------
  const { pathname, query } = router;
  const selectedQueries = query.category;
  //---------------
  const href = router.pathname;
  const [loading, setLoading] = useState(false);
  const { data, error , hasMore, fetchMore } = useProducts({
    type,
    text: router.query.text,
    category: router.query.category,
    offset: 0,
    limit: fetchLimit,
  });

  let cssList = {
    margin: '0px 20px 0px 20px',
    paddingLeft: '230px',
  };
  if (isLandingPage) {
    cssList.paddingLeft= '0px';
  }


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

  const onCategoryClick = (slug: string) => {
      const { type, ...rest } = query;
      if (type) {
        router.push(
          {
            pathname,
            query: { ...rest, category: slug },
          },
          {
            pathname: `/${type}`,
            query: { ...rest, category: slug },
          }
        );
      } else {
        router.push({
          pathname,
          query: { ...rest, category: slug },
        });
      }
  };

  // @ts-ignore
  return (
    <div ref={myRef}>
      {(loading===true) ? <CubeGrid color="#009E7F" size="60px"/> :
      <>
        {(isLandingPage === true) ? <></> :
          <FilterDiv>
            <FilterSection>
              <h2>Filter By</h2>
            </FilterSection>
            <div>
              <FilterSectionBar><a><span>Shop by Brand</span></a></FilterSectionBar>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('baidyanath')}><span>Baidyanath</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('dabur')}><span>Dabur</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('sbl')}><span>Sbl</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('zandu')}><span>Zandu</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('schwabe')}><span>Schwabe</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('himalaya')}><span>Himalaya</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('baksons')}><span>Baksons</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('bio-force')}><span>Bio-Force</span></a></FilterSectionItem>
            </div>
            <div>
              <FilterSectionBar><a><span>Shop by Health Conditions</span></a></FilterSectionBar>
              <FilterSectionItem><a onClick={() => onCategoryClick('anaemia-and-inflammation')}><span>Anaemia And Inflammation</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('cardiac-care')}><span>Cardiac Care</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('fever-anti-bacteria-viral-infection')}><span>Fever , Anti Bacteria, Viral Infection</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('hair-care')}><span>Hair Care</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('immunity-and-stress-care')}><span>Immunity And Stress Care</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('joint-cramps-sprian-muscle-pains')}><span>Joint, Cramps, Sprian , Muscle Pains</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('nasal-care')}><span>Nasal Care</span></a></FilterSectionItem>
              <FilterSectionItem><a onClick={() => onCategoryClick('urinary-and-anus-problems')}><span>Urinary And Anus Problems</span></a></FilterSectionItem>
              <FilterSectionItem><a
                onClick={() => onCategoryClick('skin-and-beauty-care')}><span>Skin And Beauty Care</span></a></FilterSectionItem>

            </div>
            <div>
              <FilterSectionBar><a><span>Price</span></a></FilterSectionBar>
              <FilterSectionItem><label><input type={"checkbox"}/>Below 200</label></FilterSectionItem>
              <FilterSectionItem><label><input type={"checkbox"}/>201 - 500</label></FilterSectionItem>
              <FilterSectionItem><label><input type={"checkbox"}/>501 - 1000</label></FilterSectionItem>
              <FilterSectionItem><label><input type={"checkbox"}/>Above 1000</label></FilterSectionItem>
            </div>
            <div>
              <button style={{
                background: '#fff',
                padding: '2px 4px',
                color: '#51C9A6',
                borderColor: '#51C9A6',
                marginLeft: '150px',
              }}>View All
              </button>
            </div>
          </FilterDiv>
        }
        <section style={cssList} >
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
