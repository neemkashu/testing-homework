import { ROUTES_STATIC } from '../unit/constants';
import { BASE_URL } from './constants';
import { addBug, writeLog } from '../helpers';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe('Корзина в каталоге', async function () {

    it('сохраняются данные после перезугразки', async function () {
        const productPath = addBug(BASE_URL + ROUTES_STATIC.catalog + '/0');

        await this.browser.url(productPath);
        await this.browser.pause(1000)

        const button = await this.browser.$$('button')[1];
        await this.browser.pause(1000)

        await button.click();

        await this.browser.refresh();
        await this.browser.pause(200);
        const puppeteer = this.browser.puppeteer;
        const [page] = await puppeteer.pages();
        await page.evaluate(() => {
            window.localStorage.clear()
        })
        await this.browser.pause(1000)
        await this.browser.assertView(`cart`, 'nav');
        await this.browser.refresh();
    });
});
