import { addBug } from '../helpers';

hermione.skip.in('chromeDesktop', 'проверяем только на мобильные');
describe('Страницы имеют адаптивный дизайн', async function () {
    it('главная страница', async function () {
        await this.browser.url(addBug('http://localhost:3000/hw/store/'));
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
    it('каталог', async function () {
        await this.browser.url(
            addBug('http://localhost:3000/hw/store/contacts')
        );
        await this.browser.assertView(`plain`, 'nav');
    });
});
