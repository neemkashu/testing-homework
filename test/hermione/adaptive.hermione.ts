describe('Страницы имеют адаптивный дизайн', async function () {
    hermione.skip.in('chromeDesktop', 'проверяем только на мобильные');
    it('главная страница', async function () {
        await this.browser.url('http://localhost:3000/hw/store/');
        await this.browser.assertView(`plain`, 'body');
    });
    hermione.skip.in('chromeDesktop', 'проверяем только на мобильные');
    it('доставка', async function () {
        await this.browser.url('http://localhost:3000/hw/store/delivery');
        await this.browser.assertView(`plain`, 'body');
    });
    hermione.skip.in('chromeDesktop', 'проверяем только на мобильные');
    it('контакты', async function () {
        await this.browser.url('http://localhost:3000/hw/store/contacts');
        await this.browser.assertView(`plain`, 'body');
    });
    hermione.skip.in('chromeDesktop', 'проверяем только на мобильные');
    it('каталог', async function () {
        await this.browser.url('http://localhost:3000/hw/store/contacts');
        await this.browser.assertView(`plain`, 'nav');
    });
});
