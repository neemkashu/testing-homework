import { ROUTES, basename } from './constants';
import { initStubedApp } from '../hermione/helpers';
import { render } from '@testing-library/react';

describe('Каталог', () => {
    const application = initStubedApp(ROUTES.main);

    it('отображает список товаров с сервера', async () => {
        const { container } = render(application);
    });
});
