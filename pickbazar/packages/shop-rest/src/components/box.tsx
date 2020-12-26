import styled from 'styled-components';
import {
  compose,
  space,
  color,
  layout,
  flexbox,
  position,
} from 'styled-system';

export const Box = styled.div<any>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    margin: 0,
    padding: 10,
  },
  compose(space, color, layout, flexbox, position)
);
