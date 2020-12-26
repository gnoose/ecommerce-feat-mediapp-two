import React, {useEffect} from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { useAppState } from 'contexts/app/app.provider';
import Header from './header/header';
import Footer from './footer';
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';
const MobileHeader = dynamic(() => import('./header/mobile-header'), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  token,
}) => {
  const { pathname, query } = useRouter();
  const [loadvar, setUser] = React.useState(false);
  // useEffect(() => {
  //   onScroll();
  // }, []);
  const isSticky =
    useAppState('isSticky') ||
    pathname === '/shop' ||
    pathname === '/offer' ||
    pathname === '/help'
  const isHomePage = isCategoryPage(query.type);
  const onScroll = () => {
    setUser(true)
  }

  return (
    <div>
    <LayoutWrapper className={`layoutWrapper ${className}`} onMouseMove={onScroll}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomePage ? 'home' : ''
          } desktop`}
        />

        <Header
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomePage ? 'home' : ''
          }`}
        />
      </Sticky>
      {children}
      {pathname !== '/checkout' && 
      <>
      {loadvar === true ? 
      <Footer/> : ''}
      </>
      }
    </LayoutWrapper>    
    </div>
  );
};

export default Layout;
