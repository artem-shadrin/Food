import {openModal, closeModal} from './modal';
import {postData} from '../services/service';

const forms = (formSelector, modalSelector) => {
    const formElements = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner/spinner.svg',
        success: 'Спасибо! Скоро мы с ними свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const showThanksModal = (message) => {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector(modalSelector).append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);
    };

    const bindpostData = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.querySelector('.btn').textContent = '';
            form.querySelector('.btn')
                .innerHTML = `<img style="display: block, margin: 0 auto" src=${message.loading} alt='spinner'>`;
            const data = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(data.entries()));
            postData('http://localhost:3000/requests', json)
                .then(() => showThanksModal(message.success))
                .catch(() => showThanksModal(message.failure))
                .finally(() => form.reset());
        });
    };
    formElements.forEach(item => bindpostData(item));
};
export default forms;