import React, { useState, useEffect } from 'react';
import { ProductGrid } from 'components/product-grid/product-grid';
import { Modal } from '@redq/reuse-modal';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useRouter } from 'next/router';
import { SidebarWithCardMenu } from 'layouts/sidebar/sidebar-with-card-menu';
import { BANNERS } from '../endpoints';
import useSWR from 'swr';

const Banner = dynamic(() => import('components/banner/banner-two'), {
  ssr: false,
});

const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

const PAGE_TYPE = 'grocery';
const fetcher = (args) => fetch(args).then((res) => res.json())
export default function GroceryTwoPage({ deviceType }) {
  const router = useRouter();
  let bannerurl = BANNERS;
  if (router.query && router.query.category) {
    bannerurl = bannerurl+"?category="+router.query.category;
  }
  const { data, mutate ,error } = useSWR(bannerurl, fetcher);
  let bannerSlides = [];
  if(data && data.data){
    bannerSlides = data.data;
  }

  return (
    <Modal>
      <ContentArea>
        <SidebarWithCardMenu type={PAGE_TYPE} />
        <main>
        <Banner data={bannerSlides} deviceType={deviceType} />
          <ProductGrid type={PAGE_TYPE} />
        </main>
      </ContentArea>
      <CartPopUp deviceType={deviceType} />
    </Modal>
  );
}

const ContentArea = styled.div<any>(
  css({
    overflow: 'hidden',
    padding: ['68px 0 100px', '68px 0 50px', '110px 2rem 50px'],
    display: 'grid',
    minHeight: '100vh',
    gridColumnGap: '30px',
    gridRowGap: ['15px', '20px', '0'],
    gridTemplateColumns: [
      'minmax(0, 1fr)',
      'minmax(0, 1fr)',
      '300px minmax(0, 1fr)',
    ],
    backgroundColor: '#f9f9f9',
  })
);
