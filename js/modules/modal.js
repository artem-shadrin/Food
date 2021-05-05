export const openModal = (modalSelector, modalTimerId) => {
    const modalElement = document.querySelector(`${modalSelector}`);
    modalElement.classList.add('show', 'fade');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearTimeout(modalTimerId);
    }
    modalElement.classList.remove('fade');
};
export const closeModal = (modalSelector) => {
    const modalElement = document.querySelector(modalSelector);
    modalElement.classList.remove('show', 'fade');
    document.body.style.overflow = 'visible';
};
const modal = (modalSelector, modalTimerId) => {
    const modalElement = document.querySelector(modalSelector);
    const modalBtn = document.querySelectorAll('[data-modal]');

    const openModalByScroll = () => {
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            document.removeEventListener('scroll', openModalByScroll);
        }
    };
    modalBtn.forEach(item => item.addEventListener('click', () => openModal(modalSelector, modalTimerId)));
    modalElement.addEventListener('click', item => {
        const target = item.target;
        if (target.classList.contains('modal__close') ||
            target.classList.contains(modalSelector.slice(1))) {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', item => {
        if (item.key == 'Escape') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('scroll', openModalByScroll);

};
export default modal;