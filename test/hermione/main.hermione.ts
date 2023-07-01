import { writeFileSync } from 'fs';
import { addBug } from '../helpers';

hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe.skip('Статичные страницы имеют статичное содержание', async function () {
    it('главная страница', async function () {
        await this.browser.url(addBug('http://localhost:3000/hw/store'));
        await this.browser.assertView(`plain`, 'body');
    });
    it('доставка', async function () {
        await this.browser.url(
            addBug('http://localhost:3000/hw/store/delivery')
        );
        await this.browser.assertView(`plain`, 'body');
    });
    it('контакты', async function () {
        await this.browser.url(
            addBug('http://localhost:3000/hw/store/contacts')
        );
        await this.browser.assertView(`plain`, 'body');
    });
});
