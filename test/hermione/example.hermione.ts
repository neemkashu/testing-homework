import { assert } from 'chai';
// const { assert } = require('chai');
describe('microsoft', async function () {
    it('Тест, который пройдет', async function () {
        let retries = 4;
        await this.browser.url('http://localhost:3000/hw/store/');
        await this.browser.assertView('plain', 'body');
    });
});
