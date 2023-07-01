import { writeFileSync } from 'fs';
import userEvent from '@testing-library/user-event';
import { ROUTES, basename } from './constants';
import { initStubedApp, writeLog } from '../helpers';
import {
    findAllByTestId,
    findAllByText,
    findByTestId,
    findByText,
    getAllByRole,
    getByRole,
    getByTestId,
    getByText,
    queryByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';

import { Product } from '../../src/common/types';
import { TEST_PRODUCT } from '../mocks/products';

describe('Карточки каталога', () => {
    const product = {
        id: 123,
        price: 321,
        name: 'Ababa',
        color: 'blue',
        description: 'My-text',
        material: 'cotton',
    };
    const productConfig: { data: Product[] } = {
        data: [TEST_PRODUCT],
    };

    it('отображает название и цену', async () => {
        const application = initStubedApp(ROUTES.catalog);
        const { findAllByRole, container } = render(application);
        const productList = await findAllByRole('heading', { level: 5 });
        getByText(productList[0], productConfig.data[0].name);
        getByText(container, `$${productConfig.data[0].price}`);
    });
    it('содержит рабочую ссылку на страницу товара', async () => {
        const application = initStubedApp(ROUTES.catalog);
        const { getAllByRole, findByText, container } = render(application);

        const [card] = await findAllByTestId(
            container,
            String(productConfig.data[0].id)
        );

        const link = getByRole(card, 'link');
        const user = userEvent.setup();
        await user.click(link);
        await new Promise(process.nextTick);
        const color = getByText(container, 'Mock2');
        writeFileSync('./logs/product-index.html', color.innerHTML);
    });
});

describe('На странице товара', () => {
    const application = initStubedApp(ROUTES.productById);
    const { findAllByRole, container } = render(application);

    it('отображается кнопка добавления в корзину', async () => {
        const application = initStubedApp(ROUTES.productById);
        const { findAllByRole, container } = render(application);
        await waitFor(() => findByText(container, 'Add to Cart'));
        const buttonCart = getByText(container, 'Add to Cart');
    });
    it('до нажатия кнопки товара в корзине нет', async () => {
        const application = initStubedApp(ROUTES.productById);
        const { findAllByRole, container } = render(application);
        const cartIndicator = queryByText(container, /item/i);
        expect(cartIndicator).toBeNull();
    });
    it('при нажатии на кнопку товар добавляется в корзину', async () => {
        const application = initStubedApp(ROUTES.productById);
        const { findAllByRole, container } = render(application);
        await waitFor(() => findByText(container, 'Add to Cart'));
        const buttonCart = getByText(container, 'Add to Cart');

        const user = userEvent.setup();
        await user.click(buttonCart);

        const cartIndicator = getByText(container, /item/i);
    });
    it('товар виден в корзине на странице каталога, если добавить его в корзину', async () => {
        const application = initStubedApp(ROUTES.productById);
        const { findAllByRole, container } = render(application);
        await waitFor(() => findByText(container, 'Add to Cart'));
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
