import styled from 'styled-components';
import css from '@styled-system/css';
import { themeGet } from '@styled-system/theme-get';

export const CategoryWrapper = styled.div<any>(
  css({
    padding: ['30px 15px', '30px 15px', '7px'],
  })
);

export const CategoryInner = styled.div<any>({
  position: 'relative',
});

export const ItemCard = styled.div<any>((props) =>
  css({
    textAlign: 'center',
    width: '185px',
    height: '170px',
    borderRadius: 2,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: props.active ? '2px solid' : '2px solid #fff',
    borderColor: props.active ? 'primary.regular' : '#fff',
  })
);
export const ItemCard1 = styled.div<any>((props) =>
  css({
    textAlign: 'center',
    width: '185px',
    height: '40px',
    borderRadius: 6,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: props.active ? '2px solid' : '2px solid #fff',
    borderColor: props.active ? 'primary.regular' : '#fff',
  })
);
 
export const ItemCard2 = styled.div<any>((props) =>
  css({
    textAlign: 'center',
    width: '130px',
    borderRadius: '20px',
    padding: '2px',
    marginLeft: '5px',
    height: '80px', 
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: props.active ? '2px solid' : '2px solid #fff',
    borderColor: props.active ? 'primary.regular' : '#fff',
  })
);

export const ItemCard3 = styled.div<any>((props) =>
  css({
    textAlign: 'center',
    width: '135px',
    borderRadius: '10px',
    padding: '5px',
    marginLeft: '15px',
    height: '140px', 
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    border: props.active ? '2px solid' : '2px solid #fff',
    borderColor: props.active ? 'primary.regular' : '#fff',
  })
);

export const ImageWrapperb = styled.div<any>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 70,
  width: 120,
  position: 'relative',
  overflow: 'hidden',

  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
export const ImageWrappersb = styled.div<any>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 70,
  width: 130,
  position: 'relative',
  overflow: 'hidden',
  marginBottom: 3,

  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '90%',
    maxHeight: '100%',
  },
});

export const ImageWrapper = styled.div<any>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 120,
  width: 200,
  position: 'relative',
  overflow: 'hidden',
  marginBottom: 3,

  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
export const Title = styled.span<any>(
  css({
    fontSize: 'base',
    fontWeight: 'semiBold',
    color: 'text.bold',
    textAlign: 'center',
    padding: '0 0 0',
    display: 'block',
  })
);

export const Divider = styled.div`
  padding: 2px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.base', '15')}px;
    font-weight: ${themeGet('fontWeights.regular', '400')};
    color: ${themeGet('colors.text.bold', '#0D1136')};
    line-height: 1;
    background-color: ${themeGet('colors.white', '#ffffff')};
    z-index: 1;
    position: relative;
    padding: 0 10px;
  }

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${themeGet('colors.black', '#000000')};
    position: absolute;
    top: 50%;
  }
`;
export const SliderNav = styled.button({
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'text.bold',
  backgroundColor: 'white',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',
  outline: 0,
  padding: 0,
  border: 0,
  borderRadius: '50%',
  position: 'absolute',
  top: '50%',
  marginTop: '-15px',
  zIndex: 1,
  cursor: 'pointer',

  svg: {
    width: 18,
    maxHeight: 18,
  },

  '&.swiper-button-disabled': {
    display: 'none',
  },

  '&.banner-slider-prev': {
    left: -15,
  },

  '&.banner-slider-next': {
    right: -15,
  },
});
