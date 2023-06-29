hermione.skip.in('chromeTablet', 'проверяем только на десктопе');
describe.skip('Статичные страницы имеют статичное содержание', async function () {
    it('главная страница', async function () {
        //@ts-ignore
        // console.log('========', Object.keys(this.browser.executionContext));
        let retries = 2;
        while (retries > 0) {
            await this.browser.url('http://localhost:3000/hw/store/');
            await this.browser.assertView(`plain-${retries}`, 'body');
            retries -= 1;
        }
    });
    it('доставка', async function () {
        let retries = 2;
        while (retries > 0) {
            await this.browser.url('http://localhost:3000/hw/store/delivery');
            await this.browser.assertView(`plain-${retries}`, 'body');
            retries -= 1;
        }
    });
    it('контакты', async function () {
        let retries = 2;
        while (retries > 0) {
            await this.browser.url('http://localhost:3000/hw/store/contacts');
            await this.browser.assertView(`plain-${retries}`, 'body');
            retries -= 1;
        }
    });
});
