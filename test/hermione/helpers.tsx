import { MemoryRouter } from 'react-router';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { basename, ROUTES } from '../unit/constants';
import React from 'react';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import {
    ServerProductMock,
    generateServerProductsResponse,
} from '../mocks/products';

export const addBug = (URL: string) => `${URL}?bug_id=${hermione.ctx.bug}`;

export const initStubedApp = (
    page: (typeof ROUTES)[keyof typeof ROUTES],
    productConfig?: ServerProductMock
) => {
    const api = new ExampleApi(basename);

    api.getProducts = () =>
        Promise.resolve(generateServerProductsResponse(productConfig));

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
