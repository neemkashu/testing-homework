import { writeFileSync } from 'fs';
import userEvent from '@testing-library/user-event';
import { ROUTES_STATIC } from './constants';
import { initStubedApp, writeLog } from '../helpers';
import {
    findAllByTestId,
    findByText,
    getByRole,
    getByText,
    queryByText,
    render,
    waitFor,
} from '@testing-library/react';
import {
    generateLongProductById,
    generateShortProductById,
} from '../mocks/products';

describe('Карточки каталога', () => {
    it('отображает название и цену', async () => {
        const { application } = initStubedApp(ROUTES_STATIC.catalog);
        const { findAllByRole, container } = render(application);
        const productList = await findAllByRole('heading', { level: 5 });
        getByText(productList[0], generateShortProductById(0).name);
        getByText(container, `$${generateShortProductById(0).price}`);
    });
    it('содержит рабочую ссылку на страницу товара', async () => {
        const { application } = initStubedApp(ROUTES_STATIC.catalog);
        const { container } = render(application);

        const [card] = await findAllByTestId(container, String(0));

        const link = getByRole(card, 'link');
        const user = userEvent.setup();
        await user.click(link);
        await new Promise(process.nextTick);
        const color = getByText(container, generateLongProductById(0).color);
        writeFileSync('./logs/product-index.html', color.innerHTML);
    });
});

describe('На странице товара', () => {
    it('отображается кнопка добавления в корзину', async () => {
        const { application, store } = initStubedApp('/catalog/0');
        const { findAllByRole, container } = render(application);
        await new Promise(process.nextTick);
        writeLog(
            [JSON.stringify(store.getState())],
            'product-page-1',
            'jest',
            'json'
        );
        await waitFor(() => findByText(container, 'Add to Cart'));
        const buttonCart = getByText(container, 'Add to Cart');
    });
    it('до нажатия кнопки товара в корзине нет', async () => {
        const { application } = initStubedApp('/catalog/0');
        const { findAllByRole, container } = render(application);
        const cartIndicator = queryByText(container, /item/i);
        expect(cartIndicator).toBeNull();
    });
    it('при нажатии на кнопку товар добавляется в корзину', async () => {
        const { application } = initStubedApp('/catalog/0');
        const { findAllByRole, container } = render(application);
        await waitFor(() => findByText(container, 'Add to Cart'));
        const buttonCart = getByText(container, 'Add to Cart');

        const user = userEvent.setup();
        await user.click(buttonCart);

        const cartIndicator = getByText(container, /item/i);
    });
    it('товар виден в корзине на странице каталога, если добавить его в корзину', async () => {
        const { application } = initStubedApp('/catalog/0');
        const { findAllByRole, container } = render(application);
        await waitFor(() => findByText(container, 'Add to Cart'));

        const buttonCart = getByText(container, 'Add to Cart');

        const user = userEvent.setup();
        await user.click(buttonCart);

        const catalogLink = getByText(container, /Catalog/i);

        await user.click(catalogLink);

        writeLog([catalogLink, container.innerHTML], 'product', 'jest');
        const cartIndicator = getByText(container, /item/i);
    });
});
