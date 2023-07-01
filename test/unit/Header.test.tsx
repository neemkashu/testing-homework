import userEvent from '@testing-library/user-event';

import {
    getAllByRole,
    getByRole,
    getByText,
    render,
} from '@testing-library/react';
import { ROUTES, basename } from './constants';
import { initStubedApp } from '../helpers';

describe('В шапке находятся ссылки магазина, проверяем на главной странице', () => {
    const application = initStubedApp(ROUTES.main);

    const clickLinkProcedure = async (
        container: HTMLElement,
        linkText: string
    ) => {
        const header = container.querySelector('nav');
        const link = getByText(header, new RegExp(linkText));
        const user = userEvent.setup();
        await user.click(link);
        await new Promise(process.nextTick);
    };

    it('их 5 штук', () => {
        const { container } = render(application);
        const header = container.querySelector('nav');
        const links = getAllByRole(header, 'link');
        expect(links.length).toEqual(5);
    });
    it('в них есть текст', () => {
        const { container } = render(application);
        const header = container.querySelector('nav');
        const links = getAllByRole(header, 'link');
        const content = links.map((element) => element.textContent);
        expect(content).toStrictEqual([
            'Example store',
            'Catalog',
            'Delivery',
            'Contacts',
            'Cart',
        ]);
    });
    it('название ведёт на главную страницу', async () => {
        const { container } = render(application);
        await clickLinkProcedure(container, 'Example store');
        getByText(container, /Welcome to Example store/);
    });
    it('остальные ссылки ведут на корзину, каталог, условия и контакты', async () => {
        const { container } = render(application);
        await clickLinkProcedure(container, 'Cart');
        getByText(container, /Shopping cart/);

        await clickLinkProcedure(container, 'Catalog');
        const catalog = getByRole(container, 'heading', { level: 1 });

        expect(catalog.textContent).toEqual('Catalog');

        await clickLinkProcedure(container, 'Delivery');
        const delivery = getByRole(container, 'heading', { level: 1 });
        expect(delivery.textContent).toEqual('Delivery');

        await clickLinkProcedure(container, 'Contacts');
        const contacts = getByRole(container, 'heading', { level: 1 });
        expect(contacts.textContent).toEqual('Contacts');
    });
});
