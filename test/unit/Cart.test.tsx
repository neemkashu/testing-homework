import { writeFileSync } from 'fs';
import userEvent from '@testing-library/user-event';
import { ROUTES, basename } from './constants';
import {
    initStubedApp,
    makeAppForCheckingSeveralGoods,
    writeLog,
} from '../helpers';
import {
    findByText,
    getAllByRole,
    getByRole,
    getByText,
    queryByText,
    render,
    waitFor,
} from '@testing-library/react';
import {
    generateServerProductIdResponse,
    generateServerProductsResponse,
} from '../mocks/products';

async function addToCart(container: HTMLElement) {
    const buttonCart = await findByText(container, 'Add to Cart');
    writeLog([buttonCart], 'add-to-cart', 'jest');
    const user = userEvent.setup();
    await user.click(buttonCart);
    // await Promise.resolve(process.nextTick);
}

describe('Корзина', () => {
    const productConfig = generateServerProductsResponse({
        data: [
            { id: 1, name: 'Fluffy', price: 321 },
            { id: 2, name: 'Unicorn', price: 666 },
        ],
    });
    const productById = generateServerProductIdResponse({
        data: {
            id: 1,
            name: 'Fluffy',
            price: 321,
            description: 'Long text',
            material: 'Mock1',
            color: 'Mock2',
        },
    });

    it('при добавлении товара в корзину обновляется счётчик в хедере', async () => {
        const application = initStubedApp(
            ROUTES.productById,
            productConfig,
            productById
        );
        const { container } = render(application);
        const header = getByRole(container, 'navigation');
        const cartLink = getByText(header, /cart/i);
        expect(cartLink.innerHTML).toBe('Cart');

        await addToCart(container);

        expect(cartLink.innerHTML).toBe('Cart (1)');
    });
    it('при добавлении товара несколько раз не увеличивается счётчик в хедере', async () => {
        const application = initStubedApp(
            ROUTES.productById,
            productConfig,
            productById
        );
        const { container } = render(application);
        const header = getByRole(container, 'navigation');
        const cartLink = getByText(header, /cart/i);
        expect(cartLink.innerHTML).toBe('Cart');

        await addToCart(container);
        await addToCart(container);

        expect(cartLink.innerHTML).toBe('Cart (1)');
    });
    it('при добавлении товара 4 разf увеличивается счётчик на странице корзины', async () => {
        const application = initStubedApp(
            ROUTES.productById,
            productConfig,
            productById
        );
        const { container } = render(application);
        const header = getByRole(container, 'navigation');

        await addToCart(container);
        await addToCart(container);
        await addToCart(container);
        await addToCart(container);

        const cartLink = getByText(header, /cart/i);
        await userEvent.setup().click(cartLink);

        await waitFor(() => findByText(container, '4'));

        expect(cartLink.innerHTML).toBe('Cart (1)');
    });
});
