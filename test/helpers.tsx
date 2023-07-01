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

export const addBug = (URL: string) =>
    `${URL}?${MOCK_QUERY}=1&bug_id=${process.env.BUG_ID}`;

export const initStubedApp = (
    page: (typeof ROUTES)[keyof typeof ROUTES],
    productConfig?: ServerProductMock,
    productById?: ServerProductIdMock
) => {
    const api = new ExampleApi(basename);

    api.getProducts = () =>
        Promise.resolve(generateServerProductsResponse(productConfig));
    api.getProductById = () =>
        Promise.resolve(generateServerProductIdResponse(productById));

    const cart = new CartApi();
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

export const writeLog: WriteAny = (content, fileName, type = 'jest'): void => {
    writeFileSync(
        `logs/${type}-${fileName}.html`,
        `${content.join('\n')}
bug id ${process.env.BUG_ID}
`
    );
};
