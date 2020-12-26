import React , {useEffect} from 'react';
import Router, { useRouter } from 'next/router';
import { openModal,closeModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
import LogoImage from 'assets/images/MedsmitraFinallogo.png';
import UserImage from 'assets/images/user.jpg';
import { isCategoryPage } from '../is-home-page';
import Search from 'features/search/search';
import cookies from 'next-cookies';
import { Cookies } from 'react-cookie';
import { useCart } from 'contexts/cart/use-cart';
import { PROFILE } from 'endpoints';
import axios from 'axios';
type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  console.log(RightMenu)
  const cookie = new Cookies();
  const {clearCart} = useCart();
  const [user, setUser] = React.useState('');
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  const { pathname, query } = useRouter();
  useEffect(() => {
    profileCall();
  }, []);
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      clearCart();
      setUser('');
      cookie.remove('access_token');
      cookie.remove('username');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };
  const profileCall = () => {
     const config = {
      headers: { Authorization: `Bearer  ${cookie.get('access_token')}` }
    };
    if (config.headers.Authorization !== "Bearer undefined" && !user){
      let username = cookie.get('username')
      if(username){
        setUser(username.charAt(0).toUpperCase() + username.slice(1));
      }
    }
  }
  const CloseComponent = () => {
    return <button onClick={() => closeModal()}>close </button>;
  };
  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });
    openModal({

      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: false,
      component: AuthenticationForm,
      closeComponent: CloseComponent,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };
  const showSearch =
    isCategoryPage(query.type)
    pathname === '/shop' ||
    pathname === '/offer' ||
    pathname === '/help'
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu logo={LogoImage} />
      <Search minimal={true} className="headerSearch" />
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
