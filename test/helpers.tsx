import { writeFileSync } from 'fs';
import { MemoryRouter } from 'react-router';
import { ExampleApi, CartApi } from '../src/client/api';
import { initStore } from '../src/client/store';
import { basename, ROUTES } from './unit/constants';
import React from 'react';
import { Provider } from 'react-redux';
import { Application } from '../src/client/Application';
import {
    ServerProductIdMock,
    ServerProductMock,
    generateServerProductIdResponse,
    generateServerProductsResponse,
} from './mocks/products';
import { MOCK_QUERY } from './hermione/constants';
import { CartState } from '../src/common/types';

export class LocalStorageMock {
    store: Record<string, string>;

    constructor() {
        this.store = {};
    }

    get length(): number {
        return Object.keys(this.store).length;
    }

    key(index: number): string | null {
        return Object.keys(this.store)[index] ?? null;
    }

    clear(): void {
        this.store = {};
    }

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = String(value);
    }

    removeItem(key: string): void {
        delete this.store[key];
    }
}

export const addBug = (URL: string) =>
    `${URL}?${MOCK_QUERY}=1&bug_id=${process.env.BUG_ID}`;

export const initStubedApp = (
    page: (typeof ROUTES)[keyof typeof ROUTES],
    productConfig?: ServerProductMock,
    productById?: ServerProductIdMock
) => {
    const localStorageMock = new LocalStorageMock();
    const api = new ExampleApi(basename);

    api.getProducts = () =>
        Promise.resolve(generateServerProductsResponse(productConfig));
    api.getProductById = (id?: number) =>
        Promise.resolve(generateServerProductIdResponse(productById));

    const cart = new CartApi();

    cart.setState = (cart: CartState) =>
        localStorageMock.setItem('key', JSON.stringify(cart));
    cart.getState = () => {
        const json = localStorage.getItem('key');
        return (JSON.parse(json) as CartState) || {};
    };

    const store = initStore(api, cart);
    const application = (
        <MemoryRouter initialEntries={[page]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );
    return application;
};

type WriteAny = <T>(
    content: T[],
    fileName: string,
    type?: 'jest' | 'hermione'
) => void;

// typical usage: writeLog(logStack, 'catalog', 'hermione');
export const writeLog: WriteAny = (content, fileName, type = 'jest'): void => {
    writeFileSync(
        `logs/${type}-${fileName}.html`,
        `${content.join('\n')}
bug id ${process.env.BUG_ID}
`
    );
};

export function makeAppForCheckingSeveralGoods(
    page: (typeof ROUTES)[keyof typeof ROUTES]
) {
    const productBy1 = generateServerProductIdResponse({
        data: {
            id: 1,
            name: 'Fluffy',
            price: 321,
            description: 'Long text',
            material: 'Mock1',
            color: 'Mock2',
        },
    });
    const productBy2 = generateServerProductIdResponse({
        data: {
            id: 2,
            name: 'Unicorn',
            price: 666,
            description: 'Long text',
            material: 'Mock1',
            color: 'Mock2',
        },
    });
    const productShort = generateServerProductsResponse({
        data: [
            { id: 1, name: 'Fluffy', price: 321 },
            { id: 2, name: 'Unicorn', price: 666 },
        ],
    });
    const localStorageMock = new LocalStorageMock();
    const api = new ExampleApi(basename);

    api.getProducts = () =>
        Promise.resolve(generateServerProductsResponse(productShort));
    api.getProductById = (id?: number) => {
        return Promise.resolve(
            generateServerProductIdResponse(id === 2 ? productBy2 : productBy1)
        );
    };

    const cart = new CartApi();

    cart.setState = (cart: CartState) =>
        localStorageMock.setItem('key', JSON.stringify(cart));
    cart.getState = () => {
        const json = localStorage.getItem('key');
        return (JSON.parse(json) as CartState) || {};
    };

    const store = initStore(api, cart);
    const application = (
        <MemoryRouter initialEntries={[page]}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );
    return application;
}
