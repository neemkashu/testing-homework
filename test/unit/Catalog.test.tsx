import { writeFileSync } from 'fs';
import { ROUTES, basename } from './constants';
import { initStubedApp } from '../hermione/helpers';
import { render, screen } from '@testing-library/react';
import { generateServerProductsResponse } from '../mocks/products';

describe('Каталог', () => {
    const application = initStubedApp(ROUTES.catalog);

    it('отображает спиннер пока идёт загрузка', async () => {
        const { getByText } = render(application);
        getByText(/loading/i);
    });
    it('отображает список товаров с сервера', async () => {
        const { findAllByRole } = render(application);
        const productList = await findAllByRole('heading', { level: 5 });
        expect(productList.length).toBe(1);
    });
    it('корректно отображается пустой каталог', async () => {
        const application = initStubedApp(
            ROUTES.catalog,
            generateServerProductsResponse({
                data: [{ price: null, id: 45, name: '' }],
                status: 200,
            })
        );
        const { container, queryByText } = render(application);
        await Promise.resolve();

        const nullObjects = queryByText('null');
        writeFileSync(`logs/catalog-index.txt`, String(nullObjects));
        const undefinedObjects = queryByText('undefined');
        expect(nullObjects).toBe(null);
        expect(undefinedObjects).toBe(null);
    });
});
