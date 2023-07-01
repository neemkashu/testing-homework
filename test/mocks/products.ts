import { Product, ProductShortInfo } from '../../src/common/types';

export interface AxiosFields {
    status: number;
    config: Record<string, unknown>;
    statusText: string;
    headers: Record<string, string> | {};
}
export interface ServerProductMock extends AxiosFields {
    data: ProductShortInfo[];
}
export interface ServerProductIdMock extends AxiosFields {
    data: Product;
}

export const TEST_CATALOG = [{ id: 1, name: 'My name', price: 321 }];
export const TEST_PRODUCT: Product = {
    description: 'Long text',
    material: 'Mock1',
    color: 'Mock2',
    ...TEST_CATALOG[0],
} as const;

export const generateServerProductsResponse = (params?: {
    data?: ProductShortInfo[];
    status?: number;
}): ServerProductMock => {
    const data = params?.data;
    const status = params?.status;
    return {
        data: data ?? TEST_CATALOG,
        status: status ?? 200,
        statusText: 'ok',
        headers: {},
        config: {},
    };
};

export const generateServerProductIdResponse = (params?: {
    data?: Product;
    status?: number;
    id?: number;
}): ServerProductIdMock => {
    const data = params?.data;
    const status = params?.status;
    return {
        data: data ?? TEST_PRODUCT,
        status: status ?? 200,
        statusText: 'ok',
        headers: {},
        config: {},
    };
};
