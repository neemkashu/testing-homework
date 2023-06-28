import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { CartApi, ExampleApi } from '../../src/client/api';

const routes = ['/', '/catalog', '/delivery', '/contacts'];
const basename = '/hw/store';
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

function checkSomeChildrenRendered(application: JSX.Element) {
    const { container } = render(application);
    const rootElement = container.firstChild as HTMLElement;

    expect(rootElement).toBeDefined();
    expect(rootElement).not.toBeNull();
}

describe('Проверка открытия страниц приложения. Открываются: ', () => {
    it('главная страница', () => {
        const application = (
            <MemoryRouter initialEntries={[routes[0]]}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        checkSomeChildrenRendered(application);
    });
    it('каталог', () => {
        const application = (
            <MemoryRouter initialEntries={[routes[1]]}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        checkSomeChildrenRendered(application);
    });
    it('условия доставки', () => {
        const application = (
            <MemoryRouter initialEntries={[routes[2]]}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
        checkSomeChildrenRendered(application);
    });
    it('контакты', () => {
        const application = (
            <MemoryRouter initialEntries={[routes[3]]}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        checkSomeChildrenRendered(application);
    });
});
