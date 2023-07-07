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
export type ProductIdGeneratorParams = { status?: number } & (
    | {
          data: Product;
          id?: never;
      }
    | {
          data?: never;
          id: number;
      }
);

export const generateShortProductById = (id: number): ProductShortInfo => {
    return { id, name: `product-name-${id}`, price: 666 + id };
};
export const generateLongProductById = (id: number): Product => {
    const product = generateShortProductById(id);
    return {
        color: `mock-color-${id}`,
        description: `Versatile and user-friendly device that enhances productivity and efficiency ${id}`,
        material: `unicorn-wool-${id}`,
        ...product,
    };
};

// by default gives two products
export const generateServerProductsResponse = (params?: {
    data?: ProductShortInfo[];
    status?: number;
}): ServerProductMock => {
    const data = params?.data;
    const status = params?.status;
    return {
        data: data ?? [0, 1].map((id) => generateShortProductById(id)),
        status: status ?? 200,
        statusText: 'ok',
        headers: {},
        config: {},
    };
};

// the function accepts either 'data' or 'id'
export const generateServerProductIdResponse = (
    params: ProductIdGeneratorParams
): ServerProductIdMock => {
    const data = params?.data;
    const status = params?.status;
    const id = params?.id;
    return {
        data: data ?? generateLongProductById(id),
        status: status ?? 200,
        statusText: 'ok',
        headers: {},
        config: {},
    };
};
