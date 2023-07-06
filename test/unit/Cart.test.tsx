import userEvent from '@testing-library/user-event';
import { ROUTES_STATIC } from './constants';
import { initStubedApp, writeLog } from '../helpers';
import {
    findByText,
    getAllByRole,
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
    it('работает кнопка очистить корзину', async () => {
        const { application } = initStubedApp('/catalog/1');
        const { container } = render(application);
        const header = getByRole(container, 'navigation');
        const cartLink = getByText(header, /cart/i);
        expect(cartLink.innerHTML).toBe('Cart');

        await addToCart(container);

        expect(cartLink.innerHTML).toBe('Cart (1)');


    });
    it('при добавлении разных товаров в корзину обновляется счётчик в хедере', async () => {
        const { application } = initStubedApp('/catalog/1');
        const { container } = render(application);
        const header = getByRole(container, 'navigation');
        const cartLink = getByText(header, /cart/i);
        expect(cartLink.innerHTML).toBe('Cart');

        await addToCart(container);

        const user = userEvent.setup();
        await user.click(cartLink);
        const button = getAllByRole(container, 'button')[1]
        await user.click(button)

        expect(cartLink.innerHTML).toBe('Cart');
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
    it('в пустой коризине находится ссылка на каталог', async () => {
        const { application } = initStubedApp('/cart');
        const { container } = render(application);

        const link = getAllByRole(container, 'link')[5]

        expect(link.innerHTML).toBe('catalog');
    });
});
