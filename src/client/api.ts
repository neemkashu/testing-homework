import axios from 'axios';
import {
    CartState,
    CheckoutFormData,
    CheckoutResponse,
    Product,
    ProductShortInfo,
} from '../common/types';
import {
    generateServerProductIdResponse,
    generateServerProductsResponse,
} from '../../test/mocks/products';
import { MOCK_QUERY } from '../../test/hermione/constants';

export class ExampleApi {
    constructor(private readonly basename: string) {}

    async getProducts() {
        if (new URL(document.location.href).searchParams.has(MOCK_QUERY)) {
            return await Promise.resolve(generateServerProductsResponse());
        }
        return await axios.get<ProductShortInfo[]>(
            `${this.basename}/api/products`
        );
    }

    async getProductById(id: number) {
        if (new URL(document.location.href).searchParams.has(MOCK_QUERY)) {
            return Promise.resolve(generateServerProductIdResponse());
        }
        return await axios.get<Product>(`${this.basename}/api/products/${id}`);
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
        return await axios.post<CheckoutResponse>(
            `${this.basename}/api/checkout`,
            { form, cart }
        );
    }
}

export const LOCAL_STORAGE_CART_KEY = 'example-store-cart';

export class CartApi {
    getState(): CartState {
        try {
            const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            return (JSON.parse(json) as CartState) || {};
        } catch {
            return {};
        }
    }

    setState(cart: CartState) {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }
}
