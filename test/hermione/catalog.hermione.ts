import { writeFileSync } from 'fs';
import { ROUTES } from '../unit/constants';
import { baseUrl } from './constants';
import { addBug } from './helpers';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe.only('Товар в каталоге', async function () {
    const catalogPath = addBug(baseUrl + ROUTES.catalog);

    it('проверка непустых данных в каталоге', async function () {
        await this.browser.url(catalogPath);
        this.browser.pause(200);
        const cardHeader = await this.browser.$('h5');
        // have to make specific to match the price element by <p> tag
        const cardPrice = await this.browser.$('p*=$');
        const headerContent = await cardHeader.getHTML(false);
        const priceContent = await cardPrice.getHTML(false);

        expect(headerContent.trim().length).toBeGreaterThan(0);
        expect(priceContent.trim().slice(1).length).toBeGreaterThan(0);

        writeFileSync(
            'logs/hermione-catalog.html',
            `${await cardHeader.getHTML(false)}
${await cardPrice.getHTML(false)}
bug id ${process.env.BUG_ID}
`
        );
    });
});
