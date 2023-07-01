import { TEST_CATALOG } from '../mocks/products';

export const ROUTES = {
    main: '/',
    catalog: '/catalog',
    delivery: '/delivery',
    contacts: '/contacts',
    productById: `/catalog/${TEST_CATALOG[0].id}`,
} as const;
export const basename = '/hw/store';
