import styled from 'styled-components';
import css from '@styled-system/css';
import { bottom, shadow } from 'styled-system';
export const StyledForm = styled.form<any>(
  (props) =>
    css({
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'base',
      overflow: 'hidden',
      width: props.minimal ? '100%' : 900,
      color: 'text.regular',
      backgroundColor: props.minimal ? 'gray.200' : 'white',
      borderWidth: props.minimal ? '1px' : '0',
      borderStyle: 'solid',
      borderColor: props.minimal ? `gray.500` : 'white',
      height: 35,
      input: {
        pl: props.minimal ? 10 : 20,
      },
    }),
  shadow
);
export const Wrapper = styled.div(
  css({
    margin:'0 0 0 0',
    width: '100%',
    padding: '0 1.5em',
    background: 'white',
    // border: '1px solid lightgray',
    // border-radius: '1.5em'
  })
);
export const SearchList = styled.div(
  css({
    margin:'0 0 0 0',
    width: '100%',
    padding: '0 1.5em',
    background: 'white',
  // height: '3em',
  // align: 'center',
  // margin:'auto',
  // display: 'flex'
  })
)
export const UList = styled.ul(
  css({
    // list-style: 'none',
    margin: '0 0 0 0',
    float:'right',
    background:'white',
    padding: '0',
    height:'200px',
    width:'100%',
    bottom: '1.5em',
    border: '1px solid lightgray',
    overflow: 'auto',
    // overflow-y: 'auto',
    animation: 'enlarge .25s forwards',
    })
  )
  export const List =styled.li`
      margin-right: -1.5em,
      margin-left: -1.5em,
      padding: 0 1.5em,
      margin:'0 0 0 0'
      line-height: 1,
      cursor: pointer,
      :hover {
        background: lightgray,
  `

export const StyledInput = styled.input(
  
  css({
    flexGrow: 1,
    fontSize: 'base',
    pr: 20,
    height: 35,
    pt: '6px',
    pb: '6px',
    color: 'text.regular',
    // backgroundColor: 'inherit',
    appearance: 'none',
  }),
  {
    border: '1px solid',
    borderColor: '#EDEDED',
    '&:focus': {
      outline: 0,
    },

    '&::-webkit-input-placeholder, &::-moz-placeholder, &::-moz-placeholder, &::-ms-input-placeholder': {
      fontSize: 'base',
      color: 'text.regular',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }
);

export const StyledCategoryName = styled.span(
  css({
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: '38px',
    px: 15,
    color: 'primary.regular',
    backgroundColor: 'gray.200',
    borderRadius: 'base',
  }),
  {
    margin: '5px',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
  }
);

export const StyledSearchButton = styled.button(
  css({
    backgroundColor: 'primary.regular',
    color: 'white',
    fontSize: 'base',
    fontWeight: 'bold',
  }),
  {
    display: 'flex',
    height: 48,
    alignItems: 'center',
    border: 0,
    outline: 0,
    paddingLeft: 30,
    paddingRight: 30,
    cursor: 'pointer',
    flexShrink: 0,
  }
);
