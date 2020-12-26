import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import GroceryImgOne from 'assets/images/banner/Authenticlaunchoffer2.jpg';
const Banner = dynamic(() => import('components/banner/banner-two'), {
  ssr: false,
});

const ErrorMessage = dynamic(() =>
  import('components/error-message/error-message')
);
const bannerSlides = [
  {
    img: GroceryImgOne,
    alt: 'Slide One',
  },
];
type GiftCardProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const GiftCardPage: NextPage<GiftCardProps> = ({ deviceType }) => {
  return (
    <>
    <br/><br/><br/><br/><br/>
    <Banner data={bannerSlides} deviceType={deviceType}/>
    </>
  );
};

export default GiftCardPage;
