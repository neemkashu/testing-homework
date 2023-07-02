import userEvent from '@testing-library/user-event';
import { ROUTES_STATIC } from './constants';
import { initStubedApp, writeLog } from '../helpers';
import {
    findByText,
    getByRole,
    getByText,
    render,
    waitFor,
} from '@testing-library/react';

async function addToCart(container: HTMLElement) {
    const buttonCart = await findByText(container, 'Add to Cart');
    writeLog([buttonCart], 'add-to-cart', 'jest');
    const user = userEvent.setup();
    await user.click(buttonCart);
    // await Promise.resolve(process.nextTick);
}

describe('Корзина', () => {
    it('при добавлении товара в корзину обновляется счётчик в хедере', async () => {
        const { application } = initStubedApp('/catalog/1');
        const { container } = render(application);
        const header = getByRole(container, 'navigation');
        const cartLink = getByText(header, /cart/i);
        expect(cartLink.innerHTML).toBe('Cart');

        await addToCart(container);

        expect(cartLink.innerHTML).toBe('Cart (1)');
    });
    it('при добавлении товара несколько раз не увеличивается счётчик в хедере', async () => {
        const { application } = initStubedApp('/catalog/1');
        const { container } = render(application);
        const header = getByRole(container, 'navigation');
        const cartLink = getByText(header, /cart/i);
        expect(cartLink.innerHTML).toBe('Cart');

        await addToCart(container);
        await addToCart(container);

        expect(cartLink.innerHTML).toBe('Cart (1)');
    });
    it('при добавлении товара 4 раза увеличивается счётчик на странице корзины', async () => {
        const { application } = initStubedApp('/catalog/1');
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
