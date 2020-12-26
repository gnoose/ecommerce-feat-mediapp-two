import styled from 'styled-components';
import css from '@styled-system/css';

type Props = {
  title: string;
  subtitle?: string;
  backdrop?: boolean;
  bgColor?: string;
};

export const Heading = ({ title, subtitle, backdrop, bgColor }: Props) => {
  return (
    <StyledBox style={{ backgroundColor: bgColor }}>
      <StyledH2>{title}</StyledH2>
      {subtitle && <StyledP>{subtitle}</StyledP>}
    </StyledBox>
  );
};

const StyledBox = styled.div(
  css({
    py: [0, 0],
    px: ['16rem', '16rem'],
  }),
  {
    paddingBottom: '0px',
    width: '100%',
  }
);

const StyledH2 = styled.h2(
  css({
    fontSize: 'xl',
    fontWeight: 700,
    color: 'primary.regular',
    marginBottom: '1.5rem',
  })
);

const StyledP = styled.p({
  fontSize: 14,
  color: 'text.medium',
});
