import { ROUTES_STATIC } from '../unit/constants';
import { BASE_URL } from './constants';
import { addBug, writeLog } from '../helpers';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe('Корзина в каталоге', async function () {
    it('сохраняются данные после перезугразки', async function () {
        const productPath = addBug(BASE_URL + ROUTES_STATIC.catalog + '/0');

        await this.browser.url(productPath);

        const button = await this.browser.$$('button')[1];

        await button.click();

        await this.browser.refresh();
        await this.browser.pause(200);
        const puppeteer = this.browser.puppeteer;
        const [page] = await puppeteer.pages();
        await page.evaluate(() => {
            window.localStorage.clear();
        });
        await this.browser.assertView(`cart`, 'nav');
        await this.browser.refresh();
    });
    it('происходит покупка: добавление в корзину, заполнение формы, отправка формы', async function () {
        const productPath = addBug(BASE_URL + ROUTES_STATIC.catalog + '/0');

        await this.browser.url(productPath);

        const button = await this.browser.$$('button')[1];

        await button.click();

        const puppeteer = this.browser.puppeteer;
        const [page] = await puppeteer.pages();
        const cartLink = await this.browser.$$('a')[4];
        await cartLink.click();

        try {
            const name = await this.browser.$$('input')[0];
            const phone = await this.browser.$$('input')[1];
            const address = await this.browser.$('textarea');

            expect(name).toBeDefined();
            expect(phone).toBeDefined();
            expect(address).toBeDefined();

            await name.setValue('1233983434938483943');
            await phone.setValue('1233983434938483943');
            await address.setValue('1233983434938483943');
        } catch (error) {
            await page.evaluate(() => {
                window.localStorage.clear();
            });
            await this.browser.refresh();
            throw new Error('Не добавились товары в корзину');
        }
        const purchase = await this.browser.$$('button')[2];
        await purchase.click();

        const budge = await this.browser.$('h4');
        try {
            await expect(budge).toHaveText('Well done!', {
                message: 'Не отобразилось сообщение о покупке',
            });
        } catch (error) {
            await page.evaluate(() => {
                window.localStorage.clear();
            });
            await this.browser.refresh();
            throw error;
        }

        await this.browser.pause(200);
        await this.browser.assertView(`cart`, 'body');
        await this.browser.pause(200);
        await page.evaluate(() => {
            window.localStorage.clear();
        });
        await this.browser.refresh();
    });
});
