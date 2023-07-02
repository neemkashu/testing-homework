export const ROUTES_STATIC = {
    main: '/',
    catalog: '/catalog',
    delivery: '/delivery',
    contacts: '/contacts',
} as const;
export type RoutType =
    | (typeof ROUTES_STATIC)[keyof typeof ROUTES_STATIC]
    | `/catalog/${number}`;
export const basename = '/hw/store';
