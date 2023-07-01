import { ROUTES } from '../unit/constants';
import { BASE_URL } from './constants';
import { addBug, writeLog } from '../helpers';
import { TEST_CATALOG } from '../mocks/products';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe.only('Товар в каталоге', async function () {
    const catalogPath = addBug(BASE_URL + ROUTES.catalog);

    const logStack: string[] = [];

    it('проверка непустых данных в каталоге', async function () {
        await this.browser.url(catalogPath);
        this.browser.pause(200);
        const cardHeader = await this.browser.$('h5');
        // have to make specific to match the price element by <p> tag
        const cardPrice = await this.browser.$('p*=$');
        const headerContent = await cardHeader.getHTML(false);
        const priceContent = await cardPrice.getHTML(false);

        logStack.push(headerContent);
        logStack.push(priceContent);

        expect(headerContent.trim().length).toBeGreaterThan(0);
        expect(priceContent.trim().slice(1).length).toBeGreaterThan(0);
    });
    it('проверка вёрстки по скриншоту', async function () {
        await this.browser.url(
            addBug(BASE_URL + ROUTES.catalog + '/' + TEST_CATALOG[0].id)
        );
        await this.browser.pause(200);
        await this.browser.assertView(`plain`, 'body');
        const details = await this.browser.$$('dd');

        const colorContent = await details[0].getHTML(false);
        const materialContent = await details[1].getHTML(false);

        logStack.push(colorContent);
        logStack.push(materialContent);

        expect(colorContent).toBe('Mock2');
        expect(materialContent).toBe('Mock1');
    });

    writeLog(logStack, 'catalog', 'hermione');
});
