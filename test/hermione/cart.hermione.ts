import { ROUTES_STATIC } from '../unit/constants';
import { BASE_URL } from './constants';
import { addBug, writeLog } from '../helpers';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe('Корзина в каталоге', async function () {
    const catalogPath = addBug(BASE_URL + ROUTES_STATIC.catalog);
    const cartPath = addBug(BASE_URL + ROUTES_STATIC.cart);

    const logStack: string[] = [];

    it('проверка непустых данных в каталоге', async function () {
        await this.browser.url(catalogPath);
        // this.browser.pause(200);
        const card1 = await this.browser.$('div[data-testid="0"]');

        const link1 = card1.$('a');

        await link1.click();

        const button = await this.browser.$$('button')[1];

        await button.click();

        const linksAll = await this.browser.$$('a');

        linksAll[1].click();
        const card2 = await this.browser.$('div[data-testid="1"]');
        const link2 = card2.$('a');
        await link2.click();
        const button2 = await this.browser.$$('button')[1];

        await button2.click();

        await this.browser.assertView(`navigation`, 'nav');
    });

    it('сохраняются данные после перезугразки', async function () {
        await this.browser.refresh();
        this.browser.pause(200);
        await this.browser.assertView(`cart`, 'nav');
    });
    it('очищаются данные после очистки корзины', async function () {
        await this.browser.url(cartPath);
        const button = await this.browser.$$('button')[1];
        await button.click();

        this.browser.pause(200);
        await this.browser.assertView(`empty-cart`, 'nav');
    });
    it('в пустой корзина отображается ссылка на каталог товаров', async function () {
        await this.browser.url(cartPath);
        await this.browser.assertView(`catalog-nav-panel`, 'body');

        const links = await this.browser.$$('a');
        logStack.push(await links[5].getText());
        writeLog(logStack, 'cart', 'hermione');
        const link = links[5];
        expect(await link.getText()).toEqual('catalog');

        link.click();
        this.browser.pause(200);
    });
});
