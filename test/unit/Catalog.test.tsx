import { writeFileSync } from 'fs';
import { ROUTES_STATIC, basename } from './constants';
import { initStubedApp } from '../helpers';
import { findByText, render, screen } from '@testing-library/react';
import { generateServerProductsResponse } from '../mocks/products';

describe('Каталог', () => {
    const { application } = initStubedApp(ROUTES_STATIC.catalog);

    it('отображает спиннер пока идёт загрузка', async () => {
        const { getByText } = render(application);
        getByText(/loading/i);
    });
    it('отображает список товаров с сервера', async () => {
        const { findAllByRole } = render(application);
        const productList = await findAllByRole('heading', { level: 5 });
        expect(productList.length).toBe(2);
    });
    it('корректно отображается пустой каталог', async () => {
        const { application } = initStubedApp(ROUTES_STATIC.catalog, async () =>
            generateServerProductsResponse({
                data: [
                    { price: null, id: 0, name: '' },
                    { price: null, id: 0, name: 'QWERTY' },
                ],
                status: 200,
            })
        );
        const { container, queryByText } = render(application);
        await Promise.resolve();

        expect(await findByText(container, 'QWERTY')).not.toBe(null);

        const nullObjects = queryByText('null');
        const undefinedObjects = queryByText('undefined');
        writeFileSync(`logs/catalog-index.txt`, String(nullObjects));
        expect(nullObjects).toBe(null);
        expect(undefinedObjects).toBe(null);
    });
});
