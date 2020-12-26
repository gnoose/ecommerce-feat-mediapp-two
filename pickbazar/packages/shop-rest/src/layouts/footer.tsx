import styled from 'styled-components';
import css from '@styled-system/css';
import { FormattedMessage } from 'react-intl';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import NavLink from 'components/nav-link/nav-link';
import {
  TERMS_PAGE,
  ABOUTUS_PAGE,
  POLICY_PAGE,
  CONTACTUS_PAGE,
  PRODUCT_AND_SERVICES_PAGE,
  REFUND_PAGE,
  SHIPPING_AND_DELIVERY_PAGE,
  PRICING_POLICY_PAGE,
  REGISTERED_BUSINESS_NAME_PAGE }
  from 'site-settings/site-navigation';

const Box = styled.div(
  css({
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: 'repeat(1, minmax(180px, 1fr))',

    '@media screen and (min-width: 440px)': {
      gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
    },

    fontFamily: 'body',
    fontSize: 'l',
    fontWeight: 'regular',
    color: 'white',
    px: 10,
    width: '90%',
    border: '10px',
    border_radius: '10px',
    margin: 10,
    background: 'url(https://static.oxinis.com/healthmug/css/image/medical-bg.png) top center #0B7670',
    borderTop: '3px solid #51C9A6',
    padding: '20px 0px 40px',

    a: {
      display: 'grid',
      gridGap: '10px',
      gridTemplateColumns: 'repeat(1, minmax(180px, 1fr))',

      content: '\a',
      white_space: 'pre',
      padding: '3px 0',
      color: '#85E0AE',
      fontSize: '15px',
      fontWeight: '500',
    },

    h3: {
      fontSize: '18px',
      fontWeight: '500',
      margin: '0 0 2px',
      color: '#fff',
    }
  }),
  
  {
    marginTop: 30,
    marginBottom: 0.5,
    width: '99%',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    position: 'relative',
  },
);
const Footer = () => {
  return (
    <Box>
      <Grid>
        <Row style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          <Col>
            <h3>About</h3>
            <NavLink
              className="menu-item"
              href={ABOUTUS_PAGE.href}
              label={ABOUTUS_PAGE.defaultMessage}
              intlId={ABOUTUS_PAGE.id}
            />
            <NavLink
              className="menu-item"
              href={CONTACTUS_PAGE.href}
              label={CONTACTUS_PAGE.defaultMessage}
              intlId={CONTACTUS_PAGE.id}
            />
            <NavLink
              className="menu-item"
              href={PRODUCT_AND_SERVICES_PAGE.href}
              label={PRODUCT_AND_SERVICES_PAGE.defaultMessage}
              intlId={PRODUCT_AND_SERVICES_PAGE.id}
            />
          </Col>
          <Col>
            <h5>Policy</h5>
            <NavLink
              className="menu-item"
              href={REFUND_PAGE.href}
              label={REFUND_PAGE.defaultMessage}
              intlId={REFUND_PAGE.id}
            />
            <NavLink
              className="menu-item"
              href={SHIPPING_AND_DELIVERY_PAGE.href}
              label={SHIPPING_AND_DELIVERY_PAGE.defaultMessage}
              intlId={SHIPPING_AND_DELIVERY_PAGE.id}
            />
            <NavLink
              className="menu-item"
              href={PRICING_POLICY_PAGE.href}
              label={PRICING_POLICY_PAGE.defaultMessage}
              intlId={PRICING_POLICY_PAGE.id}
            />
          </Col>
          <Col>
            <h5>Help</h5>
            <NavLink
              className="menu-item"
              href={POLICY_PAGE.href}
              label={POLICY_PAGE.defaultMessage}
              intlId={POLICY_PAGE.id}
            />
            <NavLink
              className="menu-item"
              href={TERMS_PAGE.href}
              label={TERMS_PAGE.defaultMessage}
              intlId={TERMS_PAGE.id}
            />
            <NavLink
              className="menu-item"
              href={REGISTERED_BUSINESS_NAME_PAGE.href}
              label={REGISTERED_BUSINESS_NAME_PAGE.defaultMessage}
              intlId={REGISTERED_BUSINESS_NAME_PAGE.id}
            />
          </Col>
        </Row>
      </Grid>
      {/* <Grid /> */}
      {/* <FormattedMessage
        id='siteFooter'
        defaultMessage='Powered by ClusterIT Solutions'
      /> */}
    </Box>
  );
};
export default Footer;
