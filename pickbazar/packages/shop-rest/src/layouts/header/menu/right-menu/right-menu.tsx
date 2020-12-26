import React, { useState,useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import { OFFER_MENU_ITEM, HELP_MENU_ITEM } from 'site-settings/site-navigation';
// import LanguageSwitcher from '../language-switcher/language-switcher';
import { HelpIcon } from 'assets/icons/HelpIcon';
import { RightMenuBox, Title } from './right-menu.style';
import { Cookies } from 'react-cookie';
import { PROFILE, MOBILE } from 'endpoints';
import axios from 'axios';
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  let [fname, setFirstName] = useState('');
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const config = {
      headers: { Authorization: `Bearer  ${cookies.get('access_token')}` }
    };
    if (config.headers.Authorization !== "Bearer  undefined"){
    axios.get(PROFILE, config)
    .then(res => {
      cookies.set('username', res.data.first_name);
      cookies.set('userdata',res.data)
      setFirstName(res.data.first_name);
      setLoading(false);
    })
  }
  };
  return (
    <RightMenuBox>
      <NavLink
        className="menu-item"
        href={OFFER_MENU_ITEM.href}
        label={OFFER_MENU_ITEM.defaultMessage}
        intlId={OFFER_MENU_ITEM.id}
      />
      <NavLink
        className="menu-item"
        href={HELP_MENU_ITEM.href}
        label={HELP_MENU_ITEM.defaultMessage}
        intlId={HELP_MENU_ITEM.id}
        iconClass="menu-icon"
        icon={<HelpIcon />}
      />
      {/* <LanguageSwitcher /> */}

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
       {isAuthenticated===true ?
       <Title>{fname}</Title>
      : '' }
    </RightMenuBox>
  );
};
