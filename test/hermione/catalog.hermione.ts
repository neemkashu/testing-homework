import { ROUTES } from '../unit/constants';
import { baseUrl } from './constants';
import { addBug } from './helpers';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe.only('Товар в каталоге', async function () {
    const catalogPath = addBug(baseUrl + ROUTES.catalog);

    it('проверка скриншота', async function () {
        await this.browser.url(catalogPath);
        await this.browser.assertView(`plain`, 'body');
    });
    it('проверка наличия кнопки', async function () {
        await this.browser.url(catalogPath);
        await expect(this.browser.$('button')).toHaveAttr('aria-label');
    });

    it('при повторном нажатии меню исчезает', async function () {
        await this.browser.url(catalogPath);
        const button = await this.browser.$('button');
        await button.click();
        // await Promise.resolve();
        await button.click();
        await this.browser.pause(500);

        await this.browser.assertView(`navigation-hidden`, 'nav');
    });
});
