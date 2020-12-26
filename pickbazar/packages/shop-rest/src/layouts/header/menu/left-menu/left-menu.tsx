import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import Logo from 'layouts/logo/logo';
import NavLink from 'components/nav-link/nav-link';
import { HOMEOPATHY_PAGE_ITEM, AYURVEDA_PAGE_ITEM} from 'site-settings/site-navigation';
import { MenuDown } from 'assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS, CATEGORY_MENU_HOMEOITEMS } from 'site-settings/site-navigation';
import * as categoryMenuIcons from 'assets/icons/category-menu-icons';
import {
  MainMenu,
  MenuItem,
  IconWrapper,
  SelectedItem,
  Icon,
  Arrow,
  LeftMenuBox,
} from './left-menu.style';
import { CATEGORIES } from 'endpoints';
import axios from 'axios'
import PropTypes from 'prop-types';
import useSWR from 'swr';

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>{name}</p>;
};

const CategoryMenu = (props: any) => {
  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push('/[type]', `${item.href}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <IconWrapper>
            <CategoryIcon name={item.icon} />
          </IconWrapper>
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      ))}
    </div>
  );
};
  const CategoryMenu1 = (props: any) => {
    const handleOnClick = (item) => {
      if (item.dynamic) {
        Router.push('/[type]', `${item.href}`);
        props.onClick(item);
        return;
      }
      Router.push(`${item.href}`);
      props.onClick(item);
    };
return (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    {CATEGORY_MENU_HOMEOITEMS.map((item) => (
      <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
        <IconWrapper>
          <CategoryIcon name={item.icon} />
        </IconWrapper>
        <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
      </MenuItem>
    ))}
  </div>
);
};

type Props = {
  logo: string;
};
const fetcher = (args) => fetch(args).then((res) => res.json())
export const LeftMenu: React.FC<Props> = ({ logo }) => {
  
  const router = useRouter();
  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );
  const router1 = useRouter();
  const initialMenu1 = CATEGORY_MENU_HOMEOITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu1, setActiveMenu1] = React.useState(
    initialMenu1 ?? CATEGORY_MENU_HOMEOITEMS[0]
  );

  return (
    <LeftMenuBox>
      <Logo
        imageUrl={logo}
        alt={'Shop Logo'}
      />
      <NavLink
        className="menu-item"
        href={AYURVEDA_PAGE_ITEM.href}
        label={AYURVEDA_PAGE_ITEM.defaultMessage}
        intlId={AYURVEDA_PAGE_ITEM.id}
      >
        </NavLink>
       <NavLink
        className="menu-item"
        href={HOMEOPATHY_PAGE_ITEM.href}
        label={HOMEOPATHY_PAGE_ITEM.defaultMessage}
        intlId={HOMEOPATHY_PAGE_ITEM.id}
      />
      <MainMenu>
        </MainMenu>
    </LeftMenuBox>
  );
};
