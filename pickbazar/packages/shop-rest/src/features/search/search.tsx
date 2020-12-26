import React, {useEffect,useState} from 'react';
import { SearchBox } from 'components/search-box/search-box';
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { SEARCH } from 'endpoints';
import axios from 'axios';
import styled from 'styled-components';
import {Wrapper,List,SearchList,UList} from 'components/search-box/search-box.style'
import {Image} from 'components/cart-item/cart-item.style'
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import { height } from 'styled-system';
import { CubeGrid } from 'styled-loaders-react';
interface Props {
  minimal?: boolean;
  showButtonText?: boolean;
  onSubmit?: () => void;
  [key: string]: unknown;
}

   
const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
  let searchTerm = useAppState('searchTerm');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState([]);
  const [searchvariable, searchVar] = useState('');
  const [searchvalue, setSearchValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const handleOnChange = (e) => {
    searchVar('');
    const { value } = e.target;
    dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    fetchData(e.target.value)
    // var updatedList = orderInfo;
    // updatedList = updatedList.filter(function(item){
    //   return item.description.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    // });
    // setSearchValue(orderInfo);
  }; 
  const fetchData = (value) => {
    setLoading(true);
    axios.get(`${SEARCH}?text__contains=${value}`).then(res => {
      let order_data = res.data.results;
      if(res.data.count !== 0){
      setSearchValue(order_data);
    } else {
      let subterm = value.substring(0,3);
      fetchData(subterm)
    }
    setLoading(false);
    }).catch(error => {
      const error_data = error.status;
    });
  }
  const onClickItem = (item) => {
    searchVar(item)
  }
  // const onFocus = e => e.target.value.classList.add('focus');
  const { pathname, query } = router;
  const onSearch = (e) => {
    e.preventDefault();
    const { type, ...rest } = query;
    if (type) {
      router.push(
        {
          pathname,
          query: { ...rest, text: searchvariable ? searchvariable : searchTerm },
        },
        {
          pathname: `/${type}`,
          query: { ...rest, text:  searchvariable ? searchvariable : searchTerm },
        }
      );
    } else {
      router.push({
        pathname,
        query: { ...rest, text: searchvariable ? searchvariable : searchTerm },
      });
    }
    searchVar('')
    dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    if (onSubmit) {
      onSubmit();
    }
  };
  
  return (
    <Wrapper> 
    {searchvariable || searchTerm ? <SearchList style={{margin: '200px 0 0 0'}}>
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      value={searchvariable ? searchvariable : searchTerm }
      name="search"
      placeholder={intl.formatMessage({
        id: 'searchPlaceholder',
        defaultMessage: 'Search ...',
      })}
      categoryType={query.type || 'restaurant'}
      buttonText={intl.formatMessage({
        id: 'searchButtonText',
        defaultMessage: 'Search',
      })}
      {...props}
      // style={{margin: '200px 0 0 0'}}
    />
    </SearchList>
     : <SearchList>
       <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      value={searchvariable ? searchvariable : searchTerm }
      name="search"
      placeholder={intl.formatMessage({
        id: 'searchPlaceholder',
        defaultMessage: 'Search ...',
      })}
      categoryType={query.type || 'restaurant'}
      buttonText={intl.formatMessage({
        id: 'searchButtonText',
        defaultMessage: 'Search',
      })}
      {...props}
      // style={{margin: '200px 0 0 0'}}
    />
    </SearchList>}
    
    {searchTerm ? 
     loading === true ? <CubeGrid color="#009E7F" size="15px"/> :
    <UList>
     {searchvalue.map(item => (
         <List key={item.id} onClick={() => onClickItem(item.title)}>
          {item.title}
        </List>
    ))}
    </UList> : ''}
      </Wrapper>
  );
};

export default Search;
