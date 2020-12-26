import React from 'react';
import { useRouter } from 'next/router';
import ErrorMessage from 'components/error-message/error-message';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AddItemToCart } from 'components/add-item-to-cart';
import Image from 'components/image/image';
import { ArrowNext } from 'assets/icons/ArrowNext';
import { ArrowPrev } from 'assets/icons/ArrowPrev';
import css from '@styled-system/css';
import styled from 'styled-components';
import {
  CategoryContainer,
  CategoryHeader,
  CategoryWrapper,
  CategoryInner,
  SliderNav,
  Divider,
  ItemCard,
  ItemCard1,
  ItemCard2,
  ItemCard3,
  ImageWrapper,
  ImageWrapperb,
  ImageWrappersb,
  Title,
} from './horizontal-category-brand-menu.style';
import useCategory from 'data/use-category';

SwiperCore.use([Navigation]);

interface Props {
  type: string;
  url:string;
}

const Discount = styled.div(
  css({
    position: 'absolute',
    top: '0rem',
    left: '0rem',
    backgroundColor: 'primary.regular',
    color: '#fff',
    overflow: 'hidden',
    padding: '0.25rem 0.5rem',
    fontSize: 10.5,
    borderRadius: 6,
    pointerEvents: 'none',
  })
);

export const HorizontalCategoryBrandMenu = ({ type , url}: Props) => {
  const router = useRouter();
  const option = url;
  const { pathname, query } = router;
  const selectedQueries = query.category;

  const { data, error } = useCategory({ type , option, selectedQueries});

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;
  let product_name = "Best Selling Products";
  if (option === 'bestoffers') {
    product_name = "Best offers";
  } 
  else if (option === 'discount'){
    product_name = "Top Trending";
  }
  else if (option === 'search by brand')
  {
    product_name = "Shop by Brand"
  }
  else if (option === 'search by health conditions')
  {
    product_name = "Shop by Health Conditions"
  }
   

  const onCategoryClick = (slug: string) => {
    if(product_name === 'Shop by Brand'|| product_name === 'Shop by Health Conditions')
    {
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
  } else {
    slug = slug.replace(/ /g, '-')
    const path = `/products/${slug}`
    router.push(path);
  }
  };

  const breakpoints_almt = {
    320: {
      slidesPerView: 2,
    },

    520: {
      slidesPerView: 4,
    },

    620: {
      slidesPerView: 5,
    },

    820: {
      slidesPerView: 6,
    },

    1100: {
      slidesPerView: 7,
    },

    1280: {
      slidesPerView: 9,
    },
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
  const breakpoints_sb = {
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
      slidesPerView: 8,
    },
  };

  return (
    <CategoryContainer>
      <CategoryWrapper>
        <CategoryHeader>
          <h2>{ product_name }</h2>
        </CategoryHeader>
        <CategoryInner>
        {product_name === 'Shop by Health Conditions' ?
        (<Swiper
            id="category-card-menu"
            navigation={{
              nextEl: '.banner-slider-next', 
              prevEl: '.banner-slider-prev',
            }}
            breakpoints={breakpoints_almt}
            spaceBetween={10} 
          >
            {data.map((category, idx) => (
              <SwiperSlide key={idx}>
                <ItemCard3
                  role="button"
                  onClick={() => onCategoryClick(category.slug)}
                  active={selectedQueries === category.slug}
                >
                  <ImageWrapperb>
                    <Image url={category.image} alt={category.title} />
                  </ImageWrapperb>
                  <Title>{category.title}</Title>
                </ItemCard3> 
              </SwiperSlide>
              ))}
            </Swiper>)
          : product_name === 'Shop by Brand' ? (
          <Swiper
            id="category-card-menu"
            navigation={{
              nextEl: '.banner-slider-next', 
              prevEl: '.banner-slider-prev',
            }}
            breakpoints={breakpoints_sb}
            slidesPerView={8.8}
            spaceBetween={0} 
          >
            {data.map((category, idx) => (
              <SwiperSlide key={idx}> 
                <ItemCard2
                  role="button"
                  onClick={() => onCategoryClick(category.slug)}
                  active={selectedQueries === category.slug}
                >
                  <ImageWrappersb>
                    <Image url={category.image} alt={category.title} />
                  </ImageWrappersb>
                </ItemCard2>
              </SwiperSlide>
            ))}
          </Swiper>) :
          (
          <Swiper
            id="category-card-menu"
            navigation={{
              nextEl: '.banner-slider-next', 
              prevEl: '.banner-slider-prev',
            }}
            breakpoints={breakpoints}
            spaceBetween={10} 
          >
            {data.map((category, idx) => (
              <SwiperSlide key={idx}>
                <ItemCard
                role="button"
                onClick={() => onCategoryClick(category.slug)}
                active={selectedQueries === category.slug}
              >
                <ImageWrapper>
                  <AddItemToCart data={category} variant="full" buttonText="Add" />
                  <Image url={category.image} alt={category.title} />
                  {category.discountInPercent ? (
                    <Discount>{category.discountInPercent}% OFF</Discount>
                      ) : null}
                </ImageWrapper>
                <div>
                  <Title>{category.title}</Title>
                </div>
              </ItemCard>
              </SwiperSlide>
            ))}
          </Swiper>)}
          <div>
          <SliderNav className="banner-slider-next">
            <ArrowNext />
          </SliderNav>
          <SliderNav className="banner-slider-prev">
            <ArrowPrev />
          </SliderNav>
          </div> 
        </CategoryInner>
      </CategoryWrapper>
    </CategoryContainer>
  );
};
