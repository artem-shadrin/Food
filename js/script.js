import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openModal, closeModal} from './modules/modal';


document.addEventListener('DOMContentLoaded', () => {
    const deadLine = new Date('2021', '5', '16');
    const modalTimerId = setTimeout(()=>{openModal('.modal', modalTimerId);}, 5000);
    tabs();
    timer('.timer', deadLine);
    modal(".modal",modalTimerId);
    cards();
    forms('form', '.modal');
    slider();
    calc();
});