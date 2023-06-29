import { addBug } from './helpers';

hermione.skip.in('chromeDesktop', 'проверяем только на мобильные');
describe.skip('В шапке на мобильных работает бургер ', async function () {
    it('проверка скриншота', async function () {
        await this.browser.url(addBug('http://localhost:3000/hw/store'));
        await this.browser.assertView(`plain`, 'body');
    });
    it('проверка наличия кнопки', async function () {
        await this.browser.url(addBug('http://localhost:3000/hw/store'));
        await expect(this.browser.$('button')).toHaveAttr('aria-label');
    });
    it('при нажатии на кнопку выпадает меню', async function () {
        await this.browser.url(addBug('http://localhost:3000/hw/store'));
        const button = await this.browser.$('button');
        await button.click();
        await Promise.resolve();
        await this.browser.pause(500);

        await this.browser.assertView(`navigation`, 'nav');
    });
    it('при повторном нажатии меню исчезает', async function () {
        await this.browser.url(addBug('http://localhost:3000/hw/store'));
        const button = await this.browser.$('button');
        await button.click();
        // await Promise.resolve();
        await button.click();
        await this.browser.pause(500);

        await this.browser.assertView(`navigation-hidden`, 'nav');
    });
});
