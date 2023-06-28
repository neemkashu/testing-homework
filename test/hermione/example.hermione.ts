import { assert } from "chai";

describe("microsoft", async function () {
  it("Тест, который пройдет", async function () {
    await this.browser.url("http://localhost:3000/hw/store/");
    await this.browser.assertView("plain", ".navbar");

    const title = await this.browser.$(".navbar-brand").getText();
    assert.equal(title, "Example store");
  });
});
