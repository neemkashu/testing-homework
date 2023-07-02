import { render } from '@testing-library/react';
import { ROUTES_STATIC, basename } from './constants';
import { initStubedApp } from '../helpers';

function checkSomeChildrenRendered(application: JSX.Element) {
    const { container } = render(application);
    const rootElement = container.firstChild as HTMLElement;

    expect(rootElement).toBeDefined();
    expect(rootElement).not.toBeNull();
}

describe('Проверка открытия страниц приложения. Открываются: ', () => {
    it('главная страница', () => {
        const { application } = initStubedApp(ROUTES_STATIC.main);

        checkSomeChildrenRendered(application);
    });
    it('каталог', () => {
        const { application } = initStubedApp(ROUTES_STATIC.catalog);
        checkSomeChildrenRendered(application);
    });
    it('условия доставки', () => {
        const { application } = initStubedApp(ROUTES_STATIC.delivery);
        checkSomeChildrenRendered(application);
    });
    it('контакты', () => {
        const { application } = initStubedApp(ROUTES_STATIC.contacts);

        checkSomeChildrenRendered(application);
    });
});
