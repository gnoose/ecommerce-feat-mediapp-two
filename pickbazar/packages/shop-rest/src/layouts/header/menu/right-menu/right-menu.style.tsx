import styled from 'styled-components';
import css from '@styled-system/css';
import { themeGet } from '@styled-system/theme-get';
export const Title = styled.span<any>(
  css({
    display: 'flex', 
    alignItems: 'center',
     padding: '15px',
      fontWeight: 'bold'
  })
);
export const RightMenuBox = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .menu-icon {
    min-width: 7px;
    margin-right: 3px;
  }

  .menu-item {
    a {
      font-family: ${themeGet('fonts.body', 'Lato')};
      font-size: ${themeGet('fontSizes.base', '15')}px;
      font-weight: ${themeGet('fontWeights.bold', '700')};
      color: #505050;
      line-height: 1.2em;
      display: block;
      transition: 0.15s ease-in-out;
      display: flex;
      align-items: center;
      margin-right: 45px;

      @media (max-width: 1400px) {
        margin-right: 35px;
        font-size: ${themeGet('fontSizes.base', '15')}px;
      }
      &:hover {
        color: ${themeGet('colors.primary.regular', '#009e7f')};
      }
      &.current-page {
        color: ${themeGet('colors.primary.regular', '#009e7f')};
      }
    }
  }

  .user-pages-dropdown {
    .popover-handler {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: block;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .popover-content {
      .inner-wrap {
        /* padding: ; */
      }
    }
  }
`;
