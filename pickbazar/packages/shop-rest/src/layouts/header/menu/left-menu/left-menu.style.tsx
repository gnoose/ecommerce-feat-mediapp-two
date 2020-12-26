import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const LeftMenuBox = styled.div`
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
      margin-right: 25px;
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

export const MainMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1px;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  margin-right: 15px;
  margin-left: 1px;
`;

export const MenuItem = styled.button`
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: ${themeGet('fontSizes.base', '15')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  line-height: 1.2em;
  white-space: nowrap;
  display: block;
  padding: 12px 30px;
  border-radius: ${themeGet('radii.base', '6px')};
  transition: 0.15s ease-in-out;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;

  svg {
    min-width: 15px;
    max-width: 20px;
    max-height: 19px;
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  @media (max-width: 1400px) {
    margin-right: 10px;
    font-size: ${themeGet('fontSizes.base', '15')}px;
  }

  @media only screen and (min-width: 991px) and (max-width: 1200px) {
    padding: 15px 30px;
  }

  &:hover {
    color: ${themeGet('colors.primary.regular', '#009e7f')};
  }
  &.current-page {
    color: ${themeGet('colors.primary.regular', '#009e7f')};
    background-color: #fff;
  }
`;

export const SelectedItem = styled.button`
  width: auto;
  height: 38px;
  display: flex;
  align-items: center;
  background-color: ${themeGet('colors.white', '#ffffff')};
  border: 1px solid ${themeGet('colors.gray.500', '#f1f1f1')};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: ${themeGet('radii.base', '6px')};
  outline: 0;
  min-width: 150px;
  cursor: pointer;
  
  svg {
    min-width: 15px;
    max-width: 20px;
    max-height: 19px;
  }

  span {
    display: flex;
    align-items: center;
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.base', '15')}px;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.primary.regular', '#009e7f')};
    text-decoration: none;

    &:first-child {
      margin-right: auto;
    }
  }
`;
export const Icon = styled.div`
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
`;
export const Arrow = styled.span`
  width: 5px;
  margin-left: 1px;
`;
