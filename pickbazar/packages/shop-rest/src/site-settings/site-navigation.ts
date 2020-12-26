export const HOME_PAGE = '/';
export const MEDICINE_PAGE = '/shop';
export const AYURVEDA_PAGE = '/shop?category=ayurveda';
export const BAIDHYANATH_PAGE = '/shop';
export const DABUR_PAGE = '/shop';
export const HIMALAYA_PAGE = '/shop';
export const PATANJALI_PAGE = '/shop';
export const HOMEOPATHY_PAGE = '/shop?category=homeo';
export const REQUEST_MEDICINE_PAGE = '/request-medicine';
export const CHECKOUT_PAGE = '/checkout';
export const CHECKOUT_PAGE_TWO = '/checkout-alternative';
export const PROFILE_PAGE = '/profile';
export const YOUR_ORDER_PAGE = '/order';
export const ORDER_RECEIVED_PAGE = '/order-received';
export const OFFER_PAGE = '/offer';
export const HELP_PAGE = '/help';
export const TERMS_AND_CONDITIONS_PAGE = '/companydetail#terms';
export const PRIVACY_POLICY_PAGE = '/companydetail#privacy';
export const ABOUT_US_PAGE = '/companydetail';
export const CONTACT_US_PAGE = '/companydetail#contact';
export const REFUND_AND_RETURN_PAGE = '/companydetail#refund';
export const SHIPPING_AND_DELIVERY_POLICY = '/companydetail#shipping';
export const PRICING_POLICY = '/companydetail#pricing';
export const PRODUCT_AND_SERVICES = '/companydetail#services';
export const REGISTERED_BUSINESS_NAME = '/companydetail#registered';
// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
  id: 'nav.home',
  defaultMessage: 'Home',
  href: HOME_PAGE,
};

export const HELP_MENU_ITEM = {
  id: 'nav.help',
  defaultMessage: 'Help',
  href: HELP_PAGE,
};
export const OFFER_MENU_ITEM = {
  id: 'nav.offer',
  defaultMessage: 'Offer',
  href: OFFER_PAGE,
}
export const ORDER_MENU_ITEM = {
  id: 'nav.order',
  href: YOUR_ORDER_PAGE,
  defaultMessage: 'Order',
};
export const REQUEST_MEDICINE_MENU_ITEM = {
  id: 'nav.request_medicine',
  defaultMessage: 'Request Medicine',
  href: REQUEST_MEDICINE_PAGE,
};
export const PROFILE_MENU_ITEM = {
  id: 'nav.profile',
  defaultMessage: 'Profile',
  href: PROFILE_PAGE,
}; 
export const AYURVEDA_PAGE_ITEM = {
  id: 'nav.ayurveda',
  defaultMessage: 'Ayurveda',
  icon: 'FruitsVegetable',
  href: AYURVEDA_PAGE,
  dynamic: true,
};
export const HOMEOPATHY_PAGE_ITEM = {
    id: 'nav.homeopathy',
    defaultMessage: 'Homeopathy',
    href: HOMEOPATHY_PAGE,
    icon: 'MedicineIcon',
    dynamic: true,
};
export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  // {
  //   id: 'nav.checkout',
  //   defaultMessage: 'Checkout',
  //   href: CHECKOUT_PAGE,
  // },
  // {
  //   id: 'alternativeCheckout',
  //   href: CHECKOUT_PAGE_TWO,
  //   defaultMessage: 'Checkout Alternative',
  // },
  ORDER_MENU_ITEM,
  // {
  //   id: 'nav.order_received',
  //   href: ORDER_RECEIVED_PAGE,
  //   defaultMessage: 'your Order',
  // },
  
];
// category menu items for header navigation
export const TERMS_PAGE = {
  id: 'nav.terms_and_services',
  defaultMessage: 'Terms and Services',
  href: TERMS_AND_CONDITIONS_PAGE,
};
export const POLICY_PAGE = {
  id: 'nav.privacy_policy',
  defaultMessage: 'Privacy',
  href: PRIVACY_POLICY_PAGE,
};
export const ABOUTUS_PAGE = {
  id: 'nav.about_us',
    defaultMessage: 'About Us',
    href: ABOUT_US_PAGE,
};
export const CONTACTUS_PAGE = {
  id: 'nav.contact_us',
  defaultMessage: 'Contact Us',
  href: CONTACT_US_PAGE,
};
export const PRODUCT_AND_SERVICES_PAGE = {
  id: 'nav.product_and_services',
  defaultMessage: 'Product and Services',
  href: PRODUCT_AND_SERVICES,
};
export const REFUND_PAGE = {
  id: 'nav.refund_and_return',
  defaultMessage: 'Refund and Return',
  href: REFUND_AND_RETURN_PAGE,
};
export const SHIPPING_AND_DELIVERY_PAGE = {
  id: 'nav.shipping_and_delivery_policy',
  defaultMessage: 'Shipping and Delivery Policy',
  href: SHIPPING_AND_DELIVERY_POLICY,
};
export const PRICING_POLICY_PAGE = {
  id: 'nav.pricing_policy',
  defaultMessage: 'Price and Payment',
  href: PRICING_POLICY,
};
export const REGISTERED_BUSINESS_NAME_PAGE = {
  id: 'nav.registered_name',
    defaultMessage: 'Registered name of Business',
    href: REGISTERED_BUSINESS_NAME,
};
export const CATEGORY_MENU_ITEMS = [
  {
    id: 'nav.ayurveda',
    href: AYURVEDA_PAGE,
    defaultMessage: 'Ayurveda',
    icon: 'FruitsVegetable',
    dynamic: true,
  },
  {
    id: 'nav.baidhyanath',
    href: BAIDHYANATH_PAGE,
    defaultMessage: 'Baidhyanath',
    // icon: 'FruitsVegetable',
    dynamic: true,
  },
  {
    id: 'nav.dabur',
    href: DABUR_PAGE,
    defaultMessage: 'Dabur',
    // icon: 'FruitsVegetable',
    dynamic: true,
  },
  {
    id: 'nav.himalaya',
    href: HIMALAYA_PAGE,
    defaultMessage: 'Himalaya',
    // icon: 'FruitsVegetable',
    dynamic: true,
  },
  {
    id: 'nav.patanjali',
    href: PATANJALI_PAGE,
    defaultMessage: 'Zendu',
    // icon: 'FruitsVegetable',
    dynamic: true,
  },
];
export const CATEGORY_MENU_HOMEOITEMS = [
  {
    id: 'nav.homeopathy',
    defaultMessage: 'Homeopathy',
    href: HOMEOPATHY_PAGE,
    icon: 'MedicineIcon',
    dynamic: true,
  },
];
export const MOBILE_DRAWER_MENU = [
  HOME_MENU_ITEM,
  ...AUTHORIZED_MENU_ITEMS,
  HELP_MENU_ITEM,
  OFFER_MENU_ITEM,
  AYURVEDA_PAGE_ITEM,
  HOMEOPATHY_PAGE_ITEM,

];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
  {
    id: 'ar',
    defaultMessage: 'Arabic',
    icon: 'SAFlag',
  },
  {
    id: 'zh',
    defaultMessage: 'Chinese',
    icon: 'CNFlag',
  },
  {
    id: 'en',
    defaultMessage: 'English',
    icon: 'USFlag',
  },
  {
    id: 'de',
    defaultMessage: 'German',
    icon: 'DEFlag',
  },
  {
    id: 'he',
    defaultMessage: 'Hebrew',
    icon: 'ILFlag',
  },
  {
    id: 'es',
    defaultMessage: 'Spanish',
    icon: 'ESFlag',
  },
];
