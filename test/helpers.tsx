import { writeFileSync } from 'fs';
import { MemoryRouter } from 'react-router';
import { ExampleApi, CartApi } from '../src/client/api';
import { initStore } from '../src/client/store';
import { basename, RoutType } from './unit/constants';
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

const logStack: number[] = [];

export const addBug = (URL: string, isMocked?: boolean) =>
    `${URL}?${isMocked ? MOCK_QUERY + '=1&' : ''}bug_id=${process.env.BUG_ID}`;

export const initStubedApp = (
    page: RoutType,
    getProductStub?: () => Promise<ServerProductMock>,
    getProductByIdStub?: () => Promise<ServerProductIdMock>
) => {
    const localStorageMock = new LocalStorageMock();
    const api = new ExampleApi(basename);

    api.getProducts =
        getProductStub ||
        (async () => await Promise.resolve(generateServerProductsResponse()));
    api.getProductById = async (id: number) =>
        await Promise.resolve(generateServerProductIdResponse({ id }));
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
    return { application, store };
};

type WriteAny = <T>(
    content: T[],
    fileName: string,
    type?: 'jest' | 'hermione',
    extention?: string
) => void;

// typical usage: writeLog(logStack, 'catalog', 'hermione');
export const writeLog: WriteAny = (
    content,
    fileName,
    type = 'jest',
    extention = 'html'
): void => {
    writeFileSync(
        `logs/${type}-${fileName}.${extention}`,
        `${content.join('\n')}
bug id ${process.env.BUG_ID}
`
    );
};
