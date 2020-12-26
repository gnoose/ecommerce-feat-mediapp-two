import useSWR from 'swr';
import { useRouter } from 'next/router';
import { TOPPICS, CATEGORIES, CATEGORIESTYPE } from 'endpoints';
import { useEffect, useState } from 'react';
import axios from 'axios';

const fetcher = (args) => fetch(args).then((res) => res.json());
interface CategoryProps {
  type: string;
  option: string;
  selectedQueries: any;
}
export default function useCategory({ type, option, selectedQueries }: CategoryProps) {
  const router = useRouter();
  const { pathname, query } = router;
  const queries = query.category;
  const [data, setData] = useState(null);
  const [ error, setIsError] = useState(null);
  let url = TOPPICS;
  if (option === 'bestselled') {
    url += '?is_best_selled=true'
  } else if (option === 'bestoffers') {
    url += '?is_best_offers=true'
  } else if (option === 'discount') {
    url += '?is_having_discount=true'
  } else if (option === 'search by brand'){
    if (queries === 'ayurveda' || queries === 'homeo'){
      url = `${CATEGORIESTYPE}\?type=${queries}`
    }
    else{
      url = CATEGORIES
    }
  }
  else if (option === 'search by health conditions'){
    url = CATEGORIES
  }
  else {
    url = url
  }
  if (selectedQueries && url!==`${CATEGORIESTYPE}\?type=${queries}`) {
    if (url.slice(-1) === "/" ){
      url += '?type='+ selectedQueries
    }
    else{
      url += '&type='+ selectedQueries
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios(url);
        setData(data);
      }
      catch (error){
        setIsError(error);
      }
    }
    fetchData();
  }, [url])
  const loading = !data && !error;
  if(option === 'search by brand')
  {
    let categories = []
    if(data && data.results){
      categories = data.results
    }
    return {
      loading,
      error,
      data: categories,
    };
  }
  else if(option === 'search by health conditions')
  {
    let categories = []
    let children_ayurveda = []
    if(data && data.results){
      categories = data.results
    for (let row in categories){
      for(let row1 in categories[row].children){
        let duplicate = children_ayurveda.find((element) => element.title === categories[row].children[row1].title)
          if (!duplicate){
          children_ayurveda.push(categories[row].children[row1])
          }
        }
      }
    }
    return {
      loading,
      error,
      data: children_ayurveda,
    };
  }
  else{
  return {
    loading,
    error,
    data: data,
  };
}
}
