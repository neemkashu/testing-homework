import { ProductShortInfo } from '../../src/common/types';

export interface ServerProductMock {
    data: ProductShortInfo[];
    status: number;
    statusText: string;
    headers: Record<string, string> | {};
    config: any;
}

const OneProductCatalog = [{ id: 123, name: 'My name', price: 321 }];

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
