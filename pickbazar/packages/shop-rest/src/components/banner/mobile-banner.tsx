import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import {
  Box,
  Image,
  Content,
  Title,
  ContentRow,
  Description,
  SearchWrapper,
} from './banner.style';
import dynamic from 'next/dynamic';
import { Waypoint } from 'react-waypoint';
import { Button } from 'components/button/button';
import { useAppDispatch } from 'contexts/app/app.provider';
import Search from 'features/search/search';
import CategoryWalker from 'components/category-walker/category-walker';
import { REQUEST_MEDICINE_MENU_ITEM } from 'site-settings/site-navigation';
import { RequestMedicine } from 'layouts/sidebar/sidebar.style';
import Link from 'next/link';
import useSWR from 'swr';
import { CATEGORIES , CATEGORIESTYPE } from 'endpoints';
import { ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import { TreeMenu } from 'components/tree-menu/tree-menu';
import { Scrollbar } from 'components/scrollbar/scrollbar';
const CategoryIconNav = dynamic(() => import('components/type-nav/type-nav'));
const SpringModal = dynamic(() =>
  import('components/spring-modal/spring-modal')
);

interface Props {
  intlTitleId: string;
  type?: string;
}
const categoryfetcher = (args) => fetch(args).then((res) => res.json())
export const MobileBanner: React.FC<Props> = ({ type, intlTitleId }) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [data, setData] = useState(null);
  const [ error, setIsError] = useState(null);
  const router = useRouter();
  const { pathname, query } = router;
  const selectedQueries = query.category;
  let homeo = [];
  let ayurveda = [];
  let categories = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios((selectedQueries=='ayurveda' || selectedQueries=='homeo') ?
        `${CATEGORIESTYPE}\?type=${selectedQueries}` : CATEGORIES);
        setData(data);
      }
      catch (error){
        setIsError(error);
      }
    }
    fetchData();
  }, [CATEGORIES])
  if(data && data.results){
    categories = data.results;
    for (let row in categories){
      if (categories[row].type === "ayurveda") {
        ayurveda.push(categories[row])
      } else {
        homeo.push(categories[row])
      }
    }
  }

  if (selectedQueries == 'ayurveda') {
    homeo = [];
  }

  if (selectedQueries == 'homeo') {
    ayurveda = [];
  }
  
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
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === 'above') {
      setSticky();
    }
  };
  return (
    <Box display={['flex', 'flex', 'none']}>
      <Content>
        <SearchWrapper>
          <Search minimal={true} />
        </SearchWrapper>
          <br />
        {/* <CategoryWalker>
        <div>
          <h6> Search by Brand and Ailment </h6>
          {type === 'medicine' && (
            <Link href={REQUEST_MEDICINE_MENU_ITEM.href}>
              <RequestMedicine>
                <FormattedMessage
                  id={REQUEST_MEDICINE_MENU_ITEM.id}
                  defaultMessage={REQUEST_MEDICINE_MENU_ITEM.defaultMessage}
                />
              </RequestMedicine>
            </Link>
          )}
          </div>
          {(ayurveda.length != 0) ?
              <h6><b> Ayurveda </b></h6> : null}
          <Scrollbar className='sidebar-scrollbar'>
            <TreeMenu
              data={ayurveda}
              onClick={onCategoryClick}
              active={selectedQueries}
            />
          </Scrollbar>
          {(homeo.length != 0) ?
              <h6><b> Homeo </b></h6> : null}
            <Scrollbar className='sidebar-scrollbar'>
              <TreeMenu
                data={homeo}
                onClick={onCategoryClick}
                active={selectedQueries}
              />
            </Scrollbar>
        </CategoryWalker> */}

        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <CategoryIconNav />
      </SpringModal>
    </Box>
  );
};
