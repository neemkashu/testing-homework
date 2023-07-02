import React from 'react';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { getByRole, render } from '@testing-library/react';
import { Form } from '../../src/client/components/Form';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

function initForm() {
    const formSubmitStub = jest.fn();
    const { container } = render(<Form onSubmit={formSubmitStub} />);
    const user = userEvent.setup();
    const submitButton = getByRole(container, 'button');
    return { formSubmitStub, container, user, submitButton };
}
const clickBackSpace = async (
    user: UserEvent,
    lineToDelete: string
): Promise<void> => {
    await user.keyboard(
        lineToDelete
            .split('')
            .map((digit) => '{Backspace}')
            .join('')
    );
};

describe('Форма покупки', () => {
    it('не даёт отправить если не ввести имя', async () => {
        const { formSubmitStub, user, submitButton, container } = initForm();

        const nameInput = container.querySelector('#f-name');
        const phoneInput = container.querySelector('#f-phone');
        const addressInput = container.querySelector('#f-address');

        await user.type(nameInput, '  abc');
        await clickBackSpace(user, 'abc');

        await user.type(phoneInput, '123123123123');
        await user.type(addressInput, 'cabcab');
        await user.click(submitButton);
        expect(formSubmitStub).not.toBeCalled();
    });
    it('не даёт отправить если не ввести телефон', async () => {
        const { formSubmitStub, user, submitButton, container } = initForm();

        const nameInput = container.querySelector('#f-name');
        const phoneInput = container.querySelector('#f-phone');
        const addressInput = container.querySelector('#f-address');

        await user.type(phoneInput, '  123112323234');
        await clickBackSpace(user, '123112323234');

        await user.type(nameInput, 'acbca');
        await user.type(addressInput, 'cabcab');
        await user.click(submitButton);
        expect(formSubmitStub).not.toBeCalled();
    });
    it('не даёт отправить если не ввести телефон', async () => {
        const { formSubmitStub, user, submitButton, container } = initForm();

        const nameInput = container.querySelector('#f-name');
        const phoneInput = container.querySelector('#f-phone');
        const addressInput = container.querySelector('#f-address');

        await user.type(addressInput, '   address');
        await clickBackSpace(user, 'address');

        await user.type(nameInput, 'acbca');
        await user.type(phoneInput, '123112323234');
        await user.click(submitButton);
        expect(formSubmitStub).not.toBeCalled();
    });
    it('не даёт отправить если телефон не корректен', async () => {
        const { formSubmitStub, user, submitButton, container } = initForm();

        const nameInput = container.querySelector('#f-name');
        const phoneInput = container.querySelector('#f-phone');
        const addressInput = container.querySelector('#f-address');

        await user.type(phoneInput, '  ababababababab');

        await user.type(nameInput, 'acbca');
        await user.type(addressInput, 'cabcab');
        await user.click(submitButton);
        expect(formSubmitStub).not.toBeCalled();
    });
    it('отправляет форму когда все поля корректны', async () => {
        const { formSubmitStub, user, submitButton, container } = initForm();

        const nameInput = container.querySelector('#f-name');
        const phoneInput = container.querySelector('#f-phone');
        const addressInput = container.querySelector('#f-address');

        await user.type(phoneInput, '328382382333');
        await user.type(nameInput, 'acbca');
        await user.type(addressInput, 'cabcab');
        await user.click(submitButton);
        expect(formSubmitStub).toBeCalled();
    });
});
