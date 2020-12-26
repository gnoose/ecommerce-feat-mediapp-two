// const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
import { PRODUCTS, PRODUCTSLUG } from 'endpoints';

export async function getAllProducts() {
  const products = await fetch(PRODUCTS);
  return await products.json();
}

export async function getProductByUrl(slug) {
  const url = PRODUCTSLUG+slug;
  const product = await fetch(url).then((res) =>
    res.json()
  );
  return product.results[0];
}
