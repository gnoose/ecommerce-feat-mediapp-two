import {
  HOME_PAGE,
  MEDICINE_PAGE,
  // GROCERY_PAGE,
  // CLOTHING_PAGE,
  // MAKEUP_PAGE,
  // BAGS_PAGE,
  // FURNITURE_PAGE,
  // BOOK_PAGE,
  HOMEOPATHY_PAGE,
  // RESTAURANT_PAGE,
} from 'site-settings/site-navigation';
const arr = [
  HOME_PAGE,
  MEDICINE_PAGE,
  // GROCERY_PAGE,
  // CLOTHING_PAGE,
  // MAKEUP_PAGE,
  // BAGS_PAGE,
  // FURNITURE_PAGE,
  // BOOK_PAGE,
  HOMEOPATHY_PAGE,
  // RESTAURANT_PAGE,
];
export function isCategoryPage(pathname) {
  return arr.includes(`/${pathname}`);
}
