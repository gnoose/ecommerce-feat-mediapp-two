import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import Carousel from 'components/carousel/carouselbanner';

interface Props {
  data: any[] | undefined;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
}

SwiperCore.use([Navigation]);

const Banner = ({ data, deviceType }: Props) => {
  return (
    <Swiper
      id='banner'
      slidesPerView={1}
      loop={true}
      navigation={{
        nextEl: '.banner-slider-next',
        prevEl: '.banner-slider-prev',
      }}
    >
      <Carousel 
        deviceType={deviceType}
        data={data} 
        autoPlay={true}
      />
    </Swiper>
  );
};
export default Banner;
