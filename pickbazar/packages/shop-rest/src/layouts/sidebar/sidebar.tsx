import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import Sticky from 'react-stickynode';
import { Scrollbar } from 'components/scrollbar/scrollbar';
import { useLocale } from 'contexts/language/language.provider';
import { useAppState } from 'contexts/app/app.provider';
import {
  SidebarMobileLoader,
  SidebarLoader,
} from 'components/placeholder/placeholder';
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
} from './sidebar.style';
import { CATEGORIES, CATEGORIESTYPE } from 'endpoints';
import useSWR from 'swr';
import { TreeMenu } from 'components/tree-menu/tree-menu';
import { REQUEST_MEDICINE_MENU_ITEM } from 'site-settings/site-navigation';
import ErrorMessage from 'components/error-message/error-message';
import axios from 'axios';

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};
const categoryfetcher = (args) => fetch(args).then((res) => res.json())
const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
}) => {
  const router = useRouter();
  const { pathname, query } = router;
  const selectedQueries = query.category;
  const [data, setData] = useState(null);
  const [ error, setIsError] = useState(null);
  let homeo = [];
  let ayurveda = [];
  let children_ayurveda = [];
  let categories = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await useSWR((selectedQueries=='ayurveda' || selectedQueries=='homeo') ?
        `${CATEGORIESTYPE}\?type=${selectedQueries}` : CATEGORIES, categoryfetcher )
        setData(data);
      }
      catch (error){
        setIsError(error);
      }
    }
    fetchData();
  }, [`${CATEGORIESTYPE}\?type=${selectedQueries}`, CATEGORIES])
  if(data && data.results){
    categories = data.results;
    for (let row in categories){
      for(let row1 in categories[row].children){
        let duplicate = children_ayurveda.find((element) => element.title === categories[row].children[row1].title)
          if (!duplicate){
          children_ayurveda.push(categories[row].children[row1])
          }
        }
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
  if (selectedQueries == 'children_ayurveda') {
    children_ayurveda = [];
  }

  const { isRtl } = useLocale();

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
  const isSidebarSticky = useAppState('isSidebarSticky');

  if (!categories) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <SidebarWrapper>
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
          <TreeMenu
            data={categories}
            onClick={onCategoryClick}
            active={selectedQueries}
          />
        </SidebarWrapper>
      </PopoverWrapper>
      <SidebarWrapper style={{ paddingTop: type === 'medicine' ? 0 : 0}}>
        <Sticky enabled={isSidebarSticky} top={type === 'medicine' ? 0 : 0}>
          <div>
            <h6> Search by Ailment </h6>
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
          <Scrollbar className='sidebar-scrollbar'>
            <TreeMenu
              data={children_ayurveda}
              onClick={onCategoryClick}
              active={selectedQueries}
            />
          </Scrollbar>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};
export default SidebarCategory;