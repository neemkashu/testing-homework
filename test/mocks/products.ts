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

export const OneProductCatalog = [{ id: 123, name: 'My name', price: 321 }];
export const OneProduct: Product = {
    description: 'Long text',
    material: 'Mock1',
    color: 'Mock2',
    ...OneProductCatalog[0],
};

export const generateServerProductsResponse = (params?: {
    data?: ProductShortInfo[];
    status?: number;
}): ServerProductMock => {
    const data = params?.data;
    const status = params?.status;
    return {
        data: data ?? OneProductCatalog,
        status: status ?? 200,
        statusText: 'ok',
        headers: {},
        config: {},
    };
};

export const generateServerProductIdResponse = (params?: {
    data?: Product;
    status?: number;
}): ServerProductIdMock => {
    const data = params?.data;
    const status = params?.status;
    return {
        data: data ?? OneProduct,
        status: status ?? 200,
        statusText: 'ok',
        headers: {},
        config: {},
    };
};
