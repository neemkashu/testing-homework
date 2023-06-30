import { writeFileSync } from 'fs';
import userEvent from '@testing-library/user-event';
import { ROUTES, basename } from './constants';
import { initStubedApp } from '../hermione/helpers';
import {
    findAllByTestId,
    findByTestId,
    getByRole,
    getByTestId,
    getByText,
    render,
    screen,
} from '@testing-library/react';

import { Product } from '../../src/common/types';
import { OneProduct } from '../mocks/products';

describe.only('Карточки каталога', () => {
    const product = {
        id: 123,
        price: 321,
        name: 'Ababa',
        color: 'blue',
        description: 'My-text',
        material: 'cotton',
    };
    const productConfig: { data: Product[] } = {
        data: [OneProduct],
    };
    const application = initStubedApp(ROUTES.catalog);

    it('отображает название и цену', async () => {
        const { findAllByRole, container } = render(application);
        const productList = await findAllByRole('heading', { level: 5 });
        getByText(productList[0], productConfig.data[0].name);
        getByText(container, `$${productConfig.data[0].price}`);
    });
    it('содержит рабочую ссылку на страницу товара', async () => {
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
