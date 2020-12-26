import useSWR from 'swr';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { PRODUCTS, SEARCH } from 'endpoints';
import axios from 'axios';
import Search from 'features/search/search';

const options = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.3,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  keys: ['title'],
};

function search(list, pattern) {
  const fuse = new Fuse(list, options);
  return fuse.search(pattern).map((current) => current.item);
}

const productFetcher = (args) => fetch(args).then((res) => res.json())

interface Props {
  type: string;
  text?: any;
  category?: any;
  offset?: number;
  limit?: number;
}

export default function useProducts(variables: Props) {
  const { type, text, category, offset = 0, limit = 30 } = variables ?? {};
  let nexturl =  null;
  let producturl = PRODUCTS;
  const [data, setData] = useState(null);
  const [ error, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios(producturl);
        setData(data);
      }
      catch (error){
        setIsError(true);
      }
    }
    fetchData();
  }, [producturl])

  const loading = !data && !error;
  const [loadNextUrl, setNextUrl] = useState('');
  const [getSearchQuery, setSearchQuery] = useState(null);
  const [loadProducts, setLoadProducts] = useState(null);

  let products = null;
  if (data && data.results && !category && !text) {
    products = data.results; 
    nexturl = 'https' + data.next.slice(4);
  }

  const getQueryProducts = async (query, params) => {
    const response = await fetch(query);
    const json = await response.json();
    setLoadProducts(json.results);
    if (json.next){
      setNextUrl('https' + json.next.slice(4));
    } else {
      setNextUrl('');
    }
    setSearchQuery(params);
  };

  if (text && category && (!getSearchQuery || !(getSearchQuery.text===text && getSearchQuery.category===category))) {
    if(category==='homeo' || category==='ayurveda'){
      getQueryProducts(`${SEARCH}?text__contains=${text}&&text__contains=${text.replace(/ /g,'')}&&text__contains=${text.replace(/ /g,'-')}&&type=${category}`, {'text': text, 'category': category});
    }
    else{
      getQueryProducts(`${SEARCH}?text__contains=${text}&&text__contains=${text.replace(/ /g,'')}&&text__contains=${text.replace(/ /g,'-')}&&category=${category}`, {'text': text, 'category': category});
    }
  }

  if (category && getSearchQuery!==category && !text) {
    if(category==='ayurveda' || category==="homeo"){
      getQueryProducts(`${SEARCH}?type=${category}`, category);
    }
    else{
      getQueryProducts(`${SEARCH}?category=${category}`, category); 
    }
  }

  if (type && type !== 'shop' && getSearchQuery!==type && type!=='grocery') {
    getQueryProducts(`${SEARCH}?category=${type}`, type);
  }

  if (text && getSearchQuery!==text && !category) {
    getQueryProducts(`${SEARCH}?text__contains=${text.replace(/ /g,'-')}&&text__contains=${text}&&text__contains=${text.replace(/ /g,'')}`, text);
  }

  let localOffset = offset;
  let localLimit = limit;
  const fetchMore = async (os, lmt, next) => {
    localOffset = os;
    localLimit = lmt;
    nexturl = next;
    const response = await fetch(next);
    const json = await response.json();
    setLoadProducts(json.results);
    setNextUrl('https' + json.next.slice(4));
  };

  if (loadProducts !== null) {
    products = loadProducts;
  }

  if (loadNextUrl){
    nexturl = loadNextUrl;
  }
  const hasMore = nexturl;
  return {
    loading,
    error,
    data: products,
    hasMore,
    fetchMore,
  };
}
  
