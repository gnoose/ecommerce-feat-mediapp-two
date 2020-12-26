import useSWR from 'swr';
import { PRODUCTS } from 'endpoints';

// import productFetcher from 'utils/api/product';
const productFetcher = (args) => fetch(args).then((res) => res.json());
interface Props {
  slug: string;
}
export default function useProduct({ slug }: Props) {
  const { data, mutate, error } = useSWR(PRODUCTS, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  let product = data?.filter((current) => current.slug === slug);

  return {
    loading,
    error,
    data: product,
    // user: data,
    mutate,
  };
}
